prototype.idAdju = prototype.id + '-AdjuDetailDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.AdjuDetailDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.AdjuDetailDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.AdjuDetailDataEntryController'
    ],
    controller: 'AdjuDetailDataEntryController',
    title: 'Adjustment Information - Form',
    header: true,
    width: 1100,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idAdju + '-mainInfo',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                        editable: false
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Main Settlement Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Client',
                                    name: 'CCUST',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'DESC_PRO',
                                    labelWidth: 70,
                                    width: 210
                                },
                                {
                                    fieldLabel: 'Trans. Date',
                                    name: 'DATEC',
                                    labelWidth: 80,
                                    width: 210
                                },
                                {
                                    fieldLabel: 'Trans. Nbr.',
                                    name: 'TRANC',
                                    labelWidth: 80,
                                    width: 210
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Merchant',
                                    name: 'MERCHNC',
                                    labelWidth: 70,
                                    width: 190
                                },
                                {
                                    fieldLabel: 'Agent',
                                    name: 'SAGENT',
                                    labelWidth: 50,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'SCOUNTRY',
                                    labelWidth: 55,
                                    width: 105
                                },
                                {
                                    fieldLabel: 'Terminal',
                                    name: 'TERMI',
                                    labelWidth: 70,
                                    width: 170
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Doc. Type',
                                    name: 'TDOC',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'S': 'Sale',
                                                'D': 'Debit',
                                                'R': 'Refund'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Bank Doc.',
                                    name: 'BANDOC',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Reference',
                                    name: 'REFER',
                                    labelWidth: 70,
                                    width: 190
                                },
                                {
                                    fieldLabel: 'Card Number',
                                    name: 'SCARDN',
                                    labelWidth: 90,
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Auth code',
                                    name: 'SAUTHOC',
                                    labelWidth: 70,
                                    width: 160
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Praxis ID',
                                    name: 'IDCONT',
                                    labelWidth: 70,
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Praxis ID Adj.',
                                    name: 'IDCADJ',
                                    labelWidth: 90,
                                    width: 300
                                },
                                {
                                    fieldLabel: 'Header',
                                    name: 'HEADER',
                                    labelWidth: 70,
                                    width: 250
                                },
                            ]
                        }
                    ]
                },
                //</editor-fold>
                {
                    xtype: 'panel',
                    id: prototype.idAdju + '-panelDetails',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    defaults: {},
                    items: [
                        {
                            xtype: 'grid',
                            border: false,
                            title: 'Settlements',
                            width: '100%',
                            maxHeight: 300,
                            id: prototype.idAdju + '-gridSettl',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Agent', dataIndex: 'SAGENT', width: 90},
                                    {text: 'Merchant', dataIndex: 'MERCHNC', width: 80},
                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                    {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                    {text: 'Card Code', dataIndex: 'SCARDN', flex: 1},
                                    {text: 'Auth Code', dataIndex: 'SAUTHOC', width: 100},
                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 100},
                                    {text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Curr. Rev.', dataIndex: 'MONEDAPAGO', width: 100},
                                    {text: 'Amount Rev.', dataIndex: 'IMPORTEPAG', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    }

                                ]
                            }
                        },
                        {
                            xtype: 'form',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            width: '100%',
                            id: prototype.idAdju + '-totalsSettl',
                            defaults: {
                                xtype: 'textfield',
                                width: 210,
                                labelWidth: 100,
                                margin: '3 0',
                                readOnly: true,
                                labelStyle: 'text-align:right;font-weight: bolder;',
                                fieldStyle: 'text-align:right;border-style:solid;border-color:#6CB6E7;border-width:1px;background:#B8D9C7;font-weight: bolder;'
                            },
                            items: [
                                {
                                    fieldLabel: 'Qty',
                                    name: 'totalRecords',
                                    fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:#E8BAE5;font-weight: bolder;'
                                },
                                {
                                    fieldLabel: 'Total',
                                    name: 'totalLoc'
                                },
                                {
                                    fieldLabel: 'Total Rev.',
                                    name: 'totalRev'
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            border: false,
                            title: 'Invoices',
                            width: '100%',
                            maxHeight: 300,
                            id: prototype.idAdju + '-gridSale',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            emptyText: 'No Invoices', // Mensaje cuando no hay registros
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'TICKET', flex: 1},
                                    {text: 'Invoice', dataIndex: 'INVOICE', width: 130},
                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                    {text: 'Agent', dataIndex: 'SAGENT', width: 90},
                                    {text: 'Consolidator', dataIndex: 'SCONSOL', width: 100},
                                    {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 60},
                                    {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                                    {text: 'Card Code', dataIndex: 'SCARDN', width: 160},
                                    {text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 80},
                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#dcdf3a;text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    }

                                ]
                            }
                        },
                        {
                            xtype: 'form',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            width: '100%',
                            id: prototype.idAdju + '-totalsInvoi',
                            defaults: {
                                xtype: 'textfield',
                                width: 210,
                                labelWidth: 100,
                                margin: '3 0',
                                readOnly: true,
                                labelStyle: 'text-align:right;font-weight: bolder;',
                                fieldStyle: 'text-align:right;border-style:solid;border-color:#6CB6E7;border-width:1px;background:#B8D9C7;font-weight: bolder;'
                            },
                            items: [
                                {
                                    fieldLabel: 'Qty',
                                    name: 'totalRecords',
                                    fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:#E8BAE5;font-weight: bolder;'
                                },
                                {
                                    fieldLabel: 'Total',
                                    name: 'totalAmount'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 5 7 5',
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
                    text: 'Reload',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onReloadInfo'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idAdju + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});