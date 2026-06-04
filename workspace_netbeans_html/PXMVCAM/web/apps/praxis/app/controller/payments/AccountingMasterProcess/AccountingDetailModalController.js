Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.DetailGridRowCtrl', {
    extend: 'Ext.Base',
    baseCtrl: null,
    widgetView: null,
    onRowAction: function (action, record) {
        const modalCtrl = this.widgetView && this.widgetView.up('window') && this.widgetView.up('window').getController();
        if (!modalCtrl) return;
        if (action === 'detail') modalCtrl._openDepositDetail(record.getData());
        if (action === 'queue') modalCtrl._toggleQueueItem(record, this.widgetView);
    },
    onWidgetReady: function () { }
});

Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingDetailModalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingDetailModalController',

    ADMIN_USERS: ['MPACHECO', 'PLOPEZ', 'MPACHECOT', 'PXAVAPIT', 'PXAVAPI', 'GLADYSAT', 'GLADYSA'],

    _sftpTimer: null,
    _sftpProgress: 0,
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

        view.setTitle('Accounting Detail: ' + idcont);
        me._applyButtonVisibility(view.rowData || {});

        // Cola para bulk reverse
        me._reverseQueue = [];
        me._queueSet = {};

        // Mostrar botón bulk-reverse solo a admins (siempre visible para ellos, empieza deshabilitado)
        const bulkBtn = view.down('#btn-bulk-reverse');
        if (bulkBtn) bulkBtn.setVisible(me._isAdmin());

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

    _isAdmin: function () {
        return this.ADMIN_USERS.includes(this._getUser());
    },

    _fetchLiveRow: async function (idcont) {
        const me = this;
        const view = me.getView();
        view.mask('Loading...');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS261', { IN_IDCONT: String(idcont || '') });
            const row = (res && res.lstRs && res.lstRs[0] && res.lstRs[0][0]) || view.rowData || {};
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
            '9': { label: 'Partially Justified ↩️', color: '#88d556', dark: true },
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

    _applyButtonVisibility: function (row) {
        const me = this;
        const view = me.getView();
        const st = String(row.STCONT || '');
        const admin = me._isAdmin();

        const set = function (itemId, visible) {
            const btn = view.down('#' + itemId);
            if (btn) btn.setVisible(visible);
        };

        set('btn-download', ['3', '5', '9'].includes(st));
        set('btn-sftp', st === '3' && admin);
        set('btn-reverse', ['1', '2', '3', '7', '8'].includes(st) && admin);
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
    // SFTP hold-to-confirm
    // =========================================================================

    onSftpBtnReady: function (btn) {
        const me = this;
        const dom = btn.el.dom;
        dom.style.position = 'relative';
        dom.style.overflow = 'hidden';
        const bar = document.createElement('span');
        bar.id = btn.id + '-sftp-bar';
        bar.style.cssText = 'position:absolute;bottom:0;left:0;height:3px;width:0%;'
            + 'background:rgba(255,255,255,0.85);transition:width 15ms linear;';
        dom.appendChild(bar);
        btn.el.on('mouseleave', function () { me.onSftpCancel(); });
    },

    onSftpMouseDown: function (btn) {
        const me = this;
        if (me._sftpTimer) return;
        me._sftpProgress = 0;
        const barId = btn.id + '-sftp-bar';
        me._sftpTimer = setInterval(function () {
            me._sftpProgress = Math.min(me._sftpProgress + (15 / 1500 * 100), 100);
            const bar = document.getElementById(barId);
            if (bar) bar.style.width = me._sftpProgress + '%';
            if (me._sftpProgress >= 100) {
                me._clearSftpTimer(barId);
                me._executeSftp();
            }
        }, 15);
    },

    onSftpCancel: function (btn) {
        const view = this.getView();
        const sftpBtn = view.down('#btn-sftp');
        const barId = sftpBtn ? sftpBtn.id + '-sftp-bar' : '';
        this._clearSftpTimer(barId);
    },

    _clearSftpTimer: function (barId) {
        if (this._sftpTimer) { clearInterval(this._sftpTimer); this._sftpTimer = null; }
        this._sftpProgress = 0;
        if (barId) { const bar = document.getElementById(barId); if (bar) bar.style.width = '0%'; }
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

    _openDepositDetail: function (rowData) {
        Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingDepositDetailModal', {
            rowData: rowData
        }).show();
    },

    // =========================================================================
    // Bulk reverse queue
    // =========================================================================

    _toggleQueueItem: function (record, widgetView) {
        const me = this;
        if (!me._isAdmin()) {
            new AWN().warning('Solo usuarios administradores pueden usar la reversión masiva.');
            return;
        }
        const stcont = String(record.get('STSAP') || '');
        if (!['P'].includes(stcont)) return;

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

    _updateBulkReverseBtn: function () {
        const me = this;
        const view = me.getView();
        const btn = view.down('#btn-bulk-reverse');
        if (!btn) return;
        const count = me._reverseQueue.length;
        btn.setText('Reverse Selected (' + count + ')');
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
                me._reverseQueue = [];
                me._queueSet = {};
                me._updateBulkReverseBtn(); // resetea texto y deshabilita
                // Reload tabs que ya fueron visitados
                const wasLoaded = Object.keys(me._loadedTabs);
                me._loadedTabs = {};
                me._loadTab('tab-deposits');
                if (wasLoaded.indexOf('tab-interrors') >= 0) me._loadTab('tab-interrors');
                // Notificar al padre para que recargue la grilla principal
                if (Ext.isFunction(view.onAfterAction)) view.onAfterAction();
            } else {
                new AWN().alert((d && d.message) || 'Bulk reversal failed');
            }
        } catch (e) {
            new AWN().alert('Error: ' + (e.message || 'Bulk reversal failed'));
        } finally {
            view.unmask();
        }
    },

    onCancelClick: function () {
        this.getView().destroy();
    }
});
