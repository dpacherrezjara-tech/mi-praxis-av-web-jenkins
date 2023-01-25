Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrCreditCardAnalisis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrCreditCardAnalisis',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrCreditCardAnalisisController'
    ],
    controller: 'ScrCreditCardAnalisisController',
//    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
//    bodyStyle: 'background: transparent;',
    defaults: {
        bodyStyle: 'background: transparent;'
//        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalScrCreditCardAnalisis',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxMainDataScrCreditCardAnalisis',
                    width: '100%',
//                    hidden: false,
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "0 15 0 0"  // (top, right, bottom, left)
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataScrCreditCardAnalisis">

                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataScrCreditCardSalesAnalisis',
                                    height: 428,
                                    width: 814,
                                    columnLines: true,
                                    //                    resizable: false,
                                    features: [
                                        {
//                                        dock: 'bottom',
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Credit Card', dataIndex: 'strFlag', width: 250, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales USD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '', width: 120, dataIndex: 'Aud1', id: prototype.id + '-titFechaS_ABCC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totNet1, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Average',
                                                        columns: [
                                                            {text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totfalta2, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totfalta3, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.Var1 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#CC3333"
                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                            return Ext.util.Format.number(value, '0,000%');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Qty Cards', width: 70, dataIndex: 'QCCARDSC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totQCCARDSC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', width: 90, dataIndex: 'AMOUNTSC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTSC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataScrCreditCardRefundAnalisis',
                                    padding: '20px 0px 0px 0px',
                                    width: 654,
                                    height: 428,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Credit Card', dataIndex: 'strFlag', width: 250, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Refund USD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '', width: 120, dataIndex: 'Aud1', id: prototype.id + '-titFechaR_ABCC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardRefundAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totNet1, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Average',
                                                        columns: [
                                                            {text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totfalta6, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totfalta7, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.Var1 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#CC3333"
                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                            return Ext.util.Format.number(value, '0,000%');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    ]
                },
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});