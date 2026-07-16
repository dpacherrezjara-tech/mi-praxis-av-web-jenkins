Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.MassReversalDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MassReversalDataEntry',

    title: 'Reversa Masiva',
    width: 540,
    modal: true,
    border: false,
    layout: 'card',
    resizable: false,
    closable: true,

    /** @cfg {Function} onAfterAction  Callback tras reversión exitosa. */
    onAfterAction: null,

    BLOCKED_STSAP: ['L', 'S', 'C'],
    _PAGE_SIZE: 10,

    // state
    _validRows: null,
    _masterData: null,
    _selectedKeys: null,    // { _globalIdx: true }
    _suppressSelChange: false,

    initComponent: function () {
        const me = this;
        me._validRows = [];
        me._masterData = [];
        me._selectedKeys = {};

        me.items = [me._buildStep1(), me._buildStep2()];

        me.dockedItems = [{
            xtype: 'toolbar',
            itemId: 'footer',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: { pack: 'center' },
            defaults: { scale: 'medium' },
            items: [
                {
                    text: 'Consultar (0 filas)',
                    itemId: 'btnQuery',
                    iconCls: 'prx-icon-search',
                    disabled: true,
                    handler: function () { me._onQuery(); }
                },
                {
                    text: 'Reversar seleccionados (0)',
                    itemId: 'btnReverse',
                    iconCls: 'prx-icon-image-process',
                    hidden: true,
                    disabled: true,
                    handler: function () { me._onReverse(); }
                },
                {
                    text: 'Volver',
                    itemId: 'btnBack',
                    iconCls: 'prx-icon-back',
                    hidden: true,
                    handler: function () { me._goToStep(1); }
                },
                {
                    text: 'Cancelar',
                    itemId: 'btnCancel',
                    iconCls: 'prx-icon-cancel',
                    handler: function () { me.destroy(); }
                }
            ]
        }];

        me.callParent(arguments);
    },

    // ── Step 1: carga de archivo ──────────────────────────────────────────────

    _buildStep1: function () {
        const me = this;
        return {
            xtype: 'panel',
            itemId: 'step1',
            border: false,
            bodyPadding: 12,
            items: [
                {
                    xtype: 'panel',
                    border: true,
                    margin: '0 0 10 0',
                    bodyStyle: 'background:#fff8f0;border-color:#fb923c;padding:8px 10px;',
                    html: '<p style="font-weight:bold;margin:0 0 4px 0;font-size:12px;">Formato del archivo Excel requerido:</p>' +
                        '<ul style="margin:0;padding-left:18px;font-size:11px;line-height:1.7;">' +
                        '<li><strong>IDCONT</strong> — obligatorio en todas las filas</li>' +
                        '<li><strong>REFER</strong> — opcional (pero REFER o BANDOC debe estar presente)</li>' +
                        '<li><strong>BANDOC</strong> — opcional (pero REFER o BANDOC debe estar presente)</li>' +
                        '</ul>'
                },
                {
                    xtype: 'filefield',
                    itemId: 'fileField',
                    fieldLabel: 'Archivo Excel',
                    labelWidth: 105,
                    anchor: '100%',
                    margin: '0 0 8 0',
                    buttonText: 'Seleccionar...',
                    listeners: {
                        change: function (field) { me._onFileChange(field); }
                    }
                },
                {
                    xtype: 'panel',
                    itemId: 'parseStatus',
                    border: false,
                    bodyStyle: 'background:transparent;',
                    html: '',
                    hidden: true,
                    margin: '0 0 4 0'
                }
            ]
        };
    },

    // ── Step 2: grid de resultados ────────────────────────────────────────────

    _buildStep2: function () {
        const me = this;

        const sm = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'MULTI',
            listeners: {
                selectionchange: function (model, selected) {
                    if (me._suppressSelChange) return;
                    const grid = me.down('#resultGrid');
                    if (!grid) return;
                    const selectedSet = {};
                    selected.forEach(function (r) { selectedSet[r.get('_globalIdx')] = true; });
                    grid.getStore().each(function (record) {
                        const idx = record.get('_globalIdx');
                        if (selectedSet[idx]) {
                            me._selectedKeys[idx] = true;
                        } else {
                            delete me._selectedKeys[idx];
                        }
                    });
                    me._updateReverseBtn();
                },
                beforeselect: function (model, record) {
                    const stsap = String(record.get('STSAP') || '').toUpperCase();
                    return me.BLOCKED_STSAP.indexOf(stsap) < 0;
                }
            }
        });

        return {
            xtype: 'panel',
            itemId: 'step2',
            border: false,
            layout: { type: 'vbox', align: 'stretch' },
            bodyPadding: '6 6 0 6',
            items: [
                {
                    xtype: 'panel',
                    itemId: 'summaryBadges',
                    border: false,
                    bodyStyle: 'background:transparent;',
                    html: '',
                    height: 28,
                    margin: '0 0 6 0'
                },
                {
                    xtype: 'gridpanel',
                    itemId: 'resultGrid',
                    flex: 1,
                    border: true,
                    columnLines: true,
                    selModel: sm,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['_globalIdx', 'IDCONT', 'BANDOC', 'DATECI', 'TRANCI', 'TIPOCON', 'PROCESO', 'STSAP'],
                        proxy: { type: 'memory' },
                        pageSize: me._PAGE_SIZE
                    }),
                    columns: [
                        { text: 'ID Contabilidad', dataIndex: 'IDCONT', width: 220, menuDisabled: true, sortable: false },
                        { text: 'Documento', dataIndex: 'BANDOC', width: 95, menuDisabled: true, sortable: false },
                        { text: 'Fecha CI', dataIndex: 'DATECI', width: 80, menuDisabled: true, sortable: false },
                        { text: 'Transacción CI', dataIndex: 'TRANCI', width: 100, menuDisabled: true, sortable: false },
                        { text: 'Tipo', dataIndex: 'TIPOCON', width: 55, menuDisabled: true, sortable: false },
                        { text: 'Proceso', dataIndex: 'PROCESO', width: 65, menuDisabled: true, sortable: false },
                        {
                            text: 'Estado SAP', dataIndex: 'STSAP', width: 85, menuDisabled: true, sortable: false,
                            renderer: function (v) {
                                const val = String(v || '');
                                const blocked = me.BLOCKED_STSAP.indexOf(val.toUpperCase()) >= 0;
                                const color = blocked ? '#f5222d' : '#52c41a';
                                return '<span style="background:' + color + '22;color:' + color + ';border:1px solid ' + color + '55;' +
                                    'border-radius:10px;padding:1px 8px;font-size:11px;font-weight:600;">' + (val || '—') + '</span>';
                            }
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        getRowClass: function (record) {
                            const stsap = String(record.get('STSAP') || '').toUpperCase();
                            return me.BLOCKED_STSAP.indexOf(stsap) >= 0 ? 'x-grid-row-disabled' : '';
                        }
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: 'Registros {0} - {1} de {2}',
                        emptyMsg: 'Sin registros'
                    },
                    listeners: {
                        afterrender: function (grid) {
                            grid.getStore().on('beforeload', function (store) {
                                me._reloadStore(store.currentPage || 1);
                                return false;
                            });
                        }
                    }
                }
            ]
        };
    },

    // ── Manejo de archivo ─────────────────────────────────────────────────────

    _onFileChange: function (field) {
        const me = this;
        me._validRows = [];
        me._setParseStatus('', false);
        me._updateQueryBtn();

        const fileInput = field.fileInputEl && field.fileInputEl.dom;
        const file = fileInput && fileInput.files && fileInput.files[0];
        if (!file) return;

        me.mask('Leyendo archivo...');
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const wb = XLSX.read(data, { type: 'array' });
                const sheet = wb.Sheets[wb.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
                if (!rows || !rows.length) {
                    me._setParseStatus('<span style="color:#dc2626;">El archivo no contiene datos.</span>', true);
                    me.unmask();
                    me._updateQueryBtn();
                    return;
                }
                const result = me._validateRows(rows);
                me._validRows = result.valid;
                me._renderParseStatus(result.valid.length, result.errors);
            } catch (err) {
                me._setParseStatus('<span style="color:#dc2626;">No se pudo leer el archivo: ' + Ext.htmlEncode(err.message || String(err)) + '</span>', true);
            } finally {
                me.unmask();
                me._updateQueryBtn();
            }
        };
        reader.onerror = function () {
            me._setParseStatus('<span style="color:#dc2626;">Error al leer el archivo.</span>', true);
            me.unmask();
        };
        reader.readAsArrayBuffer(file);
    },

    _validateRows: function (rows) {
        const valid = [], errors = [];
        rows.forEach(function (row, idx) {
            const lineNum = idx + 2;
            const idcont = String(row.IDCONT || '').trim();
            const refer = String(row.REFER || '').trim();
            const bandoc = String(row.BANDOC || '').trim();
            if (!idcont) { errors.push('Fila ' + lineNum + ': IDCONT es obligatorio'); return; }
            if (!refer && !bandoc) { errors.push('Fila ' + lineNum + ': debe tener REFER o BANDOC'); return; }
            valid.push({ IDCONT: idcont, REFER: refer || null, BANDOC: bandoc || null });
        });
        return { valid: valid, errors: errors };
    },

    _renderParseStatus: function (validCount, errors) {
        let html = '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';
        if (validCount > 0) {
            html += '<span style="background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;border-radius:10px;padding:1px 10px;font-size:11px;font-weight:600;">' +
                validCount + ' fila' + (validCount !== 1 ? 's' : '') + ' válida' + (validCount !== 1 ? 's' : '') + '</span>';
        }
        if (errors.length > 0) {
            html += '<span style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:10px;padding:1px 10px;font-size:11px;font-weight:600;">' +
                errors.length + ' error' + (errors.length !== 1 ? 'es' : '') + '</span>';
        }
        html += '</div>';
        if (errors.length > 0) {
            html += '<div style="margin-top:6px;background:#fef2f2;border:1px solid #fecaca;border-radius:4px;padding:6px 10px;font-size:11px;color:#991b1b;max-height:100px;overflow-y:auto;">' +
                errors.map(function (e) { return '<p style="margin:0;">' + Ext.htmlEncode(e) + '</p>'; }).join('') +
                '</div>';
        }
        this._setParseStatus(html, true);
    },

    _setParseStatus: function (html, show) {
        const status = this.down('#parseStatus');
        if (!status) return;
        status.update(html);
        show ? status.show() : status.hide();
    },

    _updateQueryBtn: function () {
        const btn = this.down('#btnQuery');
        if (!btn) return;
        const count = this._validRows ? this._validRows.length : 0;
        btn.setText('Consultar (' + count + ' fila' + (count !== 1 ? 's' : '') + ')');
        btn.setDisabled(count === 0);
    },

    // ── Navegación entre pasos ────────────────────────────────────────────────

    _goToStep: function (step) {
        const me = this;
        me.getLayout().setActiveItem(step - 1);

        const btnQuery = me.down('#btnQuery');
        const btnReverse = me.down('#btnReverse');
        const btnBack = me.down('#btnBack');
        const btnCancel = me.down('#btnCancel');

        if (step === 1) {
            me.setSize(540, null);
            me.setTitle('Reversa Masiva');
            btnQuery.show(); btnReverse.hide(); btnBack.hide();
            btnCancel.setText('Cancelar');
        } else {
            me.setSize(870, 520);
            me.setTitle('Reversa Masiva — ' + me._masterData.length + ' registro(s) encontrado(s)');
            btnQuery.hide(); btnReverse.show(); btnBack.show();
            btnCancel.setText('Cerrar');
        }
        me.center();
    },

    // ── Consulta al SP ────────────────────────────────────────────────────────

    _onQuery: async function () {
        const me = this;
        if (!me._validRows || !me._validRows.length) return;

        me.mask('Consultando...');
        try {
            const payload = me._validRows.map(function (r) {
                const obj = { IDCONT: r.IDCONT };
                if (r.REFER) obj.REFER = r.REFER;
                if (r.BANDOC) obj.BANDOC = r.BANDOC;
                return obj;
            });

            const res = await global.callStoreGet('PRAXISMP', 'MPS314', {
                IN_PAYLOAD: JSON.stringify(payload)
            });

            const rawRows = (res && res.lstRs && res.lstRs[0]) || [];
            if (!rawRows.length) {
                new AWN().warning('No se encontraron registros para los datos proporcionados.');
                return;
            }

            me._masterData = rawRows.map(function (r, idx) {
                const clean = { _globalIdx: idx };
                Object.keys(r).forEach(function (k) {
                    clean[k] = typeof r[k] === 'string' ? r[k].trimEnd() : r[k];
                });
                return clean;
            });

            // Pre-seleccionar todas las filas reversables
            me._selectedKeys = {};
            me._masterData.forEach(function (r) {
                if (me.BLOCKED_STSAP.indexOf(String(r.STSAP || '').toUpperCase()) < 0) {
                    me._selectedKeys[r._globalIdx] = true;
                }
            });

            me._goToStep(2);
            me._updateSummary();
            me._reloadStore(1);

        } catch (err) {
            new AWN().alert('Error al consultar: ' + (err.message || 'Error desconocido'));
        } finally {
            me.unmask();
        }
    },

    // ── Store / paginación ────────────────────────────────────────────────────

    _reloadStore: function (page) {
        const me = this;
        const grid = me.down('#resultGrid');
        if (!grid || grid.isDestroyed) return;

        const store = grid.getStore();
        const total = me._masterData.length;
        const pageNum = Math.max(1, Math.min(page || 1, Math.ceil(total / me._PAGE_SIZE) || 1));
        const start = (pageNum - 1) * me._PAGE_SIZE;
        const slice = me._masterData.slice(start, start + me._PAGE_SIZE);

        store.loadData(slice);
        store.totalCount = total;
        store.currentPage = pageNum;
        store.pageSize = me._PAGE_SIZE;

        const pagingBar = grid.down('pagingtoolbar');
        if (pagingBar) pagingBar.onLoad();

        // Restaurar selección de la página actual desde _selectedKeys
        me._suppressSelChange = true;
        const sm = grid.getSelectionModel();
        const toSelect = [];
        store.each(function (record) {
            if (me._selectedKeys[record.get('_globalIdx')] !== undefined) {
                toSelect.push(record);
            }
        });
        sm.select(toSelect, false, true);
        me._suppressSelChange = false;

        me._updateReverseBtn();
    },

    _updateSummary: function () {
        const me = this;
        const badges = me.down('#summaryBadges');
        if (!badges) return;
        const total = me._masterData.length;
        const reversable = me._masterData.filter(function (r) {
            return me.BLOCKED_STSAP.indexOf(String(r.STSAP || '').toUpperCase()) < 0;
        }).length;
        const blocked = total - reversable;

        let html = '<div style="display:flex;gap:6px;align-items:center;">' +
            '<span style="background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;border-radius:10px;padding:1px 10px;font-size:11px;font-weight:600;">' + total + ' registros encontrados</span>' +
            '<span style="background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;border-radius:10px;padding:1px 10px;font-size:11px;font-weight:600;">' + reversable + ' reversables</span>';
        if (blocked > 0) {
            html += '<span style="background:#f9fafb;color:#374151;border:1px solid #d1d5db;border-radius:10px;padding:1px 10px;font-size:11px;font-weight:600;">' + blocked + ' bloqueados (L/S/C)</span>';
        }
        html += '</div>';
        badges.update(html);
    },

    _updateReverseBtn: function () {
        const btn = this.down('#btnReverse');
        if (!btn) return;
        const count = Object.keys(this._selectedKeys).length;
        btn.setText('Reversar seleccionados (' + count + ')');
        btn.setDisabled(count === 0);
    },

    // ── Reversión ─────────────────────────────────────────────────────────────

    _onReverse: async function () {
        const me = this;

        const rows = me._masterData
            .filter(function (r) { return me._selectedKeys[r._globalIdx] !== undefined; })
            .map(function (r) {
                return {
                    IDCONT: String(r.IDCONT || ''),
                    BANDOC: String(r.BANDOC || ''),
                    DATECI: String(r.DATECI || ''),
                    TRANCI: String(r.TRANCI || ''),
                    TIPOCON: String(r.TIPOCON || ''),
                    PROCESO: String(r.PROCESO || '')
                };
            });

        if (!rows.length) return;

        // Agrupar por IDCONT (mismo patrón que executeReverseDepositBulk en React)
        const groups = {};
        rows.forEach(function (row) {
            if (!groups[row.IDCONT]) groups[row.IDCONT] = [];
            groups[row.IDCONT].push(row);
        });
        const groupEntries = Object.keys(groups).map(function (k) { return { idcont: k, rows: groups[k] }; });
        const total = groupEntries.length;
        let sent = 0;

        me.mask('Enviando reversiones... (0 de ' + total + ')');
        try {
            for (let i = 0; i < groupEntries.length; i++) {
                // TODO: reemplazar 'SPMDP00024_REV' con el SP de reversión correcto
                await global.callStoreGet('PRAXISMP', 'SPMDP00024_REV', {
                    IN_PAYLOAD: JSON.stringify(groupEntries[i].rows)
                });
                sent++;
                me.mask('Enviando reversiones... (' + sent + ' de ' + total + ')');
            }
            new AWN().success('Reversiones enviadas para ' + total + ' IDCONT.');
            if (typeof me.onAfterAction === 'function') me.onAfterAction();
            me.destroy();
        } catch (err) {
            new AWN().alert('Error al reversar: ' + (err.message || 'Error desconocido'));
            me.unmask();
        }
    }
});
