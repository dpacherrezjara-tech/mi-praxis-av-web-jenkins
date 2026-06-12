Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingDepositDetailModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.AccountingDepositDetailModal',

    requires: ['Ext.grid.plugin.CellEditing', 'Ext.toolbar.Paging'],

    /** @cfg {Object} rowData  Datos de la fila del depósito / error de interfaz */
    rowData: null,
    /** @cfg {String} stcont  STCONT del contrato padre — limita la edición */
    stcont: null,

    title: 'Deposit Detail',
    width: 1350,
    height: 620,
    modal: true,
    border: false,
    layout: 'fit',

    ADMIN_USERS: ['MPACHECO', 'PLOPEZ', 'MPACHECOT', 'PXAVAPIT', 'PXAVAPI', 'GLADYSAT', 'GLADYSA'],

    // ── State ─────────────────────────────────────────────────────────────────
    _masterData: null,        // array maestro en memoria — fuente única de verdad
    _pendingChangesMap: null, // { rowKey: rowData } — filas con cambios pendientes
    _newRowKeysMap: null,     // { rowKey: true }    — filas recién añadidas
    _canEdit: false,
    _PAGE_SIZE: 30,

    // =========================================================================
    // initComponent
    // =========================================================================

    initComponent: function () {
        const me = this;

        me._masterData = [];
        me._pendingChangesMap = {};
        me._newRowKeysMap = {};

        const EDITABLE_STCONT = ['2', '3'];
        const user = ((document.getElementById('menuUser') || {}).textContent || '').trim();
        me._canEdit = me.ADMIN_USERS.includes(user) && EDITABLE_STCONT.includes(String(me.stcont || ''));

        // ── Editor factories ─────────────────────────────────────────────────
        const EC = 'praxis-editable-cell';
        const mkTxt = function (n) {
            return me._canEdit
                ? { xtype: 'textfield', maxLength: n, enforceMaxLength: true, allowBlank: true, selectOnFocus: true }
                : null;
        };
        const mkNum = function () {
            return me._canEdit
                ? { xtype: 'numberfield', minValue: 0, maxValue: 999999999, decimalPrecision: 2, allowBlank: false, selectOnFocus: true }
                : null;
        };
        const mkSel = function () {
            return me._canEdit
                ? { xtype: 'combobox', store: ['15', '50', '01', '40'], editable: false, allowBlank: false }
                : null;
        };

        // ── Column helper ────────────────────────────────────────────────────
        const c = function (label, dataIndex, width, extra) {
            return Ext.apply({ text: label, dataIndex: dataIndex, width: width, menuDisabled: true, sortable: false }, extra || {});
        };

        const columns = [
            { xtype: 'rownumberer', width: 40 },
            c('Secuencia', 'A4545SEQ', 80, { align: 'center' }),
            c('Item', 'A4545ITEM', 55, { align: 'center' }),
            c('Referencia', 'A4545REFD', 130, { align: 'center' }),
            c('Fecha Valor', 'A4545DOCD', 95, { align: 'center' }),
            c('Tipo Doc.', 'A4545DOCT', 75, { align: 'center' }),
            c('Company', 'A4545COMPC', 80, { align: 'center', editor: mkTxt(4), tdCls: me._canEdit ? EC : '' }),
            c('Centro Beneficio', 'A4545PROFI', 130, { editor: mkTxt(15), tdCls: me._canEdit ? EC : '' }),
            c('Centro Costo', 'A4545CCOST', 120, { editor: mkTxt(15), tdCls: me._canEdit ? EC : '' }),
            c('Cuenta', 'A4545CUENT', 80, { align: 'center', editor: mkTxt(6), tdCls: me._canEdit ? EC : '' }),
            c('Deudor SAP', 'A4545CUSTO', 100, { align: 'center', editor: mkTxt(10), tdCls: me._canEdit ? EC : '' }),
            c('Texto', 'A4545TEXTD', 330, { editor: mkTxt(60), tdCls: me._canEdit ? EC : '' }),
            c('Clave', 'A4545PKEY', 70, {
                align: 'center',
                editor: mkSel(),
                tdCls: me._canEdit ? EC : '',
                renderer: function (v) {
                    const s = { '15': '#1677ff', '50': '#52c41a', '01': '#722ed1', '40': '#f5222d' }[String(v)];
                    return s ? '<b style="color:' + s + ';">' + (v || '') + '</b>' : (v || '');
                }
            }),
            c('Valor', 'A4545ACTIV', 120, { align: 'right', editor: mkNum(), tdCls: me._canEdit ? EC : '' }),
            c('Moneda', 'A4545CUR', 60, { align: 'center' }),
            c('Clave 1', 'A4545REFK', 120, { editor: mkTxt(30), tdCls: me._canEdit ? EC : '' }),
            c('Clave 2', 'A4545REFK2', 120, { editor: mkTxt(30), tdCls: me._canEdit ? EC : '' }),
            c('Clave 3', 'A4545REFB', 180, { editor: mkTxt(30), tdCls: me._canEdit ? EC : '' }),
            c('Nombre', 'A4545NAME', 130, {}),
            c('Ciudad', 'A4545CITY', 100, {}),
            c('Referencia de Pago', 'A4545REPAG', 140, { editor: mkTxt(23), tdCls: me._canEdit ? EC : '' }),
            c('Asignacion', 'A4545ANUMB', 110, { editor: mkTxt(23), tdCls: me._canEdit ? EC : '' }),
            c('Agente', 'A4545AGENT', 80, {}),
            c('Merchant', 'A4545MERCH', 90, {}),
            c('Pais', 'A4545PAIS', 60, { align: 'center' }),
            c('Registro', 'A4545HREGI', 90, { align: 'center' }),
            c('Desc. Registro', 'A4545FREGI', 120, {}),
            c('Usuario Update', 'A4545USRUP', 110, { align: 'center' }),
            c('Fecha Update', 'A4545TSUP', 150, { align: 'center' }),
            c('Modificacion', 'A4545MODIF', 115, {
                align: 'center',
                renderer: function (v) {
                    if (!v || !String(v).trim()) return '<span style="color:#bbb;">—</span>';
                    const map = { U: { c: '#1677ff', t: 'Modificacion' }, I: { c: '#52c41a', t: 'Insercion' } };
                    const o = map[String(v)] || { c: '#888', t: String(v) };
                    return '<span style="background:' + o.c + '22;color:' + o.c + ';border:1px solid ' + o.c + '55;'
                        + 'border-radius:10px;padding:1px 8px;font-size:11px;font-weight:600;">' + o.t + '</span>';
                }
            })
        ];

        // ── Columna de acción: eliminar filas nuevas ──────────────────────────
        if (me._canEdit) {
            columns.push({
                xtype: 'actioncolumn',
                text: 'Acciones',
                width: 80,
                align: 'center',
                menuDisabled: true,
                sortable: false,
                items: [{
                    tooltip: 'Eliminar fila nueva',
                    getClass: function (_v, _meta, record) {
                        const key = record.get('A4545SEQ') + '-' + record.get('A4545ITEM');
                        return me._newRowKeysMap[key] ? 'prx-icon-image-trash' : 'x-hidden-display';
                    },
                    isDisabled: function (_v, _ri, _ci, _item, record) {
                        return !me._newRowKeysMap[record.get('A4545SEQ') + '-' + record.get('A4545ITEM')];
                    },
                    handler: function (_grid, _ri, _ci, _item, _e, record) {
                        const key = record.get('A4545SEQ') + '-' + record.get('A4545ITEM');
                        if (!me._newRowKeysMap[key]) return;
                        delete me._newRowKeysMap[key];
                        delete me._pendingChangesMap[key];
                        me._masterData = me._masterData.filter(function (d) {
                            return String(d.A4545SEQ) + '-' + String(d.A4545ITEM) !== key;
                        });
                        const store = me.down('#grid-deposit-detail').getStore();
                        const curPage = store.currentPage || 1;
                        const maxPage = Math.ceil(me._masterData.length / me._PAGE_SIZE) || 1;
                        me._reloadStore(Math.min(curPage, maxPage));
                        me._updateSaveBtn();
                    }
                }]
            });
        }

        // ── CellEditing plugin ───────────────────────────────────────────────
        const plugins = me._canEdit ? [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function (_editor, e) {
                    const key = e.record.get('A4545SEQ') + '-' + e.record.get('A4545ITEM');
                    const updated = e.record.getData();
                    delete updated.id; // remove ExtJS internal id to avoid conflicts on reload
                    // Actualizar en el array maestro
                    for (var i = 0; i < me._masterData.length; i++) {
                        const mk = String(me._masterData[i].A4545SEQ) + '-' + String(me._masterData[i].A4545ITEM);
                        if (mk === key) {
                            me._masterData[i] = updated;
                            break;
                        }
                    }
                    me._pendingChangesMap[key] = updated;
                    me._updateSaveBtn();
                }
            }
        })] : [];

        // ── Grid ─────────────────────────────────────────────────────────────
        me.items = [{
            xtype: 'gridpanel',
            itemId: 'grid-deposit-detail',
            border: false,
            columnLines: true,
            plugins: plugins,
            store: {
                fields: [
                    'A4545REFD', 'A4545DOCD', 'A4545DOCT', 'A4545SEQ', 'A4545ITEM',
                    'A4545COMPC', 'A4545PROFI', 'A4545CCOST', 'A4545CUENT', 'A4545CUSTO',
                    'A4545TEXTD', 'A4545PKEY', 'A4545ACTIV', 'A4545CUR', 'A4545REFK',
                    'A4545REFK2', 'A4545REFB', 'A4545NAME', 'A4545CITY', 'A4545REPAG',
                    'A4545ANUMB', 'A4545AGENT', 'A4545MERCH', 'A4545PAIS', 'A4545FREGI',
                    'A4545HREGI', 'A4545USRUP', 'A4545TSUP', 'A4545MODIF'
                ],
                pageSize: 30,
                proxy: { type: 'memory' }
            },
            viewConfig: { stripeRows: true, enableTextSelection: true, markDirty: me._canEdit },
            columns: columns,
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: 'Registros {0} - {1} de {2}',
                emptyMsg: 'Sin registros'
            }
        }];

        // ── Footer toolbar ────────────────────────────────────────────────────
        const footerItems = [];
        if (me._canEdit) {
            footerItems.push(
                {
                    text: 'Añadir filas',
                    itemId: 'btn-add-rows',
                    iconCls: 'prx-icon-add',
                    handler: function () { me._handleAddRows(); }
                },
                {
                    text: 'Guardar cambios (0)',
                    itemId: 'btn-save-changes',
                    iconCls: 'prx-icon-save',
                    disabled: true,
                    style: 'color:#1677ff;font-weight:bold;',
                    handler: function () { me._handleSaveAll(); }
                }
            );
        }
        footerItems.push({
            text: 'Close',
            iconCls: 'prx-icon-cancel',
            handler: function () { me.destroy(); }
        });

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: { pack: 'center' },
            defaults: { scale: 'medium' },
            items: footerItems
        }];

        me.callParent(arguments);
    },

    // =========================================================================
    // Private helpers
    // =========================================================================

    // Slice _masterData para la página indicada, carga el slice en el store y
    // actualiza manualmente el pagingtoolbar.
    // No usa enablePaging ni loadPage — ambos causan que el proxy procese el
    // array completo a través del reader, corrompiendo el índice con cada llamada.
    _reloadStore: function (page) {
        const me = this;
        const grid = me.down('#grid-deposit-detail');
        if (!grid || grid.isDestroyed) return;

        const store = grid.getStore();
        const total = me._masterData.length;
        const pageNum = Math.max(1, Math.min(page || 1, Math.ceil(total / me._PAGE_SIZE) || 1));
        const start = (pageNum - 1) * me._PAGE_SIZE;
        const slice = me._masterData.slice(start, start + me._PAGE_SIZE);

        store.loadData(slice);

        // loadData hace delete me.totalCount internamente — restauramos después
        store.totalCount = total;
        store.currentPage = pageNum;
        store.pageSize = me._PAGE_SIZE;

        const pagingBar = grid.down('pagingtoolbar');
        if (pagingBar) {
            pagingBar.onLoad();
        }
    },

    _updateSaveBtn: function () {
        const me = this;
        const btn = me.down('#btn-save-changes');
        if (!btn) return;
        const count = Object.keys(me._pendingChangesMap).length;
        btn.setText('Guardar cambios (' + count + ')');
        btn.setDisabled(count === 0);
    },

    // Añade una fila nueva por cada grupo SEQ presente en _masterData.
    _handleAddRows: function () {
        const me = this;
        if (!me._masterData || !me._masterData.length) return;

        const groups = {};
        me._masterData.forEach(function (d) {
            const seq = String(d.A4545SEQ || '');
            if (!seq) return;
            if (!groups[seq]) groups[seq] = [];
            groups[seq].push(d);
        });

        let added = 0;
        Ext.Object.each(groups, function (_seq, rows) {
            let maxItem = 0;
            rows.forEach(function (d) {
                const n = Number(d.A4545ITEM || 0);
                if (n > maxItem) maxItem = n;
            });

            const newData = Ext.apply({}, rows[0]);
            delete newData.id; // evitar conflicto de ids internos de ExtJS
            newData.A4545ITEM = maxItem + 1;
            newData.A4545USRUP = '';
            newData.A4545TSUP = '';
            newData.A4545MODIF = 'I';

            const key = String(newData.A4545SEQ) + '-' + String(newData.A4545ITEM);
            me._newRowKeysMap[key] = true;
            me._pendingChangesMap[key] = Ext.apply({}, newData);
            me._masterData.push(newData);
            added++;
        });

        if (!added) return;

        const lastPage = Math.ceil(me._masterData.length / me._PAGE_SIZE) || 1;
        me._reloadStore(lastPage);
        me._updateSaveBtn();
    },

    _handleSaveAll: async function () {
        const me = this;
        const pendingRows = Object.values(me._pendingChangesMap);
        if (!pendingRows.length) return;

        me.mask('Guardando cambios...');
        const saveBtn = me.down('#btn-save-changes');
        const addBtn = me.down('#btn-add-rows');
        if (saveBtn) saveBtn.setDisabled(true);
        if (addBtn) addBtn.setDisabled(true);

        try {
            const row = me.rowData || {};
            const user = ((document.getElementById('menuUser') || {}).textContent || '').trim();

            const payloadRows = pendingRows.map(function (r) {
                return {
                    A4545SEQ: Number(r.A4545SEQ || 0),
                    A4545ITEM: Number(r.A4545ITEM || 0),
                    A4545COMPC: String(r.A4545COMPC || ''),
                    A4545PROFI: String(r.A4545PROFI || ''),
                    A4545CCOST: String(r.A4545CCOST || ''),
                    A4545CUENT: String(r.A4545CUENT || ''),
                    A4545ACTIV: Number(r.A4545ACTIV || 0),
                    A4545PKEY: String(r.A4545PKEY || ''),
                    A4545REFK: String(r.A4545REFK || ''),
                    A4545REFK2: String(r.A4545REFK2 || ''),
                    A4545REFB: String(r.A4545REFB || ''),
                    A4545REPAG: String(r.A4545REPAG || ''),
                    A4545ANUMB: String(r.A4545ANUMB || ''),
                    A4545TEXTD: String(r.A4545TEXTD || ''),
                    A4545CUSTO: String(r.A4545CUSTO || ''),
                    A4545CUR: String(r.A4545CUR || '')
                };
            });

            await global.callStoreGet('PRAXISMP', 'MPS535', {
                IN_IDCONT: String(row.IDCONT || ''),
                IN_BANDOC: String(row.BANDOC || ''),
                IN_DATECI: String(row.DATECI || ''),
                IN_TRANCI: String(row.TRANCI || ''),
                IN_PAYLOAD: JSON.stringify(payloadRows),
                IN_USER: user || 'SYSTEM'
            });

            new AWN().success('Cambios guardados correctamente');
            me._pendingChangesMap = {};
            me._newRowKeysMap = {};
            me._loadData();
        } catch (e) {
            new AWN().alert('Error al guardar: ' + (e.message || 'No se pudieron guardar los cambios'));
            me._updateSaveBtn();
            if (addBtn) addBtn.setDisabled(false);
        } finally {
            me.unmask();
        }
    },

    // Carga datos desde el SP y los guarda en _masterData.
    _loadData: async function () {
        const me = this;
        const row = me.rowData || {};
        const sp = String(row.STREV || '') === '1' ? 'MPS533' : 'MPS534';
        const grid = me.down('#grid-deposit-detail');
        if (!grid) return;

        grid.mask('Loading...');
        try {
            const res = await global.callStoreGet('PRAXISMP', sp, {
                IN_IDCONT: String(row.IDCONT || ''),
                IN_BANDOC: String(row.BANDOC || ''),
                IN_DATECI: String(row.DATECI || ''),
                IN_TRANCI: String(row.TRANCI || '')
            });
            if (grid.isDestroyed) return;
            me._masterData = ((res && res.lstRs && res.lstRs[0]) || []).map(function (row) {
                const clean = {};
                Object.keys(row).forEach(function (k) {
                    clean[k] = typeof row[k] === 'string' ? row[k].trimEnd() : row[k];
                });
                return clean;
            });
            me._reloadStore(1);
            const addBtn = me.down('#btn-add-rows');
            if (addBtn) addBtn.setDisabled(false);
        } catch (e) {
            console.error('[AccountingDepositDetailModal] Load error:', e);
        } finally {
            if (!grid.isDestroyed) grid.unmask();
        }
    },

    // =========================================================================
    // Listeners
    // =========================================================================

    listeners: {
        afterrender: function () {
            const me = this;
            const row = me.rowData || {};
            me.setTitle('Deposit Detail — ' + (String(row.BANDOC || '') || String(row.IDCONT || '')));

            // Interceptar la navegación del pagingtoolbar (prev/next/first/last/input).
            // El pagingtoolbar llama store.nextPage() → store.loadPage(n) → store.load() → beforeload.
            // Cancelamos el load real y llamamos _reloadStore con la página ya seteada por loadPage.
            const grid = me.down('#grid-deposit-detail');
            if (grid) {
                const store = grid.getStore();
                store.on('beforeload', function (s) {
                    // store.currentPage ya fue actualizado por loadPage() antes de disparar beforeload
                    me._reloadStore(s.currentPage || 1);
                    return false; // cancelar el load real al proxy memory
                });
            }

            me._loadData();
        }
    }
});
