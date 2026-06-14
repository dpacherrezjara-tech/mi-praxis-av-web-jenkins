Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingDetailModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.AccountingDetailModal',

    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingDetailModalController',
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingDepositDetailModal'
    ],

    controller: 'AccountingDetailModalController',

    // ── Custom configs ────────────────────────────────────────────────────────
    /** @cfg {String} idcont  IDCONT de la fila seleccionada */
    idcont: null,
    /** @cfg {Object} rowData  Datos completos de la fila de la grilla principal */
    rowData: null,
    /** @cfg {Function} onAfterAction  Callback que se invoca tras una acción (reload grilla padre) */
    onAfterAction: null,

    // ── Window config ─────────────────────────────────────────────────────────
    title: 'Accounting Detail',
    width: 1160,
    height: 700,
    modal: true,
    border: false,
    layout: 'fit',

    listeners: {
        afterrender: 'afterRender'
    },

    // ── Dynamic build (ids use this.id which is fixed at instantiation) ───────
    initComponent: function () {
        const me = this;
        const DM = me.id;

        // Renderer compartido para columnas de depósitos / errores
        const centerCell = function (v) { return v || ''; };

        me.items = [{
            xtype: 'panel',
            layout: 'border',
            border: false,
            items: [

                // ── Summary bar ───────────────────────────────────────────────
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 72,
                    border: false,
                    bodyStyle: 'background:#2c3e50;padding:10px 16px;overflow:hidden;',
                    html: '<div id="' + DM + '-summaryContent" style="color:#fff;font-size:12px;">Loading...</div>',
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'right',
                        border: false,
                        style: 'background:#2c3e50;padding:0 8px;',
                        layout: { type: 'vbox', pack: 'center', align: 'center' },
                        items: [{
                            text: 'Console',
                            itemId: 'btn-console',
                            iconCls: 'prx-icon-image-log',
                            style: 'background:#fff;color:#2c3e50;font-weight:bold;',
                            handler: 'onConsoleClick'
                        }]
                    }]
                },

                // ── Tab panel ─────────────────────────────────────────────────
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    border: false,
                    plain: true,
                    listeners: {
                        tabchange: 'onTabChange'
                    },

                    items: [

                        // ── Deposits ─────────────────────────────────────────
                        {
                            itemId: 'tab-deposits',
                            title: 'Deposits',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: 'storeprocgrid',
                                itemId: 'grid-deposits',
                                library: 'PRAXISMP',
                                storeProcedure: 'MPS474',
                                storeParams: { IN_IDCONT: '' },
                                autoSearch: false,
                                gridTitle: 'Deposits',
                                filterCollapsible: false,
                                customController: 'Ext.Praxis.controller.payments.AccountingMasterProcess.DetailGridRowCtrl',
                                rowActions: [
                                    {
                                        action: 'detail',
                                        icon: 'prx-icon-docum',
                                        tooltip: 'Ver Detalle'
                                    },
                                    {
                                        action: 'queue',
                                        icon: 'prx-icon-image-trash',
                                        getTip: function (_v, _meta, record) {
                                            const modal = Ext.getCmp(DM);
                                            if (!modal) return 'Agregar a selección';
                                            const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');
                                            return modal.getController()._queueSet && modal.getController()._queueSet[key]
                                                ? 'En cola para reversa' : 'Agregar a selección';
                                        },
                                        isDisabled: function (_view, _ri, _ci, _item, record) {
                                            if (!['P'].includes(String(record.get('STSAP') || ''))) return true;
                                            const modal = Ext.getCmp(DM);
                                            if (!modal) return false;
                                            const ctrl = modal.getController();
                                            const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');
                                            return !!(ctrl._queueSet && ctrl._queueSet[key]);
                                        }
                                    }
                                ],
                                filterItems: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Reference',
                                        name: 'IN_REFER',
                                        emptyText: 'Referencia...',
                                        labelWidth: 75,
                                        width: 230
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Document',
                                        name: 'IN_BANDOC',
                                        emptyText: 'Bank Doc...',
                                        labelWidth: 75,
                                        width: 220
                                    }
                                ],
                                tbarItems: [
                                    {
                                        xtype: 'button',
                                        text: 'Reverse Selected (0)',
                                        itemId: 'btn-bulk-reverse',
                                        hidden: true,
                                        disabled: true,
                                        style: 'color:#c82d2d;font-weight:bold;',
                                        handler: function () {
                                            const ctrl = Ext.getCmp(DM) && Ext.getCmp(DM).getController();
                                            if (ctrl) ctrl.onBulkReverse();
                                        }
                                    }
                                ],
                                gridColumns: {
                                    defaults: { align: 'center', menuDisabled: true, sortable: true },
                                    items: [
                                        { xtype: 'rownumberer', width: 40 },
                                        { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 110, renderer: centerCell },
                                        { text: 'Reference', dataIndex: 'REFER', flex: 1, renderer: centerCell },
                                        { text: 'Value Date', dataIndex: 'VALDATE', width: 100, renderer: centerCell },
                                        { text: 'Date CI', dataIndex: 'DATECI', width: 100, renderer: centerCell },
                                        { text: 'Transaction', dataIndex: 'TRANCI', width: 120, renderer: centerCell },
                                        { text: 'Type', dataIndex: 'TIPOCON', width: 80, renderer: centerCell },
                                        {
                                            text: 'Process', dataIndex: 'PROCESO', flex: 1, renderer: function (v, meta) {
                                                const opts = {
                                                    'TC': () => {
                                                        meta.style = 'background-color:#8EC5FF;color:white;font-weight:bold;';
                                                        return 'Credit Card';
                                                    },
                                                    'CASH': () => {
                                                        meta.style = 'background-color:#A4F4CF;color:black;font-weight:bold;';
                                                        return 'Cash';
                                                    },
                                                }
                                                return opts[v.trim()] ? opts[v.trim()]() : v;
                                            }
                                        },
                                        {
                                            text: 'Bussiness', dataIndex: 'NEGOC', width: 80, renderer: function (v, meta) {
                                                const opts = {
                                                    '1': 'PAX',
                                                    '2': 'CGO',
                                                    '3': 'COR'
                                                }
                                                return opts[v] ? opts[v] : v;
                                            }
                                        },
                                        {
                                            text: 'Status', dataIndex: 'STSAP', width: 100, renderer: function (v, meta) {

                                                const opts = {
                                                    'P': () => { meta.style = 'background-color:#FBE164;color:black;font-weight:bold;'; return 'PENDING'; },
                                                    'S': () => { meta.style = 'background-color:#92E8DF;color:black;font-weight:bold;'; return 'SENDED'; },
                                                    'L': () => { meta.style = 'background-color:#31D492;color:white;font-weight:bold;'; return 'LOADED'; },
                                                    'C': () => { meta.style = 'background-color:#F6CFFF;color:white;font-weight:bold;'; return 'CLOSED'; }
                                                }
                                                return opts[v] ? opts[v]() : v;
                                            }
                                        },

                                    ]
                                }
                            }]
                        },

                        // ── Interface Errors ──────────────────────────────────
                        {
                            itemId: 'tab-interrors',
                            title: 'Interface Errors',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: 'storeprocgrid',
                                itemId: 'grid-interrors',
                                library: 'PRAXISMP',
                                storeProcedure: 'MPS475',
                                storeParams: { IN_IDCONT: '' },
                                autoSearch: false,
                                gridTitle: 'Interface Errors',
                                filterCollapsible: false,
                                customController: 'Ext.Praxis.controller.payments.AccountingMasterProcess.DetailGridRowCtrl',
                                rowActions: [
                                    {
                                        action: 'detail',
                                        icon: 'prx-icon-docum',
                                        tooltip: 'Ver Detalle'
                                    },
                                    {
                                        action: 'edit-status',
                                        icon: 'prx-icon-prorrate',
                                        getTip: function (_v, _meta, record) {
                                            const st = String(record.get('STREV') || '');
                                            if (st === '1') return 'Reversado — no editable';
                                            if (st === '2') return 'Revisado — no editable';
                                            return 'Cambiar status de revisión';
                                        },
                                        isDisabled: function (_view, _ri, _ci, _item, record) {
                                            return String(record.get('STREV') || '') !== '0';
                                        }
                                    },
                                    {
                                        action: 'queue',
                                        icon: 'prx-icon-image-trash',
                                        getTip: function (_v, _meta, record) {
                                            const modal = Ext.getCmp(DM);
                                            if (!modal) return 'Agregar a selección';
                                            const key = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');
                                            return modal.getController()._errQueueSet && modal.getController()._errQueueSet[key]
                                                ? 'En cola para guardar' : 'Agregar a selección';
                                        },
                                        isDisabled: function (_view, _ri, _ci, _item, record) {
                                            if (String(record.get('STREV') || '') !== '0') return true;
                                            const modal = Ext.getCmp(DM);
                                            if (!modal) return false;
                                            const ctrl = modal.getController();
                                            const baseKey = [record.get('BANDOC'), record.get('DATECI'), record.get('TRANCI')].join('-');
                                            const pendingKey = baseKey + '-' + (record.get('TIPOERR') || '');
                                            return !!(ctrl._errQueueSet && ctrl._errQueueSet[baseKey])
                                                || !!(ctrl._pendingErrChangesMap && ctrl._pendingErrChangesMap[pendingKey]);
                                        }
                                    }
                                ],
                                filterItems: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Reference',
                                        name: 'IN_REFER',
                                        emptyText: 'Referencia...',
                                        labelWidth: 75,
                                        width: 230
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Document',
                                        name: 'IN_BANDOC',
                                        emptyText: 'Bank Doc...',
                                        labelWidth: 75,
                                        width: 220
                                    }
                                ],
                                tbarItems: [
                                    {
                                        xtype: 'button',
                                        text: 'Mark as Reviewed (0)',
                                        itemId: 'btn-bulk-save-errors',
                                        hidden: true,
                                        disabled: true,
                                        style: 'color:#1677ff;font-weight:bold;',
                                        handler: function () {
                                            const ctrl = Ext.getCmp(DM) && Ext.getCmp(DM).getController();
                                            if (ctrl) ctrl.onBulkSaveErrors();
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Mark as Reversed (0)',
                                        itemId: 'btn-bulk-reverse-errors',
                                        hidden: true,
                                        disabled: true,
                                        style: 'color:#c82d2d;font-weight:bold;',
                                        handler: function () {
                                            const ctrl = Ext.getCmp(DM) && Ext.getCmp(DM).getController();
                                            if (ctrl) ctrl.onBulkReverseErrors();
                                        }
                                    }
                                ],
                                gridColumns: {
                                    defaults: { align: 'center', menuDisabled: true, sortable: true },
                                    items: [
                                        { xtype: 'rownumberer', width: 40 },
                                        { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 110, renderer: centerCell },
                                        { text: 'Reference', dataIndex: 'REFER', width: 130, renderer: centerCell },
                                        { text: 'Value Date', dataIndex: 'VALDATE', width: 100, renderer: centerCell },
                                        { text: 'Date CI', dataIndex: 'DATECI', width: 100, renderer: centerCell },
                                        { text: 'Transaction', dataIndex: 'TRANCI', width: 120, renderer: centerCell },
                                        { text: 'Type', dataIndex: 'TIPOCON', width: 80, renderer: centerCell },
                                        { text: 'Error<br>Code', dataIndex: 'CERROR', width: 60, align: 'center' },
                                        { text: 'Description', dataIndex: 'DESCERR', flex: 1, align: 'left' },
                                        {
                                            text: 'Status', dataIndex: 'STREV', width: 100, renderer: function (v, meta) {

                                                const opts = {
                                                    '0': () => { meta.style = 'background-color:red;color:white;font-weight:bold;'; return 'PENDING'; },
                                                    '1': () => { meta.style = 'background-color:#BBF451;color:black;font-weight:bold;'; return 'REVERSED'; },
                                                    '2': () => { meta.style = 'background-color:#46ECD5;color:white;font-weight:bold;'; return 'VERIFIED'; }
                                                }
                                                return opts[v] ? opts[v]() : v;
                                            }
                                        }
                                    ]
                                }
                            }]
                        },

                        // ── Files (MPS496 — no paginado) ─────────────────────
                        {
                            itemId: 'tab-files',
                            title: 'Files',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: 'gridpanel',
                                itemId: 'grid-files',
                                border: false,
                                columnLines: true,
                                scrollable: true,
                                viewConfig: { stripeRows: true, enableTextSelection: true, markDirty: false },
                                store: {
                                    fields: ['CORRL', 'FILENAM', 'FILESZ', 'STSAP', 'IDCONT'],
                                    data: []
                                },
                                tbar: [
                                    '->',
                                    {
                                        text: 'Close Interfaces',
                                        itemId: 'btn-close-interfaces',
                                        hidden: true,
                                        iconCls: 'prx-icon-complete',
                                        style: 'color:#c82d2d;font-weight:bold;',
                                        handler: 'onCloseInterfacesClick'
                                    }
                                ],
                                columns: [
                                    { xtype: 'rownumberer', width: 40 },
                                    { text: 'Seq.', dataIndex: 'CORRL', width: 60, align: 'center', menuDisabled: true, sortable: false },
                                    { text: 'File Name', dataIndex: 'FILENAM', flex: 1, menuDisabled: true, sortable: false },
                                    { text: 'Size', dataIndex: 'FILESZ', width: 100, align: 'center', menuDisabled: true, sortable: false },
                                    {
                                        text: 'SAP Status',
                                        dataIndex: 'STSAP',
                                        width: 110,
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: false,
                                        renderer: function (v, meta) {
                                            const opts = {
                                                '': () => {
                                                    meta.style = 'background-color:red;color:white;font-weight:bold;';
                                                    return 'Error';
                                                },
                                                '0': () => {
                                                    meta.style = 'background-color:#42D3F2;color:white;font-weight:bold;';
                                                    return 'Ready';
                                                },
                                                '1': () => {
                                                    meta.style = 'background-color:#51A2FF;color:white;font-weight:bold;';
                                                    return 'SFTP';
                                                },
                                                '2': () => {
                                                    meta.style = 'background-color:#7BF1A8;color:white;font-weight:bold;';
                                                    return 'Loaded';
                                                },
                                                '3': () => {
                                                    meta.style = 'background-color:#FFB86A;color:white;font-weight:bold;';
                                                    return 'Rejected';
                                                },
                                                '4': () => {
                                                    meta.style = 'background-color:#FDC745;color:white;font-weight:bold;';
                                                    return 'Partially Rejected';
                                                },
                                                '5': () => {
                                                    meta.style = 'background-color:#B8E6FE;color:white;font-weight:bold;';
                                                    return 'Partially Loaded';
                                                },
                                                '6': () => {
                                                    meta.style = 'background-color:#DDD6FF;color:white;font-weight:bold;';
                                                    return 'Closed';
                                                },
                                            }
                                            return opts[v] ? opts[v]() : v;
                                        }
                                    },
                                    {
                                        text: 'Actions',
                                        dataIndex: 'CORRL',
                                        width: 100,
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: false,
                                        renderer: function (v, meta, record) {
                                            console.log(record.get('FILENAM'));
                                            const filename = String(record.get('FILENAM') || 'error.txt').trimEnd();
                                            if (!v) return '—';
                                            const idcont = String(record.get('IDCONT') || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                                            const onclick = 'Ext.getCmp(\'' + DM + '\').getController()'
                                                + '.onDownloadInterface(\'' + filename + '\',\'' + idcont + '\',' + Number(v) + ')';
                                            return '<a href="javascript:void(0)" onclick="' + onclick + '" '
                                                + 'style="color:#1677ff;font-weight:bold;text-decoration:underline;">'
                                                + '⬇ Download</a>';
                                        }
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ]
        }];

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: true,
            margin: '0',
            style: 'background:#2c3e50;border-top:2px solid #4a6278;',
            layout: { pack: 'center' },
            defaults: { scale: 'medium' },
            items: [
                {
                    text: 'Download ZIP',
                    itemId: 'btn-download',
                    hidden: true,
                    iconCls: 'prx-icon-download',
                    handler: 'onDownloadZip'
                },
                {
                    text: 'Send SFTP',
                    itemId: 'btn-sftp',
                    hidden: true,
                    iconCls: 'prx-icon-process-send',
                    handler: 'onSftpClick'
                },
                {
                    text: 'Reverse',
                    itemId: 'btn-reverse',
                    hidden: true,
                    iconCls: 'prx-icon-reload',
                    style: 'color:#c82d2d;',
                    handler: 'onReverse'
                },
                {
                    text: 'Close',
                    itemId: 'btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    handler: 'onCancelClick'
                }
            ]
        }];

        me.callParent(arguments);
    }
});
