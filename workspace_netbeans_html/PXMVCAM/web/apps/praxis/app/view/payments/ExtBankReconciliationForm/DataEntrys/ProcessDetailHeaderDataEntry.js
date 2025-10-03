prototype.idDE = prototype.id + '-ProcessDetailHeaderDataEntry';

Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.DataEntrys.ProcessDetailHeaderDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessDetailHeaderDataEntry',
    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.field.*',
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.ProcessDetailHeaderController'
    ],
    controller: 'ProcessDetailHeaderController',
    liquidaParam: null,
    adateParam: null,
    codproParam: null,
    stvalParam: null,
    totalHeaderParam: null,
    comisionHeaderParam: null,
    netoHeaderParam: null,
    title: 'Header Detail',
    width: 1700,
    height: 600,
    layout: 'fit',
    modal: true,
    border: false,

    items: [{
        xtype: 'tabpanel',
        activeTab: 0,
        items: [
            // Tab 1: Settlements
            {
                title: 'Settlements',
                xtype: 'grid',
                reference: 'settlementsGrid',
                listeners: {
                    afterrender: 'onAfterRenderSettlements'
                },
                store: {
                    fields: [
                        { name: 'RN', type: 'int' },
                        { name: 'STVAL', type: 'string' },
                        { name: 'TDOC', type: 'string' },
                        { name: 'LIQUIDACIO', type: 'string' },
                        { name: 'CCUST', type: 'string' },
                        { name: 'SDATE', type: 'string' },
                        { name: 'ADATE', type: 'string' },
                        { name: 'SCOUNTRY', type: 'string' },
                        { name: 'CODEBANK', type: 'string' },
                        { name: 'SCARCOD', type: 'string' },
                        { name: 'SCARDN', type: 'string' },
                        { name: 'SAUTHOC', type: 'string' },
                        { name: 'SEQ', type: 'string' },
                        { name: 'SVFOP', type: 'string' },
                        { name: 'SCURRENCY', type: 'string' },
                        { name: 'NETO', type: 'float' },
                        { name: 'TOTAL', type: 'float' },
                        { name: 'COMISION', type: 'float' }
                    ],
                    data: []
                },
                plugins: {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                },
                columns: [
                    { text: 'RN', dataIndex: 'RN', width: 50 },
                    { text: 'Status', dataIndex: 'STVAL', flex: 1 },
                    { text: 'Doc. Type', dataIndex: 'TDOC', flex: 1 },
                    { text: 'Settlement', dataIndex: 'LIQUIDACIO', flex: 1.2 },
                    { text: 'Client', dataIndex: 'CCUST', flex: 0.5 },
                    { text: 'Sale Date', dataIndex: 'SDATE', flex: 1 },
                    { text: 'Sett. Date', dataIndex: 'ADATE', flex: 1 },
                    { text: 'Country', dataIndex: 'SCOUNTRY', flex: 1 },
                    { text: 'Bank Code', dataIndex: 'CODEBANK', flex: 1 },
                    { text: 'Card Code', dataIndex: 'SCARCOD', flex: 1 },
                    { text: 'Card Number', dataIndex: 'SCARDN', flex: 2 },
                    { text: 'Auth Code', dataIndex: 'SAUTHOC', flex: 1 },
                    { text: 'Sequence', dataIndex: 'SEQ', flex: 1 },
                    { text: 'Sett. Amount', dataIndex: 'SVFOP', flex: 1 },
                    { text: 'Curr.', dataIndex: 'SCURRENCY', flex: 0.7 },
                    {
                        text: 'Total',
                        dataIndex: 'TOTAL',
                        flex: 0.7,
                        editor: { xtype: 'numberfield', minValue: -9999999 }
                    },
                    {
                        text: 'Amount',
                        dataIndex: 'NETO',
                        flex: 0.7,            
                    },
                    {   text: 'Commission', 
                        dataIndex: 'COMISION', 
                        flex: 1,
                        editor: { xtype: 'numberfield', minValue: -9999999 }
                    },
                    {
                        xtype: 'actioncolumn',
                        text: 'Actions',
                        width: 60,
                        align: 'center',
                        items: [
                            {
                                tooltip: 'Delete row',
                                getClass: function (v, meta, record) {
                                    if (record.phantom) {
                                        return 'prx-icon-cancel-small';
                                    } else {
                                        return 'x-hidden'; 
                                    }
                                },
                                handler: function (grid, rowIndex) {
                                    const rec = grid.getStore().getAt(rowIndex);
                                    if (rec && rec.phantom) {
                                        grid.getStore().remove(rec);
                                    }
                                }
                            }
                        ]
                    }
                ],
                tbar: [
                    {
                        text: '➕ Insert',
                        reference: 'btnInsert',
                        hidden: true, 
                        handler: 'onProcessInsert'
                    },
                    {
                        text: '💾 Save Changes',
                        reference: 'btnSave',
                        hidden: true, 
                        handler: 'onProcessSave'
                    }
                ],
                bbar: [
                    '->',
                    {
                        xtype: 'displayfield',
                        fieldStyle: 'font-weight:bold; color:#a32f2f; padding:2px 8px; margin-left:10px;',
                        value: `HEADERS: `
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'lblTotalTotal_S',
                        fieldStyle: 'font-weight:bold; background-color:#f5f5f5; border:1px solid #ccc; padding:4px 10px; margin-left:10px;',
                        value: `Total: 0`
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'lblTotalComision_S',
                        fieldStyle: 'font-weight:bold; background-color:#f5f5f5; border:1px solid #ccc; padding:4px 10px;  margin-left:3px;',
                        value: `Commission: 0`
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'lblTotalAmount_S',
                        fieldStyle: 'font-weight:bold; background-color:#f5f5f5; border:1px solid #ccc; padding:4px 10px;  margin-left:3px;  margin-rigth:3px;',
                        value: `Amount: 0`
                    },  
                ]
            },

            // Tab 2: Taxes
            {
                title: 'Taxes',
                xtype: 'grid',
                reference: 'taxesGrid',
                listeners: {
                    afterrender: 'onAfterRenderTaxes'
                },
                store: {
                    fields: [
                        { name: 'RN', type: 'int' },
                        { name: 'LIQUIDACIO', type: 'string' },
                        { name: 'CCUST', type: 'string' },
                        { name: 'PRDA', type: 'string' },
                        { name: 'CODPRO', type: 'string' },
                        { name: 'CCUSTPRO', type: 'string' },
                        { name: 'FLIQUIDACI', type: 'string' },
                        { name: 'MERCHAND', type: 'string' },
                        { name: 'CODIGO', type: 'string' },
                        { name: 'CORRL', type: 'string' },
                        { name: 'MONEDA', type: 'string' },
                        { name: 'IMPORTE', type: 'float' },
                    ],
                    data: []
                },
                plugins: {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                },
                columns: [
                    { text: 'RN', dataIndex: 'RN', width: 50 },
                    { text: 'Settlement', dataIndex: 'LIQUIDACIO', flex: 1.2 },
                    { text: 'Client', dataIndex: 'CCUST', flex: 1 },
                    { text: 'Pro. Date', dataIndex: 'PRDA', flex: 1 },
                    { text: 'Process', dataIndex: 'CODPRO', flex: 1 },
                    { text: 'Sett. Date', dataIndex: 'FLIQUIDACI', flex: 1 },
                    { text: 'Merchant', dataIndex: 'MERCHAND', flex: 1 },
                    { text: 'Code', dataIndex: 'CODIGO', flex: 1 },
                    { text: 'Correlative', dataIndex: 'CORRL', flex: 1 },
                    { text: 'Curr.', dataIndex: 'MONEDA', flex: 0.5 },
                    {
                        text: 'Amount',
                        dataIndex: 'IMPORTE',
                        flex: 1,
                        editor: { xtype: 'numberfield', minValue: -9999999 }
                    }
                ],
                tbar: [
                    {
                        text: '💾 Save Changes',
                        reference: 'btnSaveTaxes',
                        hidden: true, 
                        handler: 'onProcessSaveTaxes'
                    }
                ],
                bbar: [
                    '->',
                     {
                        xtype: 'displayfield',
                        fieldStyle: 'font-weight:bold; border:1px solid #ccc; padding:2px 8px; margin-left:10px;',
                        value: `HEADERS`
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'lblTotalTotal_T',
                        fieldStyle: 'font-weight:bold; border:1px solid #ccc; padding:2px 8px; margin-left:10px;',
                        value: `Total: 0`
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'lblTotalComision_T',
                        fieldStyle: 'font-weight:bold; border:1px solid #ccc; padding:2px 8px;',
                        value: `Commission: 0`
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'lblTotalAmount_T',
                        fieldStyle: 'font-weight:bold; border:1px solid #ccc; padding:2px 8px;',
                        value: `Amount: 0`
                    },         
                ]
            }
        ]
    }],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
