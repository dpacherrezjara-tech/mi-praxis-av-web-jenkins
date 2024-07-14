Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMerchantNumberForm',
    requires: [
        'Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberController'
    ],
    controller: 'DataEntryMerchantNumberController',
    title: 'Merchant Number - Data Entry Form',
    header: true,
    height: 800,
    width: 1179,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background:#E5ECEF;',
                    layout: 'vbox',
                    width: 1129,
                    margin: '0 0 0 20',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Merchant Nbr.',
                                        style: 'font-weight:bold;',
                                        width: 110
                                    },
//                                    {
//                                        xtype: 'label',
//                                        text: '(*)',
//                                        style: 'font-weight:bold;color:red;',
//                                        width: 20,
//                                        autoEl: {
//                                            tag: 'label',
//                                            'data-qtip': 'Mandatory Field'
//                                        }
//                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtMERCHN',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    
                                    {
                                        xtype: 'label',
                                        text: 'Branch Affiliate',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtAFBRANCH',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130,
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Mode Down. Report',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtDOWNREPORT',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 60,
//                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 160
                                    },
                                    
                                    
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Code AP',
                                        style: 'font-weight:bold;',
                                        width: 110
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtAPCODE',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 45,
                                        valueField: 'VALUE',
                                        displayField: 'NAME',
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Acquirer/Processor',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtACQPROC',
                                        fieldStyle: 'text-align:left',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 30,
//                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 1',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH1',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 160,
                                    },
                                    
                                    
                                    
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 2',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH2',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 3',
                                        style: 'font-weight:bold;',
                                        width: 110
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH3',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 4',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-de-txtFRANCH4',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        valueField: 'CODE',
                                        displayField: 'NAME',
                                        maxLength: 45,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 160
                                    },
                                    
                                    
                                    
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                id: prototype.id + '-panelTabMain',
                                border: false,
                                margin: '35 0 0 0',
                                
                                //bodyStyle: 'background:#efe5e5;',
                                items: [
                                    {
                                        xtype: 'tabpanel',
                                        id: prototype.id + '-tabMain',
                                        deferredRender: true,
                                        width: 1129,
                                        border: false,
    //                                            height: 182, //820
    //                                            anchor: '100%',
                                        margin: '0 0 0 0',
                                        autoScroll: true,
                                        bodyStyle: 'background: transparent',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                title: 'Merchant',
                                                id: prototype.id + '-panelMerchant',
                                                layout: 'vbox',
                                                border: false,
                                                width: 1129,
                        //                                                            height: 180,
                                                hidden: false,
                                                autoScroll: true,
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        id: prototype.id + '-gridDataInfoMerchant',
                                                        width: 1129,
                                                        height: 350,
                                                        columnLines: true,
 
                                                        plugins: [
                                                            {
                                                                
                                                                ptype: 'cellediting',
                                                                clicksToEdit: 1
                                                                
                                                            }
                                                        ],
                                                        columns: {
                                                            defaults: {
                                                                menuDisabled: true,
                                                                sortable: true,
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                
                                                                {
                                                                    text: 'Merchant', dataIndex: 'CMERCHAN', width: 200,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Merchant Branch', dataIndex: 'SUCMERCH', width: 145,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Code Proces', dataIndex: 'CODE', width: 126,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Name Proces', dataIndex: 'CORE', width: 200,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Bank Code', dataIndex: 'CODEBANK', width: 96,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Acc. Number', dataIndex: 'ACCNUMB', width: 130,
                                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        var data = record.data;
                                                                        metaData.style = "text-align:left;";

                                                                        return  value;
                                                                    },
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                    
                                                                },
                                                                {
                                                                    text: 'Bank Company', dataIndex: 'BANKCM', width: 110,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Agent.', dataIndex: 'SAGENT', width: 79,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    sortable: false,
                                                                    xtype: 'actioncolumn',
                                                                    id: prototype.id + '-gridMERCHView',
                                                                    width: 40,
                                                                    text: 'View',
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            iconCls: 'prx-icon-edit',
                                                                            tooltip: 'Edit',
                                                                            handler: 'onViewMerchClick'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                title: 'Bancos',
                                                id: prototype.id + '-panelBANCOS',
                                                layout: 'vbox',
                                                border: false,
                                                width: 1129,
                        //                                                            height: 180,
                                                autoScroll: true,
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        id: prototype.id + '-gridDataInfoBANCOS',
                                                        width: 1129,
                                                        height: 350,
                                                        columnLines: true,
                                                        
                                                        plugins: [
                                                            {
                                                                
                                                                ptype: 'cellediting',
                                                                clicksToEdit: 1
                                                                
                                                            }
                                                        ],
                                                        columns: {
                                                            defaults: {
                                                                menuDisabled: true,
                                                                sortable: true,
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Bank Code', dataIndex: 'CODEBANK', width: 100,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Bank Name', dataIndex: 'BANKNAM', width: 317, align: 'left',
//                                                                    editor: {
//                                                                        xtype: 'textfield',
//                                                                        editable: true,
//                                                                        allowBlank: false,
//                                                                        enableKeyEvents: true,
////                                                                        maskRe: /[0-9\.-]/,
//                                                                        selectOnFocus: true
//                                                                    },
                                                                },
                                                                {
                                                                    text: 'Bank Company', dataIndex: 'BANKCM', width: 100,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Deposit Currency', dataIndex: 'BANKCUR', width: 130,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Account Number', dataIndex: 'ACCNUMB', width: 120,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Auxiliary Bank<br>Accounting Account', dataIndex: 'ACCNUMA', width: 160,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Profit Center Bank', dataIndex: 'BENCEN', width: 160,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    sortable: false,
                                                                    xtype: 'actioncolumn',
                                                                    id: prototype.id + '-gridBANKView',
                                                                    width: 40,
                                                                    text: 'View',
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            iconCls: 'prx-icon-edit',
                                                                            tooltip: 'Edit',
                                                                            handler: 'onViewBANKClick'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                title: 'IATAS',
                                                id: prototype.id + '-panelIATAS',
                                                layout: 'vbox',
                                                border: false,
                                                width: 1129,
                        //                                                            height: 180,
                                                hidden: false,
                                                autoScroll: true,
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        id: prototype.id + '-gridDataInfoIATAS',
                                                        width: 1129,
                                                        height: 350,
                                                        columnLines: true,
 
                                                        plugins: [
                                                            {
                                                                
                                                                ptype: 'cellediting',
                                                                clicksToEdit: 1
                                                                
                                                            }
                                                        ],
                                                        columns: {
                                                            defaults: {
                                                                menuDisabled: true,
                                                                sortable: true,
                                                                align: 'center'
                                                            },
                                                            items: [
                                                                
                                                                {
                                                                    text: 'Debtor SAP', dataIndex: 'DEUSAP', width: 126,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'IATA', dataIndex: 'SAGENT', width: 111,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Channel', dataIndex: 'CANAL', width: 96,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Process', dataIndex: 'PROCES', width: 110,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Country C.', dataIndex: 'SCOUNTRY', width: 79,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Country', dataIndex: 'NAME', width: 135, align: 'left',
//                                                                    editor: {
//                                                                        xtype: 'textfield',
//                                                                        editable: true,
//                                                                        allowBlank: false,
//                                                                        enableKeyEvents: true,
////                                                                        maskRe: /[0-9\.-]/,
//                                                                        selectOnFocus: true
//                                                                    },
                                                                },
                                                                {
                                                                    text: 'Sales Comp.', dataIndex: 'SOCIETY', width: 90,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Currency', dataIndex: 'SCURRENCY', width: 100,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Profit Center', dataIndex: 'SBENCEN', width: 150,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    text: 'Cost Center', dataIndex: 'COSTCEN', width: 90,
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        editable: true,
                                                                        allowBlank: false,
                                                                        enableKeyEvents: true,
//                                                                        maskRe: /[0-9\.-]/,
                                                                        selectOnFocus: true
                                                                    },
                                                                },
                                                                {
                                                                    sortable: false,
                                                                    xtype: 'actioncolumn',
                                                                    id: prototype.id + '-gridIATAView',
                                                                    width: 40,
                                                                    text: 'View',
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            iconCls: 'prx-icon-edit',
                                                                            tooltip: 'Edit',
                                                                            handler: 'onViewIATAClick'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            
                                            
                                        ]
                                    }
                                ]
                            },
                             {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-bankSection',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'BANK SECTION',
                                        style: 'font-weight:bold; text-decoration:underline',
                                        width: 115
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-bSection_1',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Bank Code',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-CODEBANK',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 4,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Bank Name',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BANKNAM',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 50,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Bank Company',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BANKCM',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 4,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-bSection_2',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Deposit Curr.',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BANKCUR',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 3,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Acc. Number',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-ACCNUMB',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 16,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Aux Bank Acc',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-ACCNUMA',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 6,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                id: prototype.id + '-bSection_3',
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Acc. Numb Old',
                                        style: 'font-weight:bold;',
                                        width: 90
                                    },
                                    {xtype: 'tbspacer', width: 30},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-ACCNUMOLD',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 20,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Date Discount.',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 15},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-DDISCON',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 8,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'ID Fiscal',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-IDFISCAL',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 20,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                id: prototype.id + '-bSection_4',
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Prof. Cent',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-BENCEN',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 8,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-iataSection',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'IATA SECTION',
                                        style: 'font-weight:bold; text-decoration:underline',
                                        width: 115
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-iSection_1',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Debt. SAP',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-DEUSAP',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 9,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'IATA',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SAGENT',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 8,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Channel',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-CANAL',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                id: prototype.id + '-iSection_2',
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Process',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-PROCES',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 40,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Country',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SCOUNTRY',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 2,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Sales Comp.',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SOCIETY',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 4,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    }, 
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                id: prototype.id + '-iSection_3',
                                items: [
                                    {xtype: 'tbspacer', width: 60},
                                    {
                                        xtype: 'label',
                                        text: 'Currency',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SCURRENCY',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 3,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Prof. Cent.',
                                        style: 'font-weight:bold;',
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-SBENCEN',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 8,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 120
                                    },
                                    {xtype: 'tbspacer', width: 120},
                                    {
                                        xtype: 'label',
                                        text: 'Cost. Cent.',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-COSTCEN',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 10,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 155
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center' 
                                },
                                border: false,
                                bodyStyle: 'background:#E5ECEF;',
                                margin: '20 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1129
                                },
                                items: []
                            }
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Merchant Nbr.',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 130
//                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:red;',
//                                    width: 20,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 5},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtMERCHN',
//                                    fieldStyle: 'text-align:left',
//                                    enforceMaxLength: true,
//                                    editable: true,
//                                    enabled: false,
//                                    maxLength: 15,
//                                    maskRe: /[0-9]/,
//                                    readOnly: false,
//                                    width: 290
//                                },
//                                {xtype: 'tbspacer', width: 40},
//                                {
//                                    xtype: 'label',
//                                    text: 'Canal: ',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 5},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbCANAL',
//                                    queryMode: 'local',
//                                    width: 110,
//                                    fieldStyle: 'color:#074066;',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    hidden: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                    listeners: {
//                                        change: 'onUpperValue'
//                                    }
//                                },
//                                ,
//                                {xtype: 'tbspacer', width: 105}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                            bodyStyle: 'background:#E5ECEF;',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Merchant Name',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtDESCR',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    fieldStyle: 'text-align:left;',
//                                    maxChars: '40',
//                                    width: 520
//                                },
//                                {xtype: 'tbspacer', width: 50}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
////                            bodyStyle: 'background:#E5ECEF;',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Social Reason',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtRSOCIAL',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    fieldStyle: 'text-align:left;',
//                                    maxChars: '40',
//                                    width: 520
//                                },
//                                {xtype: 'tbspacer', width: 50}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
//                            // bodyStyle: 'background:#E5ECEF;',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Merchant Payment',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 130
//                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:red;',
//                                    width: 20,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 5},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtMERCHP',
//                                    fieldStyle: 'text-align:left',
//                                    enforceMaxLength: true,
//                                    editable: true,
//                                    enabled: false,
//                                    maxLength: 15,
//                                    maskRe: /[0-9]/,
//                                    readOnly: false,
//                                    width: 290
//                                },
//                                
//                                {xtype: 'tbspacer', width: 50}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
////                            bodyStyle: 'background:#E5ECEF;',
//
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Country',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
////                                {
////                                    xtype: 'combo',
////                                    id: prototype.id + '-de-cmbSCOUNTRY',
////                                    style: 'font-weight:bold;color:#0B333C;',
////                                    enforceMaxLength: true,
////                                    fieldStyle: 'text-align:left;',
////                                    width: 150,
////                                    maskRe: /[a-zA-Z]/,
////                                    maxLength: 2
////                                },
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbSCOUNTRY',
//                                    queryMode: 'local',
//                                    width: 130,
//                                    fieldStyle: 'color:#074066;',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    hidden: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all'
//                                },
//                                {xtype: 'tbspacer', width: 30},
//                                {
//                                    xtype: 'label',
//                                    text: 'Name',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtNameCTRY',
//                                    style: 'font-weight:bold;color:#0B333C;',
////                                    enforceMaxLength: true,
//                                    fieldStyle: 'text-align:left;',
//                                    readOnly: true,
//                                    width: 286,
//                                    maskRe: /[a-zA-Z]/
////                                    maxLength: 5
//                                },
//                                {xtype: 'tbspacer', width: 5}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            margin: '4 2 4 20',
////                            bodyStyle: 'background:#E5ECEF;',
//
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Operational Unit',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 150
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbUNIOPE',
//                                    queryMode: 'local',
//                                    width: 130,
//                                    fieldStyle: 'color:#074066;',
//                                    queryMode: 'local',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all'
//                                },
//                                {xtype: 'tbspacer', width: 30},
//                                {
//                                    xtype: 'label',
//                                    text: 'Status',
//                                    fontSize: 15,
//                                    textAlign: 'center',
//                                    paddingLeft: 3,
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    width: 50
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-de-cmbSTATUS',
//                                    queryMode: 'local',
//                                    width: 150,
//                                    fieldStyle: 'color:#074066;',
//                                    queryMode: 'local',
//                                    forceSelection: true,
//                                    selectOnFocus: false,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: false,
//                                    disabled: false,
//                                    typeAhead: true,
//                                    valueField: 'code',
//                                    displayField: 'name',
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all'
//                                },
//                                {xtype: 'tbspacer', width: 50},
//                                {xtype: 'tbspacer', width: 136},
//                                {xtype: 'tbspacer', width: 5}
//                            ]
//                        },
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: "Add IATA's",
//                                    style: 'font-weight:bold; color:#121E31; text-decoration: underline;',
//                                    width: 90,
//                                    margin: '2 2 0 20',
//                                }
//                            ]
//                        },
//                        {xtype: 'panel',
//                            layout: 'vbox',
//                            border: false,
//                            width: 620,
//                            margin: '2 2 0 20',
//                            height: 200,
//                            defaults: {
//                                anchor: '100%',
//                                width: 580,
//                                align: 'center'
//                            },
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    defaults: {
//                                        anchor: '100%',
//                                        width: 580,
//                                        align: 'center'
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'label',
//                                            text: 'IATA',
//                                            style: 'font-weight:bold;color:#121E31;',
//                                            width: 50,
//                                            padding: '3 0'
//                                        },
//                                        {
//                                            xtype: 'label',
//                                            labelAlign: 'center',
//                                            padding: '1px 1px 1px 1px',
//                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
//                                            width: 30,
//                                            autoEl: {
//                                                tag: 'label',
//                                                'data-qtip': 'Required field'
//                                            }
//                                        }
//                                    ]
//                                },
//                                //*****
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background: transparent;',
//                                    defaults: {
//                                        anchor: '100%',
//                                        width: 550,
//                                        align: 'center'
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 10},
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-txtIATA',
//                                            enforceMaxLength: true,
////                                            enforceMinLength: true,
////                                            minLength: 5,
//                                            maxLength: 8,
//                                            maskRe: /[0-9/]/,
//                                            padding: '3 0',
//                                            fieldStyle: 'text-align:center',
//                                            width: 120
//                                        },
//                                        {xtype: 'tbspacer', width: 3},
//                                        {
//                                            xtype: 'button',
//                                            width: 25,
//                                            margin: '4 1 1 1',
//                                            iconCls: 'prx-icon-add',
//                                            tooltip: 'Add',
//                                            listeners: {
//                                                click: 'addIATA'
//                                            }
//
//                                        },
//                                        {xtype: 'tbspacer', width: 3},
//                                        {
//                                            xtype: 'button',
//                                            width: 25,
//                                            margin: '4 1 1 1',
//                                            iconCls: 'prx-icon-clear',
//                                            tooltip: 'clear',
//                                            listeners: {
//                                                click: 'clearIATA'
//                                            }
//                                        }
//                                    ]
//                                },
//                                //grilla------
//                                {
//                                    xtype: 'panel',
//                                    margin: '5 5 0 10',
//                                    padding: '0 0 0 0',
//                                    width: 620,
//                                    height: 135,
//                                    autoScroll: true,
//                                    align: 'center',
//                                    border: false,
//                                    //title: '<b style="font-size:13px;color:white">RAPID Information</b>',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center',
//                                    },
//                                    items: [
//                                        {xtype: 'tbspacer', width: 60},
//                                        {
//                                            xtype: 'grid',
//                                            id: prototype.id + '-gridIATA',
//                                            width: 500,
//                                            height: 130,
//                                            columnLines: true,
//                                            padding: '1',
//                                            margin: '1',
//                                            defaults: {
//                                                sortable: true,
//                                                align: 'center'
//                                            },
//                                            columns: [
//                                                {
//                                                    header: 'IATA',
//                                                    id: prototype.id + '-colIATA',
//                                                    dataIndex: 'CIATA',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 80
//                                                },
//                                                {
//                                                    header: 'Name',
//                                                    id: prototype.id + '-colIataName',
//                                                    dataIndex: 'strDESCRIP',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 200
//                                                },
//                                                {
//                                                    header: 'Country',
//                                                    id: prototype.id + '-colCountry',
//                                                    dataIndex: 'SCOUNTRY',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 80
//                                                },
//                                                {
//                                                    header: 'Chanel',
//                                                    id: prototype.id + '-colCanal',
//                                                    dataIndex: 'CANAL',
//                                                    xtype: 'gridcolumn',
//                                                    align: 'center',
//                                                    width: 80
//                                                },
//                                                {
//                                                    header: '',
//                                                    dataIndex: '',
//                                                    xtype: 'widgetcolumn',
//                                                    align: 'center',
//                                                    width: 40,
//                                                    widget: {
//                                                        xtype: 'button',
//                                                        iconCls: 'prx-icon-delete',
//                                                        tooltip: 'remove',
//                                                        listeners: {
//                                                            click: function (button, e, eOpts) {
//                                                                var record = button.getWidgetRecord();
//                                                                meDE.removeIATA(record);
//                                                            }
//                                                        }
//                                                    }
//
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                }
//                            ]
//                        },
                        // <editor-fold defaultstate="collapsed" desc="Commission Policy Information">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
////                                bodyStyle: 'background:#efe5e5',
//                            margin: '2 2 0 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Commission Policy Information</strong>',
////                                        bodyStyle: 'background:#E5ECEF;',
//                                    fontSize: '11',
//                                    margin: '0 0 0 7',
//                                    width: 234,
//                                    height: 20
//                                },
//                                {xtype: 'tbspacer', width: 470}
//                            ]
//                        },
//                        // </editor-fold>
//                        // <editor-fold defaultstate="collapsed" desc="Client Code 1">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
//                            bodyStyle: 'background:#efe5e5',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Code 1',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 120,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 35},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtCODCLIT1',
//                                    fieldStyle: 'text-align:left',
//                                    //                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 5,
////                                        readOnly: true,
//                                    width: 70
//                                },
//                                {xtype: 'tbspacer', width: 110},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Address 1',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 100,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtDIRCLIT1',
//                                    fieldStyle: 'text-align:left',
//                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 8,
////                                        readOnly: true,
//                                    width: 218
//                                },
//                                {xtype: 'tbspacer', width: 30}
//                            ]
//                        },
//                        // </editor-fold>
//                        // <editor-fold defaultstate="collapsed" desc="Chargeback Policy Information">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
////                                bodyStyle: 'background:#efe5e5',
//                            margin: '2 2 0 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {
//                                    xtype: 'label',
//                                    html: '<strong style="color:#121E31; text-decoration: underline; ">Chargeback Policy Information</strong>',
////                                        bodyStyle: 'background:#E5ECEF;',
//                                    fontSize: '11',
//                                    margin: '0 0 0 7',
//                                    width: 234,
//                                    height: 20
//                                },
//                                {xtype: 'tbspacer', width: 665}
//                            ]
//                        },
//                        // </editor-fold>
//                        // <editor-fold defaultstate="collapsed" desc="Client Code 1">
//                        {
//                            xtype: 'panel',
//                            layout: 'hbox',
//                            border: false,
////                                bodyStyle: 'background:#E5ECEF;',
//                            bodyStyle: 'background:#efe5e5',
//                            margin: '4 2 4 20',
//                            defaults: {
//                                anchor: '100%',
//                                width: 1080
//                            },
//                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Code 2',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 120,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 35},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtCODCLIT2',
//                                    fieldStyle: 'text-align:left',
//                                    //                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 5,
////                                        readOnly: true,
//                                    width: 70
//                                },
//                                {xtype: 'tbspacer', width: 110},
//                                {
//                                    xtype: 'label',
//                                    text: 'Client Address 2',
//                                    style: 'font-weight:bold;color:#121E31;',
//                                    width: 100,
//                                    padding: '3 0'
//                                },
//                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-de-txtDIRCLIT2',
//                                    fieldStyle: 'text-align:left',
//                                    margin: '0 0 0 3',
//                                    enforceMaxLength: true,
//                                    maxLength: 8,
////                                        readOnly: true,
//                                    width: 218
//                                },
//                                {xtype: 'tbspacer', width: 30}
//                            ]
//                        }
                        // </editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'panel',
                    
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center' 
                    },
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                    margin: '10 0 0 0',
                    defaults: {
                        anchor: '100%',
                        width: 1080
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            margin: '0 0 0 7',
                            width: 234
                        }
//                        { xtype: 'tbspacer', width: 470}
                    ]
                },
                // </editor-fold>

                {
                    items: [
                        {
                            xtype: 'panel',
//                            layout: 'hbox',
                            layout: {
                                type: 'hbox',
                                pack: 'center' 
                            },
                            border: false,
                            margin: '30 0 4 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
//                            layout: 'hbox',
                            layout: {
                                type: 'hbox',
                                pack: 'center' 
                            },
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);