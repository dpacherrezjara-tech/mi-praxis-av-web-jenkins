Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ProcessAccountingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessAccountingDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.ProcessAccountingDataEntryController'
    ],
    controller: 'ProcessAccountingDataEntryController',

    procesadores: [],
    onAfterAction: null,

    title: 'Ejecutar Contabilidad',
    width: 550,
    height: 260,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: { border: false },

    listeners: {
        afterrender: 'afterRender'
    },

    initComponent: function () {
        const me = this;
        const W = me.id;

        me.items = [{
            xtype: 'panel',
            itemId: 'card-layout',
            layout: 'card',
            border: false,
            items: [

                // ── Card 0: Form ──────────────────────────────────────────────
                {
                    itemId: 'card-form',
                    xtype: 'form',
                    id: W + '-mainForm',
                    border: false,
                    bodyPadding: '8 8 4 8',
                    layout: { type: 'vbox', align: 'stretch' },
                    defaults: {
                        xtype: 'fieldset',
                        layout: { type: 'vbox' },
                        border: true,
                        margin: '2 2 2 2',
                        style: { backgroundColor: '#efe5e5' },
                        defaults: {
                            xtype: 'panel',
                            layout: { type: 'hbox', pack: 'left' },
                            border: false,
                            bodyStyle: 'background:transparent',
                            defaults: {
                                xtype: 'textfield',
                                margin: '2 5 2 5',
                                labelStyle: 'text-align:left;font-weight:bolder;',
                                fieldStyle: 'text-align:center;'
                            }
                        }
                    },
                    items: [{
                        title: '<span style="font-weight:bold;text-decoration:underline;font-size:13px;">Parameters</span>',
                        items: [
                            // Row 1: Process + Client
                            {
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Process',
                                        labelStyle: 'font-weight:bold;',
                                        name: 'IN_PROC_TYPE',
                                        id: W + '-cmbProcType',
                                        store: Ext.create('Ext.data.SimpleStore', {
                                            fields: ['code', 'name'],
                                            data: [['TC', 'Credit Card'], ['CASH', 'Cash']]
                                        }),
                                        labelWidth: 70, width: 210,
                                        displayField: 'name', valueField: 'code',
                                        queryMode: 'local', editable: false,
                                        value: 'TC',
                                        listeners: { change: 'onChangeProcType' }
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Client',
                                        labelStyle: 'font-weight:bold;',
                                        name: 'IN_CCUST',
                                        id: W + '-cmbCcust',
                                        store: Ext.create('Ext.data.SimpleStore', {
                                            fields: ['code', 'name'],
                                            data: [
                                                ['134', 'AV - AVIANCA'], ['202', 'TA - TACA'],
                                                ['547', '2K - AEROGAL'], ['133', 'LR - LACSA']
                                            ]
                                        }),
                                        labelWidth: 55, width: 215,
                                        displayField: 'name', valueField: 'code',
                                        queryMode: 'local', editable: false,
                                        emptyText: 'Select Client',
                                        listeners: { change: 'onChangeCcust' }
                                    }
                                ]
                            },
                            // Row 2: Acc. Type + Business (NEGOC)
                            {
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Acc. Type',
                                        labelStyle: 'font-weight:bold;',
                                        name: 'IN_TIPOCON',
                                        id: W + '-cmbTIPOCON',
                                        store: Ext.create('Ext.data.SimpleStore', {
                                            fields: ['code', 'name'],
                                            data: [
                                                ['REG', 'Regular'], ['DEB', 'Débito'],
                                                ['ADJ', 'Ajustes'], ['SAL', 'Venta sin Pago'],
                                                ['ADM', 'Debit Memo'], ['REV', 'Reversa']
                                            ]
                                        }),
                                        labelWidth: 70, width: 210,
                                        displayField: 'name', valueField: 'code',
                                        queryMode: 'local', editable: false,
                                        value: 'REG',
                                        listeners: { change: 'onChangeTipocon' }
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Business',
                                        name: 'IN_NEGOC',
                                        id: W + '-cmbNegoc',
                                        store: Ext.create('Ext.data.SimpleStore', {
                                            fields: ['code', 'name'],
                                            data: [['1', 'PAX'], ['2', 'CGO'], ['3', 'COR']]
                                        }),
                                        labelWidth: 65, width: 175,
                                        displayField: 'name', valueField: 'code',
                                        queryMode: 'local', editable: false,
                                        value: '1'
                                    }
                                ]
                            },
                            // Row 3: Processor (full width)
                            {
                                items: [{
                                    xtype: 'combo',
                                    fieldLabel: 'Processor',
                                    name: 'IN_CODPRO',
                                    id: W + '-cmbCODPRO',
                                    labelWidth: 70, width: 250,
                                    valueField: 'PROCESADOR',
                                    displayField: 'PROC_DESC',
                                    queryMode: 'local',
                                    editable: true,
                                    typeAhead: true,
                                    minChars: 0,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    anyMatch: true,
                                    caseSensitive: false,
                                    allowBlank: true,
                                    emptyText: 'Select Processor',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['PROCESADOR', 'PROC_DESC'],
                                        data: [],
                                        sorters: [{ property: 'PROC_DESC', direction: 'ASC' }]
                                    })
                                }]
                            },
                            // Row 4: From + To
                            {
                                items: [
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'From',
                                        name: 'IN_PRDAF',
                                        id: W + '-dateFrom',
                                        format: 'Ymd',
                                        labelWidth: 70, width: 200,
                                        value: new Date(),
                                        listeners: { change: 'onChangeFromDate' }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'To',
                                        name: 'IN_PRDAT',
                                        id: W + '-dateTo',
                                        format: 'Ymd',
                                        labelWidth: 30, width: 165,
                                        value: new Date()
                                    }
                                ]
                            }
                        ]
                    }]
                },

                // ── Card 1: Preview ───────────────────────────────────────────
                {
                    itemId: 'card-preview',
                    xtype: 'panel',
                    layout: 'border',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            region: 'north',
                            height: 68,
                            border: false,
                            bodyStyle: 'background:#2c3e50;padding:6px 14px;overflow:hidden;',
                            layout: { type: 'vbox', align: 'stretch' },
                            items: [
                                // Fila 1: resumen de parámetros
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    border: false,
                                    bodyStyle: 'background:transparent;',
                                    html: '<div id="' + W + '-summaryContent" '
                                        + 'style="color:#fff;font-size:12px;line-height:1.6;'
                                        + 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'
                                        + 'Registros pendientes</div>'
                                },
                                // Fila 2: fecha contable alineada a la derecha
                                {
                                    xtype: 'panel',
                                    height: 28,
                                    border: false,
                                    bodyStyle: 'background:transparent;',
                                    layout: { type: 'hbox', align: 'middle', pack: 'end' },
                                    items: [{
                                        xtype: 'datefield',
                                        fieldLabel: 'Accounting Date',
                                        labelStyle: 'color:#fff;font-weight:bold;white-space:nowrap;',
                                        name: 'IN_FCONT',
                                        id: W + '-dateFcont',
                                        format: 'Ymd',
                                        labelWidth: 115, width: 245,
                                        value: new Date(),
                                        allowBlank: false,
                                        listeners: { change: 'onFcontChange' }
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            itemId: 'grid-pending',
                            region: 'center',
                            border: false,
                            columnLines: true,
                            scrollable: true,
                            selModel: { type: 'checkboxmodel', mode: 'MULTI' },
                            viewConfig: { stripeRows: true, markDirty: false, enableTextSelection: true },
                            store: Ext.create('Ext.data.Store', {
                                fields: ['BANDOC', 'DATECI', 'TRANCI', 'TIPOCON', 'PROCESO', 'NEGOC',
                                         'DATEC', 'TRANC', 'CODPRO'],
                                data: []
                            }),
                            tbar: [
                                { text: 'Seleccionar Todo', handler: 'onSelectAll' },
                                { text: 'Deseleccionar Todo', handler: 'onDeselectAll' },
                                '-',
                                { xtype: 'label', id: W + '-selCountLabel', text: '0 seleccionado(s)' }
                            ],
                            listeners: { selectionchange: 'onSelectionChange' },
                            columns: [
                                { xtype: 'rownumberer', width: 40 },
                                // Columnas modo estándar (BANDOC / DATECI / TRANCI)
                                { text: 'Bank Doc.', dataIndex: 'BANDOC', flex: 1, align: 'center', menuDisabled: true, itemId: 'col-bandoc' },
                                { text: 'Date CI', dataIndex: 'DATECI', width: 100, align: 'center', menuDisabled: true, itemId: 'col-dateci' },
                                { text: 'Transaction', dataIndex: 'TRANCI', width: 100, align: 'center', menuDisabled: true, itemId: 'col-tranci' },
                                { text: 'Type', dataIndex: 'TIPOCON', width: 80, align: 'center', menuDisabled: true, itemId: 'col-tipocon' },
                                {
                                    text: 'Process', dataIndex: 'PROCESO', width: 110, align: 'center', menuDisabled: true, itemId: 'col-proceso',
                                    renderer: function (v, meta) {
                                        const val = (v || '').trim();
                                        if (val === 'TC') {
                                            meta.style = 'background-color:#8EC5FF;color:white;font-weight:bold;';
                                            return 'Credit Card';
                                        }
                                        if (val === 'CASH') {
                                            meta.style = 'background-color:#A4F4CF;color:black;font-weight:bold;';
                                            return 'Cash';
                                        }
                                        return v || '';
                                    }
                                },
                                {
                                    text: 'Business', dataIndex: 'NEGOC', width: 80, align: 'center', menuDisabled: true, itemId: 'col-negoc',
                                    renderer: function (v) {
                                        return { '1': 'PAX', '2': 'CGO', '3': 'COR' }[v] || (v || '');
                                    }
                                },
                                // Columnas modo AB/VN/BM (ocultas por defecto)
                                { text: 'Date C', dataIndex: 'DATEC', width: 100, align: 'center', menuDisabled: true, hidden: true, itemId: 'col-datec' },
                                { text: 'Tran. C', dataIndex: 'TRANC', width: 100, align: 'center', menuDisabled: true, hidden: true, itemId: 'col-tranc' },
                                { text: 'Processor', dataIndex: 'CODPRO', width: 80, align: 'center', menuDisabled: true, hidden: true, itemId: 'col-codpro-grid' }
                            ]
                        }
                    ]
                }
            ]
        }];

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: { pack: 'center' },
            defaults: { scale: 'medium' },
            items: [
                {
                    text: 'Consultar Pendientes',
                    itemId: 'btn-query',
                    iconCls: 'prx-icon-image-process',
                    listeners: { click: 'onQueryClick' }
                },
                {
                    text: 'Generar',
                    itemId: 'btn-generate',
                    hidden: true,
                    disabled: true,
                    iconCls: 'prx-icon-image-process',
                    listeners: { click: 'onGenerateClick' }
                },
                {
                    text: 'Volver',
                    itemId: 'btn-back',
                    hidden: true,
                    iconCls: 'prx-icon-reload',
                    listeners: { click: 'onBackClick' }
                },
                {
                    text: 'Cancel',
                    itemId: 'btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: { click: 'onCancelClick' }
                }
            ]
        }];

        me.callParent(arguments);
    }
});
