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
    width: 1500,
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
                    width: 1450,
                    margin: '5 0 0 0',
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
                                    width: 1450
                                },
                                items: [
                                    
                                    {xtype: 'tbspacer', width: 5},
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
                                        maxLength: 15,
                                        maskRe: /[0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 125},
                                    {
                                        xtype: 'label',
                                        text: 'Country',
                                        fontSize: 15,
                                        textAlign: 'center',
                                        paddingLeft: 3,
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                       xtype: 'textfield',
                                       id: prototype.id + '-de-txtSCOUNTRY',
                                       queryMode: 'local',
                                       width: 130,
                                       fieldStyle: 'color:#074066;',
                                       forceSelection: true,
                                       selectOnFocus: false,
                                       caseSensitive: false,
                                       hidden: false,
                                       autoSelect: true,
                                       editable: false,
                                       disabled: false,
                                       typeAhead: true,
                                       valueField: 'code',
                                       displayField: 'name',
                                       enableKeyEvents: true,
                                       triggerAction: 'all'
                                    },
                                    {xtype: 'tbspacer', width: 250},
                                    {
                                        xtype: 'label',
                                        text: 'Code Bank',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtCODEBANK',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 90},
                                    {
                                        xtype: 'label',
                                        text: 'Cta Bank',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtCTABANK',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[0-9]/,
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
                                    width: 1450
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 5},
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
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130,
                                    },
                                    {xtype: 'tbspacer', width: 90},
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
//                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 250},
                                    {
                                        xtype: 'label',
                                        text: 'Code AP',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtAPCODE',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 90},
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
//                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 160
                                    },
                                    {xtype: 'tbspacer', width: 45},
                                    
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
                                    width: 1450
                                },
                                items: [
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 1',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtFRANCH1',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130,
                                    },
                                    {xtype: 'tbspacer', width: 90},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 2',
                                        style: 'font-weight:bold;',
                                        width: 115
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtFRANCH2',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 130
                                    },
                                    {xtype: 'tbspacer', width: 250},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 3',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtFRANCH3',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 90},
                                    {
                                        xtype: 'label',
                                        text: 'Franchise 4',
                                        style: 'font-weight:bold;',
                                        width: 80
                                    },
                                    {xtype: 'tbspacer', width: 5},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id + '-de-txtFRANCH4',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        editable: false,
                                        enabled: false,
                                        maxLength: 15,
                                        maskRe: /[a-zA-Z0-9]/,
                                        readOnly: false,
                                        width: 160
                                    },
                                    {xtype: 'tbspacer', width: 45},
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                margin: '20 0 0 0',
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                 xtype: 'panel',
                                                 id: prototype.id + '-boxPaginacionDE',
                                                 hidden: false,
                                                 width: 100,
                                                 border: false,
                                                 margin: '0 0 0 1178',
                                                 items: [
                                                     {
                                                         xtype: 'toolbar',
                                                         cls: 'x-toolbar-pag',
                                                         items: [
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btn-pag-firstDE',
                                                                 iconCls: 'prx-icon-pagination-first',
                                                                 tooltip: 'First Page'

                                                             },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btn-pag-previousDE',
                                                                 iconCls: 'prx-icon-pagination-previous',
                                                                 tooltip: 'Previous Page'

                                                             },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btn-pag-nextDE',
                                                                 iconCls: 'prx-icon-pagination-next',
                                                                 tooltip: 'Next Page'

                                                             },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btn-pag-lastDE',
                                                                 iconCls: 'prx-icon-pagination-last',
                                                                 tooltip: 'Last Page'

                                                             },
                                                             {
                                                                 xtype: 'pagingtoolbar',
                                                                 id: prototype.id + '-pagginDE',
                                                                 pageSize: 10,
                                                                 border: false,
                                                                 displayInfo: false,
                                                                 hidden: true
                                                             }

                                                         ]
                                                     }
                                                 ]
                                             },
                                             {xtype: 'tbspacer', width: 20},
                                             {
                                                 xtype: 'panel',
                                                 border: true,
                                                 items: [
                                                     {
                                                         xtype: 'toolbar',
                                                         items: [
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btnSearchDE',
                                                                 iconCls: 'prx-icon-search',
                                                                 tooltip: 'Search'
                                                             },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btnFilterDE',
                                                                 iconCls: 'prx-icon-filter',
                                                                 tooltip: 'Display filter'

                                                             },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btnAddDE',
                                                                 iconCls: 'prx-icon-add',
                                                                 tooltip: 'New'
                                                             },
                                     //                        {
                                     //                            xtype:'button',
                                     //                            id: prototype.id+'-btnDisplay',
                                     //                            icon: 'resources/img/botones/FalseChart.png',
                                     //                            tooltip: 'Display Charts',
                                     //                            listeners: {
                                     //                                click: 'btnDisplay_click'
                                     //                            }
                                     //                        },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btnExcelDE',
                                                                 iconCls: 'prx-icon-excel',
                                                                 tooltip: 'Export to Excel'
                                                             },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btnClearDE',
                                                                 iconCls: 'prx-icon-clear',
                                                                 tooltip: 'Clear Options'
                                                             },
                                     //                        {
                                     //                            xtype: 'button',
                                     //                            id: prototype.id+'-btnQuery',
                                     //                            icon: 'resources/img/botones/query.png',
                                     //                            tooltip: 'Query',
                                     //                            listeners: {
                                     //                                click: 'btnQuery_click'
                                     //                            }
                                     //                        },
                                                             {
                                                                 xtype: 'button',
                                                                 id: prototype.id + '-btnBackDE',
                                                                 iconCls: 'prx-icon-back',
                                                                 tooltip: 'Back'
                                                             }
                                                         ]
                                                     }
                                                 ]
                                             }
                                        ]
                                     },
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                margin: '0 0 0 0',
                                
                                //bodyStyle: 'background:#efe5e5;',
                                items: [
                                    {
                                        xtype: 'tabpanel',
                                        id: prototype.id + '-tabMain',
                                        deferredRender: true,
                                        width: 1450,
                                        border: false,
    //                                            height: 182, //820
    //                                            anchor: '100%',
                                        margin: '0 0 0 0',
                                        autoScroll: true,
                                        bodyStyle: 'background: transparent',
                                        items: [
                                            
                                            {
                                                xtype: 'panel',
                                                title: 'IATAS',
                                                id: prototype.id + '-panelIATAS',
                                                layout: 'vbox',
                                                border: false,
                                                width: 1450,
                        //                                                            height: 180,
                                                hidden: false,
                                                autoScroll: true,
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        id: prototype.id + '-gridDataInfoIATAS',
                                                        width: 1450,
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
                                                                    text: 'Debtor SAP', dataIndex: 'DEUSAP', width: 140
                                                                },
                                                                {
                                                                    text: 'IATA', dataIndex: 'SAGENT', width: 148
                                                                },
                                                                {
                                                                    text: 'Channel', dataIndex: 'CANAL', width: 130
                                                                },
                                                                {
                                                                    text: 'Process', dataIndex: 'PROCES', width: 230
                                                                },
                                                                {
                                                                    text: 'Country Code', dataIndex: 'SCOUNTRY', width: 160
                                                                },
                                                                {
                                                                    text: 'Country', dataIndex: 'NAME', width: 200, align: 'left'
                                                                },
                                                                {
                                                                    text: 'Sales Company', dataIndex: 'SOCIETY', width: 120
                                                                },
                                                                {
                                                                    text: 'Currency', dataIndex: 'SCURRENCY', width: 130
                                                                },
                                                                {
                                                                    text: 'Profit Center', dataIndex: 'SBENCEN', width: 150
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
                                                                            iconCls: 'prx-icon-eye',
                                                                            tooltip: 'View',
                                                                            handler: 'onViewIATAClick'
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
                                                width: 1450,
                        //                                                            height: 180,
                                                autoScroll: true,
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        id: prototype.id + '-gridDataInfoBANCOS',
                                                        width: 1450,
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
                                                                    text: 'Bank Code', dataIndex: 'CODEBANK', width: 100
                                                                },
                                                                {
                                                                    text: 'Bank Name', dataIndex: 'BANKNAM', width: 317, align: 'left'
                                                                },
                                                                {
                                                                    text: 'Bank Company', dataIndex: 'BANKCM', width: 100
                                                                },
                                                                {
                                                                    text: 'Deposit Currency', dataIndex: 'BANKCUR', width: 131
                                                                },
                                                                {
                                                                    text: 'Account Number', dataIndex: 'ACCNUMB', width: 120
                                                                },
                                                                {
                                                                    text: 'Auxiliary Bank<br>Accounting Account', dataIndex: 'ACCNUMA', width: 160
                                                                },
                                                                {
                                                                    text: 'Profit Center Bank', dataIndex: 'BENCEN', width: 160
                                                                },
                                                                {
                                                                    text: 'Franchise 1', dataIndex: 'FRANC1', width: 80
                                                                },
                                                                {
                                                                    text: 'Franchise 2', dataIndex: 'FRANC2', width: 80
                                                                },
                                                                {
                                                                    text: 'Franchise 3', dataIndex: 'FRANC3', width: 80
                                                                },
                                                                {
                                                                    text: 'Franchise 4', dataIndex: 'FRANC4', width: 80
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
                                                                            iconCls: 'prx-icon-eye',
                                                                            tooltip: 'View',
                                                                            handler: 'onViewBANKClick'
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
                    layout: 'hbox',
                    border: false,
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
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 4 50',
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
                            layout: 'hbox',
                            margin: '5 0 10 50',
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