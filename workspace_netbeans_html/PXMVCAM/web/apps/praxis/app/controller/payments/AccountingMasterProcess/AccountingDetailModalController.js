Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.DetailGridRowCtrl', {
    extend: 'Ext.Base',
    baseCtrl: null,
    widgetView: null,
    onRowAction: function (action, record) {
        const modalCtrl = this.widgetView && this.widgetView.up('window') && this.widgetView.up('window').getController();
        if (!modalCtrl) return;
        if (action === 'detail') modalCtrl._openDepositDetail(record.getData());
        if (action === 'edit-status') modalCtrl._openErrStatusEdit(record.getData(), this.widgetView);
        if (action === 'queue') modalCtrl._toggleQueueItem(record, this.widgetView);
    },
    onWidgetReady: function () { }
});

Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingDetailModalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingDetailModalController',
    _monolithReq: null,

    init: function () {
        this._monolithReq = axios.create({
            baseURL: CONTEXTPATH + '/Monolith',
            timeout: 30000
        });
    },

    afterRender: async function () {
        const me = this;
        const view = me.getView();
        const idcont = view.idcont;
        //const admin = await me._isAdmin();
        
        view.setTitle('Accounting Detail: ' + idcont);
        me._applyButtonVisibility(view.rowData || {});

        // Cola para bulk reverse (deposits)
        me._reverseQueue = [];
        me._queueSet = {};

        // Cola para bulk save errors (interface errors)
        me._errQueue = [];
        me._errQueueSet = {};
        // Cambios individuales pendientes de edit-status (en memoria, sin enviar)
        me._pendingErrChangesMap = {};

        // Botones bulk visibles para todos los usuarios
        const bulkBtn = view.down('#btn-bulk-reverse');
        if (bulkBtn) bulkBtn.setVisible(true);
        const bulkErrBtn = view.down('#btn-bulk-save-errors');
        if (bulkErrBtn) bulkErrBtn.setVisible(true);
        const bulkErrRevBtn = view.down('#btn-bulk-reverse-errors');
        if (bulkErrRevBtn) bulkErrRevBtn.setVisible(true);

        // Solo carga el primer tab; los demás cargan al hacer click
        me._loadedTabs = {};
        me._loadTab('tab-deposits');

        await me._fetchLiveRow(idcont);
    },

    // =========================================================================
    // Helpers
    // =========================================================================

    _getUser: function () {
        return ((document.getElementById('menuUser') || {}).textContent || '').trim();
    },

    _isAdmin: async function () {
        return await global.isAdminUserContable(this._getUser());
    },

    _fetchLiveRow: async function (idcont) {
        const me = this;
        const view = me.getView();
        view.mask('Loading...');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS261', { IN_IDCONT: String(idcont || '') });
            const row = (res && res.lstRs && res.lstRs[0] && res.lstRs[0][0]) || view.rowData || {};
            me._liveRow = row;
            me._renderSummary(row);
            me._applyButtonVisibility(row);
        } catch (e) {
            console.error('[AccountingDetailModal] fetchLiveRow error:', e);
            me._renderSummary(view.rowData || {});
        } finally {
            view.unmask();
        }
    },

    _renderSummary: function (row) {
        const STATUS_MAP = {
            '0': { label: 'Processing 🔃', color: '#838187', dark: false },
            '2': { label: 'Accounting Errors 🚫', color: '#fdb333', dark: true },
            '8': { label: 'No Data ⭕', color: '#f7ec35', dark: true },
            '4': { label: 'Reversed ⛔', color: '#f7ec35', dark: true },
            '3': { label: 'Ready to Send 🆗', color: '#8cdfe3', dark: true },
            '5': { label: 'SFTP 🆗', color: '#9187e1', dark: false },
            'L': { label: 'Loaded to SAP ☑', color: '#88d556', dark: true },
            '6': { label: 'Partially Rejected ↩️', color: '#88d556', dark: true },
            '9': { label: 'Closed by User 🔒', color: '#88d556', dark: true },
            'J': { label: 'Justified ⏺️', color: '#f7ec35', dark: true },
            'R': { label: 'Rejected ❌', color: '#f7ec35', dark: true },
            '7': { label: 'Process Error ⚠️', color: '#f7ec35', dark: true }
        };
        const TYPE_MAP = { DEB: 'Debits', REG: 'Regular', ADJ: 'Adjustment', ADM: "ADM's" };

        const stcont = String(row.STCONT || '');
        const si = STATUS_MAP[stcont] || { label: stcont || '—', color: '#ccc', dark: true };
        const txtClr = si.dark ? '#333' : '#fff';

        const cell = function (lbl, val) {
            return '<div style="margin-right:18px;line-height:1.5;">'
                + '<span style="opacity:.65;font-size:10px;">' + lbl + '</span><br>'
                + '<b>' + (val || '—') + '</b>'
                + '</div>';
        };

        const qty = String(row.QTY_SEQ || '0');
        const errors = String(row.QTY_POS != null ? row.QTY_POS : (row.QTYERRS || '0'));
        const period = (row.PRDAF || '') + ' → ' + (row.PRDAT || '');
        const genDate = (row.FSEND || '') + (row.HCONT ? ' ' + row.HCONT : '');
        const typeLbl = TYPE_MAP[String(row.TIPOCON || '')] || (row.TIPOCON || '');

        let html = '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:0;font-size:12px;color:#fff;">';
        html += '<div style="margin-right:18px;">'
            + '<span style="background:' + si.color + ';color:' + txtClr + ';padding:4px 14px;'
            + 'border-radius:12px;font-weight:bold;white-space:nowrap;">' + si.label + '</span></div>';
        html += cell('Client', row.CCUST);
        html += cell('Type', typeLbl);
        html += cell('Processor', row.CODPRO);
        html += cell('Posting', row.FCONT);
        html += cell('Gen. Date', genDate);
        html += cell('Period', period);
        html += '<div style="margin-right:18px;line-height:1.5;">'
            + '<span style="opacity:.65;font-size:10px;">Deposits</span><br>'
            + '<b style="color:#5bc611;">' + qty + '</b></div>';
        html += '<div style="margin-right:18px;line-height:1.5;">'
            + '<span style="opacity:.65;font-size:10px;">Acc. Errors</span><br>'
            + '<b style="color:#f77;">' + errors + '</b></div>';
        if (row.FILENAM) { html += cell('Corrl AV', row.FILENAM); }
        html += '</div>';

        const el = document.getElementById(this.getView().id + '-summaryContent');
        if (el) el.innerHTML = html;
    },

    _applyButtonVisibility: async function (row) {
        const me = this;
        const view = me.getView();
        const st = String(row.STCONT || '');
        const admin = await me._isAdmin();

        const set = function (itemId, visible) {
            const btn = view.down('#' + itemId);
            if (btn) btn.setVisible(visible);
        };

        set('btn-download', ['3', '5', '9'].includes(st));
        set('btn-sftp', st === '3' && admin);
        set('btn-reverse', ['1', '2', '3', '7', '8'].includes(st));
    },

    // Carga un tab por su itemId. Marca como cargado para no repetir en revisitas.
    _loadTab: async function (tabId) {
        const me = this;
        const view = me.getView();
        const idcont = view.idcont;

        me._loadedTabs[tabId] = true;

        if (tabId === 'tab-deposits' || tabId === 'tab-interrors') {
            const gridId = tabId === 'tab-deposits' ? 'grid-deposits' : 'grid-interrors';
            const g = view.down('#' + gridId);
            if (g) g.getController().reload({
                IN_IDCONT: String(idcont || ''),
                IN_REFER: '',
                IN_BANDOC: ''
            });

        } else if (tabId === 'tab-files') {
            const grid = view.down('#grid-files');
            if (grid) grid.mask('Loading...');
            try {
                const res = await global.callStoreGet('PRAXISMP', 'MPS496', { IN_IDCONT: String(idcont || '') });
                const data = (res && res.lstRs && res.lstRs[0]) || [];
                if (grid && !grid.isDestroyed) {
                    grid.unmask();
                    grid.getStore().loadData(data);
                }
                const closeBtn = view.down('#btn-close-interfaces');
                const stcont = String((me._liveRow || view.rowData || {}).STCONT || '');
                if (closeBtn) closeBtn.setVisible(data.length > 0 && stcont === '3');
            } catch (e) {
                console.error('[AccountingDetailModal] Files load error:', e);
                if (grid && !grid.isDestroyed) grid.unmask();
            }
        }
    },

    onTabChange: function (tabPanel, newCard) {
        const me = this;
        const tabId = newCard.itemId;
        if (tabId && !me._loadedTabs[tabId]) {
            me._loadTab(tabId);
        }
    },

    _afterAction: function () {
        const view = this.getView();
        if (Ext.isFunction(view.onAfterAction)) view.onAfterAction();
        view.destroy();
    },

    // =========================================================================
    // SFTP
    // =========================================================================

    onSftpClick: function () {
        const me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to <b>send via SFTP</b> this accounting?<br>'
                + '<span style="color:#c82d2d;">This action will start the SFTP transfer process.</span>',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Msg.show({
                        title: '.:PRAXIS:. — Confirm SFTP',
                        msg: '<b>Confirm again:</b> Send this accounting via SFTP?<br>'
                            + '<span style="color:#c82d2d;">⚠️ This will initiate the file transfer. This action cannot be undone.</span>',
                        buttons: Ext.MessageBox.YESNO,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (btn2) { if (btn2 === 'yes') me._executeSftp(); }
                    });
                    Ext.Msg.toFront();
                }
            }
        });
        Ext.Msg.toFront();
    },

    _executeSftp: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Sending via SFTP...');
        try {
            const res = await me._monolithReq.post('/sendInterfaceSftp', {
                IDCONT: String(view.idcont),
                USER: me._getUser()
            });
            const d = res.data;
            if (d && d.success) {
                new AWN().success(d.message || 'SFTP process started');
                me._afterAction();
            } else {
                new AWN().alert((d && d.message) || 'SFTP process failed');
            }
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'SFTP failed'));
        } finally {
            view.unmask();
        }
    },

    // =========================================================================
    // Button handlers
    // =========================================================================

    onConsoleClick: async function () {
        const me = this;
        const view = me.getView();
        const idcont = view.idcont;

        view.mask('Loading console...');
        let data = [];
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS471', { IN_IDCONT: String(idcont) });
            data = (res && res.lstRs && res.lstRs[0]) || [];
        } catch (e) {
            console.error('[AccountingDetailModal] Console load error:', e);
        } finally {
            view.unmask();
        }

        const store = Ext.create('Ext.data.Store', {
            fields: ['MENSAJE', 'USUP', 'TSUP'],
            data: data
        });

        const win = Ext.create('Ext.window.Window', {
            title: 'Console — ' + idcont,
            width: 720,
            height: 420,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'gridpanel',
                store: store,
                border: false,
                columnLines: true,
                scrollable: true,
                viewConfig: { stripeRows: true, enableTextSelection: true, markDirty: false },
                columns: [
                    { xtype: 'rownumberer', width: 40 },
                    { text: 'Message', dataIndex: 'MENSAJE', flex: 1, menuDisabled: true },
                    { text: 'User', dataIndex: 'USUP', width: 110, menuDisabled: true, align: 'center' },
                    { text: 'DateTime', dataIndex: 'TSUP', width: 155, menuDisabled: true, align: 'center' }
                ]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: { pack: 'center' },
                defaults: { scale: 'medium' },
                items: [{
                    text: 'Close',
                    iconCls: 'prx-icon-cancel',
                    handler: function () { win.destroy(); }
                }]
            }]
        });
        win.show();
    },

    onDownloadInterface: async function (filename, idcont, filesq) {
        const me = this;
        const view = me.getView();
        view.mask('Descargando archivo...');
        try {
            const url = CONTEXTPATH + '/Monolith/downloadInterface'
                + '?IDCONT=' + encodeURIComponent(String(idcont))
                + '&FILESQ=' + encodeURIComponent(String(filesq));
            const response = await fetch(url);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = String(filename);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (e) {
            new AWN().alert('Error al descargar: ' + (e.message || ''));
        } finally {
            view.unmask();
        }
    },

    onDownloadZip: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Descargando ZIP...');
        try {
            const url = CONTEXTPATH + '/Monolith/downloadInterfaceZip'
                + '?idcont=' + encodeURIComponent(String(view.idcont))
                + '&user_send=' + encodeURIComponent(me._getUser());
            const response = await fetch(url);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = String(view.idcont) + '.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (e) {
            new AWN().alert('Error al descargar: ' + (e.message || ''));
        } finally {
            view.unmask();
        }
    },

    onReverse: function () {
        const me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to <b>reverse</b> this accounting?<br>'
                + '<span style="color:#c82d2d;">This action cannot be undone.</span>',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn) { if (btn === 'yes') me._executeReverse(); }
        });
        Ext.Msg.toFront();
    },

    _executeReverse: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Reversing...');
        try {
            const res = await me._monolithReq.post('/rollbackAccounting', {
                IDCONT: String(view.idcont)
            });
            const d = res.data;
            if (d && d.success) {
                new AWN().success(d.message || 'Reversal started');
                me._afterAction();
            } else {
                new AWN().alert((d && d.message) || 'Reversal failed');
            }
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'Reversal failed'));
        } finally {
            view.unmask();
        }
    },

    // =========================================================================
    // Deposit row detail
    // =========================================================================

    _openDepositDetail: async function (rowData) {
        const me = this;
        const view = me.getView();
        const stcont = String((me._liveRow || view.rowData || {}).STCONT || '');
        const admin = await me._isAdmin();
        Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingDepositDetailModal', {
            rowData: rowData,
            stcont: stcont,
            canEdit: admin
        }).show();
    },

    // =========================================================================
    // Interface Error — single status edit
    // =========================================================================

    _openErrStatusEdit: function (rowData) {
        const me = this;

        // Buscar todas las filas del store que comparten BANDOC/DATECI/TRANCI
        const sameKeyRows = [];
        const spGrid = me.getView().down('#grid-interrors');
        const innerGrid = spGrid && spGrid.down('#mainGrid');
        if (innerGrid && !innerGrid.isDestroyed) {
            innerGrid.getStore().each(function (r) {
                if (r.get('BANDOC') === rowData.BANDOC
                    && r.get('DATECI') === rowData.DATECI
                    && r.get('TRANCI') === rowData.TRANCI) {
                    sameKeyRows.push(r.getData());
                }
            });
        }
        if (!sameKeyRows.length) sameKeyRows.push(rowData);

        const multipleErrors = sameKeyRows.length > 1;

        // Construir el item de visualización de error(es)
        var errorItem;
        if (multipleErrors) {
            const listHtml = '<ul style="margin:4px 0 0 0;padding-left:18px;line-height:1.6;">'
                + sameKeyRows.map(function (r) {
                    return '<li><b>' + (r.CERROR || '—') + '</b> — ' + (r.DESCERR || '—') + '</li>';
                }).join('')
                + '</ul>';
            errorItem = {
                xtype: 'displayfield',
                fieldLabel: 'Errors (' + sameKeyRows.length + ')',
                value: listHtml
            };
        } else {
            errorItem = {
                xtype: 'displayfield',
                fieldLabel: 'Error',
                value: '<b>' + (rowData.CERROR || '—') + '</b> — ' + (rowData.DESCERR || '—')
            };
        }

        const STATUS_OPTIONS = [
            ['0', 'Pending'],
            ['2', 'Reviewed']
        ];

        const winHeight = multipleErrors ? Math.max(280, 200 + sameKeyRows.length * 20) : 250;

        const win = Ext.create('Ext.window.Window', {
            title: 'Update Error Status — ' + (rowData.BANDOC || ''),
            width: 480,
            height: winHeight,
            modal: true,
            resizable: false,
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'form',
                bodyPadding: '16 16 8 16',
                border: false,
                defaults: { labelWidth: 110, anchor: '100%' },
                items: [
                    { xtype: 'displayfield', fieldLabel: 'Bank Doc.', value: rowData.BANDOC || '—' },
                    { xtype: 'displayfield', fieldLabel: 'Reference', value: rowData.REFER || '—' },
                    errorItem,
                    {
                        xtype: 'combobox',
                        itemId: 'combo-strev',
                        fieldLabel: 'New Status',
                        store: STATUS_OPTIONS,
                        value: String(rowData.STREV || '0'),
                        editable: false,
                        allowBlank: false,
                        forceSelection: true
                    }
                ]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: { pack: 'center' },
                defaults: { scale: 'medium' },
                items: [
                    {
                        text: 'Add to pending',
                        itemId: 'btn-save-status',
                        style: 'color:#1677ff;font-weight:bold;',
                        handler: function () {
                            const combo = win.down('#combo-strev');
                            const newStatus = String(combo.getValue());

                            // Guardar en mapa con key 4-partes (TIPOERR incluido para agrupar en SP)
                            // _STREV_ORIG guarda el valor original para poder restaurarlo si se quita del modal
                            sameKeyRows.forEach(function (r) {
                                const key = [r.BANDOC, r.DATECI, r.TRANCI, r.TIPOERR || ''].join('-');
                                const updated = Ext.apply({}, r);
                                updated._STREV_ORIG = String(r.STREV != null ? r.STREV : '0');
                                updated.STREV = newStatus;
                                me._pendingErrChangesMap[key] = updated;
                            });

                            // Actualizar STREV en el store para feedback visual inmediato
                            // y para que isDisabled de las acciones se re-evalúe correctamente
                            if (innerGrid && !innerGrid.isDestroyed) {
                                innerGrid.getStore().each(function (r) {
                                    if (r.get('BANDOC') === rowData.BANDOC
                                        && r.get('DATECI') === rowData.DATECI
                                        && r.get('TRANCI') === rowData.TRANCI) {
                                        r.set('STREV', newStatus);
                                        r.commit(); // evitar que quede marcado como dirty
                                    }
                                });
                            }

                            win.destroy();
                            me._updateBulkSaveErrorsBtn();
                        }
                    },
                    {
                        text: 'Cancel',
                        iconCls: 'prx-icon-cancel',
                        handler: function () { win.destroy(); }
                    }
                ]
            }]
        });
        win.show();
    },

    // =========================================================================
    // Bulk reverse queue
    // =========================================================================

    _toggleQueueItem: async function (record, widgetView) {
        const me = this;
        //const admin = await me._isAdmin();
        //if (!admin) {
        //    new AWN().warning('Solo usuarios administradores pueden usar esta acción masiva.');
        //    return;
        //}

        // Delegar según la grilla origen
        if (widgetView && widgetView.itemId === 'grid-interrors') {
            me._toggleErrQueueItem(record, widgetView);
            return;
        }

        // Cola de deposits (lógica original)
        const stcont = String(record.get('STSAP') || '');
        if (!['P', 'Y'].includes(stcont)) return;

        const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');

        if (me._queueSet[key]) {
            delete me._queueSet[key];
            me._reverseQueue = me._reverseQueue.filter(function (r) {
                return [r.BANDOC, r.DATECI, r.TRANCI].join('-') !== key;
            });
        } else {
            me._queueSet[key] = true;
            me._reverseQueue.push(record.getData());
        }

        // Refresh fila para actualizar ícono
        const grid = widgetView && widgetView.down('gridpanel');
        if (grid && grid.getView && !grid.isDestroyed) {
            const idx = grid.getStore().indexOf(record);
            if (idx >= 0) grid.getView().refreshNode(idx);
        }

        me._updateBulkReverseBtn();
    },

    _toggleErrQueueItem: function (record, widgetView) {
        const me = this;
        if (String(record.get('STREV') || '') !== '0') return;

        const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');

        if (me._errQueueSet[key]) {
            delete me._errQueueSet[key];
            me._errQueue = me._errQueue.filter(function (r) {
                return [r.BANDOC, r.DATECI, r.TRANCI].join('-') !== key;
            });
        } else {
            me._errQueueSet[key] = true;
            me._errQueue.push(record.getData());
        }

        // Refresh fila para actualizar ícono
        const grid = widgetView && widgetView.down('gridpanel');
        if (grid && grid.getView && !grid.isDestroyed) {
            const idx = grid.getStore().indexOf(record);
            if (idx >= 0) grid.getView().refreshNode(idx);
        }

        me._updateBulkReverseErrorsBtn();
    },

    _updateBulkReverseBtn: function () {
        const me = this;
        const view = me.getView();
        const btn = view.down('#btn-bulk-reverse');
        if (!btn) return;
        const count = me._reverseQueue.length;
        btn.setText('Reverse Selected (' + count + ')');
        btn.setDisabled(count === 0);
    },

    _updateBulkSaveErrorsBtn: function () {
        const me = this;
        const view = me.getView();
        const btn = view.down('#btn-bulk-save-errors');
        if (!btn) return;
        const count = Object.keys(me._pendingErrChangesMap || {}).length;
        btn.setText('Mark as Reviewed (' + count + ')');
        btn.setDisabled(count === 0);
    },

    _updateBulkReverseErrorsBtn: function () {
        const me = this;
        const view = me.getView();
        const btn = view.down('#btn-bulk-reverse-errors');
        if (!btn) return;
        const count = (me._errQueue || []).length;
        btn.setText('Mark as Reversed (' + count + ')');
        btn.setDisabled(count === 0);
    },

    _refreshQueuedRow: function (bandoc, dateci, tranci) {
        const me = this;
        const view = me.getView();
        ['#grid-deposits', '#grid-interrors'].forEach(function (gridId) {
            const spGrid = view.down(gridId);
            if (!spGrid) return;
            const innerGrid = spGrid.down('#mainGrid');
            if (!innerGrid || innerGrid.isDestroyed) return;
            const idx = innerGrid.getStore().findBy(function (r) {
                return r.get('BANDOC') === bandoc && r.get('DATECI') === dateci && r.get('TRANCI') === tranci;
            });
            if (idx >= 0) innerGrid.getView().refreshNode(idx);
        });
    },

    onBulkReverse: function () {
        const me = this;
        const count = me._reverseQueue.length;
        if (!count) return;

        const store = Ext.create('Ext.data.Store', {
            fields: ['BANDOC', 'REFER', 'DATECI', 'TRANCI', 'TIPOCON', 'PROCESO'],
            data: me._reverseQueue
        });

        const bannerId = Ext.id() + '-bulk-banner';

        const updateBanner = function () {
            const n = store.getCount();
            const el = document.getElementById(bannerId);
            if (el) {
                el.innerHTML = n > 0
                    ? '<b>Are you sure you want to reverse ' + n + ' deposit(s)?</b><br>'
                    + '<span style="font-size:11px;color:#c82d2d;">This action cannot be undone. Review the items below before confirming.</span>'
                    : '<b style="color:#c82d2d;">No deposits remaining. Close this window.</b>';
            }
            const confirmBtn = win && win.down('#btn-confirm-bulk');
            if (confirmBtn) confirmBtn.setDisabled(n === 0);
        };

        var win = Ext.create('Ext.window.Window', {
            title: '.:PRAXIS:. — Confirm Bulk Reversal',
            width: 820,
            height: 380,
            modal: true,
            resizable: true,
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'panel',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'panel',
                        region: 'north',
                        height: 52,
                        border: false,
                        bodyStyle: 'background:#fff3cd;padding:10px 16px;',
                        html: '<div id="' + bannerId + '" style="color:#856404;font-size:13px;">'
                            + '<b>Are you sure you want to reverse ' + count + ' deposit(s)?</b><br>'
                            + '<span style="font-size:11px;color:#c82d2d;">This action cannot be undone. Review the items below before confirming.</span>'
                            + '</div>'
                    },
                    {
                        xtype: 'gridpanel',
                        region: 'center',
                        store: store,
                        border: false,
                        columnLines: true,
                        scrollable: true,
                        viewConfig: { stripeRows: true, markDirty: false },
                        columns: [
                            { xtype: 'rownumberer', width: 35 },
                            { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120, align: 'center', menuDisabled: true },
                            { text: 'Reference', dataIndex: 'REFER', width: 130, menuDisabled: true },
                            { text: 'Date CI', dataIndex: 'DATECI', width: 100, align: 'center', menuDisabled: true },
                            { text: 'Transaction', dataIndex: 'TRANCI', width: 130, align: 'center', menuDisabled: true },
                            { text: 'Type', dataIndex: 'TIPOCON', width: 80, align: 'center', menuDisabled: true },
                            { text: 'Process', dataIndex: 'PROCESO', flex: 1, menuDisabled: true },
                            {
                                xtype: 'actioncolumn',
                                width: 40,
                                align: 'center',
                                menuDisabled: true,
                                sortable: false,
                                items: [{
                                    iconCls: 'prx-icon-image-trash',
                                    tooltip: 'Quitar de selección',
                                    handler: function (_grid, _ri, _ci, _item, _e, record) {
                                        const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');
                                        delete me._queueSet[key];
                                        me._reverseQueue = me._reverseQueue.filter(function (r) {
                                            return [r.BANDOC, r.DATECI, r.TRANCI].join('-') !== key;
                                        });
                                        store.remove(record);
                                        updateBanner();
                                        me._updateBulkReverseBtn();
                                        me._refreshQueuedRow(record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI'));
                                    }
                                }]
                            }
                        ]
                    }
                ]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: { pack: 'center' },
                defaults: { scale: 'medium' },
                items: [
                    {
                        text: 'Confirm Reversal',
                        itemId: 'btn-confirm-bulk',
                        iconCls: 'prx-icon-reload',
                        style: 'color:#c82d2d;font-weight:bold;',
                        handler: function () {
                            win.destroy();
                            me._executeBulkReverse();
                        }
                    },
                    {
                        text: 'Cancel',
                        iconCls: 'prx-icon-cancel',
                        handler: function () { win.destroy(); }
                    }
                ]
            }]
        });
        win.show();
        win.toFront();
    },

    _executeBulkReverse: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Reversing deposits...');
        try {
            const res = await me._monolithReq.post('/rollbackDepositBulk', {
                rows: me._reverseQueue
            });
            const d = res.data;
            if (d && d.success) {
                new AWN().success(d.message || 'Bulk reversal started');
                me._afterAction();
            } else {
                new AWN().alert((d && d.message) || 'Bulk reversal failed');
            }
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'Bulk reversal failed'));
        } finally {
            view.unmask();
        }
    },

    // =========================================================================
    // Interface Errors bulk save (SPMDP00009)
    // =========================================================================

    onBulkSaveErrors: function () {
        const me = this;

        const allRows = Object.values(me._pendingErrChangesMap || {});
        const count = allRows.length;
        if (!count) return;

        const store = Ext.create('Ext.data.Store', {
            fields: ['BANDOC', 'REFER', 'DATECI', 'TRANCI', 'CERROR', 'DESCERR', 'TIPOERR', 'STREV'],
            data: allRows
        });

        const bannerId = Ext.id() + '-err-banner';

        const updateBanner = function () {
            const n = store.getCount();
            const el = document.getElementById(bannerId);
            if (el) {
                el.innerHTML = n > 0
                    ? '<b>Confirme los cambios de status para ' + n + ' error(es) de interfaz:</b><br>'
                    + '<span style="font-size:11px;color:#856404;">Revise la columna <b>New Status</b> antes de confirmar.</span>'
                    : '<b style="color:#c82d2d;">No quedan errores seleccionados. Cierre esta ventana.</b>';
            }
            const confirmBtn = win && win.down('#btn-confirm-save-errors');
            if (confirmBtn) confirmBtn.setDisabled(n === 0);
        };

        const STATUS_LABEL = { '0': 'PENDING', '2': 'REVIEWED' };

        var win = Ext.create('Ext.window.Window', {
            title: '.:PRAXIS:. — Confirm Bulk Status Update',
            width: 920,
            height: 420,
            modal: true,
            resizable: true,
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'panel',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'panel',
                        region: 'north',
                        height: 52,
                        border: false,
                        bodyStyle: 'background:#fff3cd;padding:10px 16px;',
                        html: '<div id="' + bannerId + '" style="color:#856404;font-size:13px;">'
                            + '<b>Confirme los cambios de status para ' + count + ' error(es) de interfaz:</b><br>'
                            + '<span style="font-size:11px;color:#856404;">Revise la columna <b>New Status</b> antes de confirmar.</span>'
                            + '</div>'
                    },
                    {
                        xtype: 'gridpanel',
                        region: 'center',
                        store: store,
                        border: false,
                        columnLines: true,
                        scrollable: true,
                        viewConfig: { stripeRows: true, markDirty: false },
                        columns: [
                            { xtype: 'rownumberer', width: 35 },
                            { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120, align: 'center', menuDisabled: true },
                            { text: 'Reference', dataIndex: 'REFER', width: 130, menuDisabled: true },
                            { text: 'Date CI', dataIndex: 'DATECI', width: 100, align: 'center', menuDisabled: true },
                            { text: 'Transaction', dataIndex: 'TRANCI', width: 120, align: 'center', menuDisabled: true },
                            { text: 'Error Code', dataIndex: 'CERROR', width: 80, align: 'center', menuDisabled: true },
                            { text: 'Description', dataIndex: 'DESCERR', flex: 1, menuDisabled: true },
                            {
                                text: 'New Status', dataIndex: 'STREV', width: 100, align: 'center', menuDisabled: true,
                                renderer: function (v, meta) {
                                    if (v === '2') {
                                        meta.style = 'background-color:#46ECD5;color:white;font-weight:bold;';
                                        return 'REVIEWED';
                                    }
                                    meta.style = 'background-color:red;color:white;font-weight:bold;';
                                    return STATUS_LABEL[v] || v;
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width: 40,
                                align: 'center',
                                menuDisabled: true,
                                sortable: false,
                                items: [{
                                    iconCls: 'prx-icon-image-trash',
                                    tooltip: 'Quitar de selección',
                                    handler: function (_grid, _ri, _ci, _item, _e, record) {
                                        const bandoc = record.get('BANDOC');
                                        const dateci = record.get('DATECI');
                                        const tranci = record.get('TRANCI');
                                        const tipoerr = record.get('TIPOERR') || '';
                                        const key = [bandoc, dateci, tranci, tipoerr].join('-');
                                        const entry = me._pendingErrChangesMap[key];
                                        const origStrev = entry ? String(entry._STREV_ORIG != null ? entry._STREV_ORIG : '0') : '0';
                                        delete me._pendingErrChangesMap[key];
                                        store.remove(record);
                                        updateBanner();
                                        me._updateBulkSaveErrorsBtn();
                                        // Restaurar STREV original en la grilla para las filas de ese TIPOERR
                                        const spGrid = me.getView().down('#grid-interrors');
                                        const ig = spGrid && spGrid.down('#mainGrid');
                                        if (ig && !ig.isDestroyed) {
                                            ig.getStore().each(function (r) {
                                                if (r.get('BANDOC') === bandoc
                                                    && r.get('DATECI') === dateci
                                                    && r.get('TRANCI') === tranci
                                                    && (r.get('TIPOERR') || '') === tipoerr) {
                                                    r.set('STREV', origStrev);
                                                    r.commit();
                                                }
                                            });
                                        }
                                    }
                                }]
                            }
                        ]
                    }
                ]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: { pack: 'center' },
                defaults: { scale: 'medium' },
                items: [
                    {
                        text: 'Confirm',
                        itemId: 'btn-confirm-save-errors',
                        style: 'color:#1677ff;font-weight:bold;',
                        handler: function () {
                            win.destroy();
                            me._executeBulkSaveErrors();
                        }
                    },
                    {
                        text: 'Cancel',
                        iconCls: 'prx-icon-cancel',
                        handler: function () { win.destroy(); }
                    }
                ]
            }]
        });
        win.show();
        win.toFront();
    },

    _executeBulkSaveErrors: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Guardando errores de interfaz...');
        try {
            const idcont = String(view.idcont || '');

            // Agrupar _pendingErrChangesMap por TIPOERR y enviar a MPS194
            const groups = {};
            Ext.Object.each(me._pendingErrChangesMap || {}, function (_key, r) {
                const t = String(r.TIPOERR || '');
                if (!groups[t]) groups[t] = [];
                groups[t].push(r);
            });

            for (const tipoerr of Object.keys(groups)) {
                const payloadRows = groups[tipoerr].map(function (r) {
                    return {
                        BANDOC: String(r.BANDOC || ''),
                        DATECI: String(r.DATECI || ''),
                        TRANCI: String(r.TRANCI || ''),
                        STREV: String(r.STREV || '2')
                    };
                });
                await global.callStoreGet('PRAXISMP', 'MPS194', {
                    IN_IDCONT: idcont,
                    IN_TIPOERR: tipoerr,
                    IN_PAYLOAD: JSON.stringify(payloadRows)
                });
            }

            new AWN().success('Cambios de status guardados correctamente');
            me._pendingErrChangesMap = {};
            me._updateBulkSaveErrorsBtn();

            me._loadTab('tab-interrors');
            if (Ext.isFunction(view.onAfterAction)) view.onAfterAction();
            await me._fetchLiveRow(view.idcont);
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'No se pudieron guardar los cambios'));
        } finally {
            view.unmask();
        }
    },

    // =========================================================================
    // Interface Errors bulk reverse (STREV = '1')
    // =========================================================================

    onBulkReverseErrors: function () {
        const me = this;
        const sourceRows = (me._errQueue || []).slice();
        const count = sourceRows.length;
        if (!count) return;

        const store = Ext.create('Ext.data.Store', {
            fields: ['BANDOC', 'REFER', 'DATECI', 'TRANCI', 'CERROR', 'DESCERR', 'TIPOERR'],
            data: sourceRows
        });

        const bannerId = Ext.id() + '-err-rev-banner';

        const updateBanner = function () {
            const n = store.getCount();
            const el = document.getElementById(bannerId);
            if (el) {
                el.innerHTML = n > 0
                    ? '<b>¿Confirma reversar ' + n + ' error(es) de interfaz?</b><br>'
                    + '<span style="font-size:11px;color:#c82d2d;">Esta acción marcará los errores seleccionados como reversados y no se puede deshacer.</span>'
                    : '<b style="color:#c82d2d;">No quedan errores seleccionados. Cierre esta ventana.</b>';
            }
            const confirmBtn = win && win.down('#btn-confirm-reverse-errors');
            if (confirmBtn) confirmBtn.setDisabled(n === 0);
        };

        var win = Ext.create('Ext.window.Window', {
            title: '.:PRAXIS:. — Confirm Bulk Reverse Errors',
            width: 900,
            height: 420,
            modal: true,
            resizable: true,
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'panel',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'panel',
                        region: 'north',
                        height: 52,
                        border: false,
                        bodyStyle: 'background:#fff3cd;padding:10px 16px;',
                        html: '<div id="' + bannerId + '" style="color:#856404;font-size:13px;">'
                            + '<b>¿Confirma reversar ' + count + ' error(es) de interfaz?</b><br>'
                            + '<span style="font-size:11px;color:#c82d2d;">Esta acción marcará los errores seleccionados como reversados y no se puede deshacer.</span>'
                            + '</div>'
                    },
                    {
                        xtype: 'gridpanel',
                        region: 'center',
                        store: store,
                        border: false,
                        columnLines: true,
                        scrollable: true,
                        viewConfig: { stripeRows: true, markDirty: false },
                        columns: [
                            { xtype: 'rownumberer', width: 35 },
                            { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120, align: 'center', menuDisabled: true },
                            { text: 'Reference', dataIndex: 'REFER', width: 130, menuDisabled: true },
                            { text: 'Date CI', dataIndex: 'DATECI', width: 100, align: 'center', menuDisabled: true },
                            { text: 'Transaction', dataIndex: 'TRANCI', width: 120, align: 'center', menuDisabled: true },
                            { text: 'Error Code', dataIndex: 'CERROR', width: 80, align: 'center', menuDisabled: true },
                            { text: 'Description', dataIndex: 'DESCERR', flex: 1, menuDisabled: true },
                            {
                                xtype: 'actioncolumn',
                                width: 40,
                                align: 'center',
                                menuDisabled: true,
                                sortable: false,
                                items: [{
                                    iconCls: 'prx-icon-image-trash',
                                    tooltip: 'Quitar de selección',
                                    handler: function (_grid, _ri, _ci, _item, _e, record) {
                                        const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');
                                        delete me._errQueueSet[key];
                                        me._errQueue = (me._errQueue || []).filter(function (r) {
                                            return [r.BANDOC, r.DATECI, r.TRANCI].join('-') !== key;
                                        });
                                        store.remove(record);
                                        updateBanner();
                                        me._updateBulkReverseErrorsBtn();
                                        me._refreshQueuedRow(record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI'));
                                    }
                                }]
                            }
                        ]
                    }
                ]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: { pack: 'center' },
                defaults: { scale: 'medium' },
                items: [
                    {
                        text: 'Confirm Reversal',
                        itemId: 'btn-confirm-reverse-errors',
                        iconCls: 'prx-icon-reload',
                        style: 'color:#c82d2d;font-weight:bold;',
                        handler: function () {
                            win.destroy();
                            me._executeBulkReverseErrors();
                        }
                    },
                    {
                        text: 'Cancel',
                        iconCls: 'prx-icon-cancel',
                        handler: function () { win.destroy(); }
                    }
                ]
            }]
        });
        win.show();
        win.toFront();
    },

    _executeBulkReverseErrors: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Reversando errores de interfaz...');
        try {
            const idcont = String(view.idcont || '');

            // MPS475 (errores de interfaz) no retorna PROCESO; se toma de la tabla
            // original de deposits (MPS474), cruzando por BANDOC/DATECI/TRANCI.
            const depRes = await global.callStoreGet('PRAXISMP', 'MPS474', {
                IN_IDCONT: idcont,
                IN_REFER: '',
                IN_BANDOC: ''
            });
            const depRows = (depRes && depRes.lstRs && depRes.lstRs[0]) || [];
            const procesoMap = {};
            depRows.forEach(function (r) {
                procesoMap[[r.BANDOC, r.DATECI, r.TRANCI].join('-')] = r.PROCESO;
            });

            const rows = (me._errQueue || []).map(function (r) {
                const merged = Ext.apply({}, r);
                merged.PROCESO = procesoMap[[r.BANDOC, r.DATECI, r.TRANCI].join('-')] || '';
                return merged;
            });

            const res = await me._monolithReq.post('/rollbackDepositBulk', { rows: rows });
            const d = res.data;
            if (!(d && d.success)) {
                throw new Error((d && d.message) || 'No se pudieron reversar los errores');
            }

            new AWN().success(d.message || 'Errores de interfaz reversados correctamente');
            me._errQueue = [];
            me._errQueueSet = {};

            me._afterAction();
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'No se pudieron reversar los errores'));
        } finally {
            view.unmask();
        }
    },

    // =========================================================================
    // Close Interfaces (MPS214)
    // =========================================================================

    onCloseInterfacesClick: function () {
        const me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to <b>close the interfaces</b> for this accounting?<br>'
                + '<span style="color:#c82d2d;">This action will close all interface files and cannot be undone.</span>',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn) { if (btn === 'yes') me._executeCloseInterfaces(); }
        });
        Ext.Msg.toFront();
    },

    _executeCloseInterfaces: async function () {
        const me = this;
        const view = me.getView();
        view.mask('Closing interfaces...');
        try {
            await global.callStoreGet('PRAXISMP', 'MPS214', {
                IN_IDCONT: String(view.idcont || ''),
                IN_MESSAGE: 'Close Interfaces'
            });
            new AWN().success('Interfaces closed successfully');
            if (Ext.isFunction(view.onAfterAction)) view.onAfterAction();
            const wasLoaded = Object.keys(me._loadedTabs);
            me._loadedTabs = {};
            me._loadTab('tab-deposits');
            if (wasLoaded.indexOf('tab-interrors') >= 0) me._loadTab('tab-interrors');
            me._loadTab('tab-files');
            await me._fetchLiveRow(view.idcont);
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'Could not close interfaces'));
        } finally {
            view.unmask();
        }
    },

    onCancelClick: function () {
        this.getView().destroy();
    }
});
