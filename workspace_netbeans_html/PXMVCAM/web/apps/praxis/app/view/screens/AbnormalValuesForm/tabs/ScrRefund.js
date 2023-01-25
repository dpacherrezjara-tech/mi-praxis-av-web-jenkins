Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrRefund', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrRefund',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrRefundController'
    ],
    controller: 'ScrRefundController',
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
            id: prototype.id + '-boxPrincipalScrRefund',
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
                    id: prototype.id + '-boxMainDataScrRefund',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataScrRefund">

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
                                id: prototype.id + '-gridDataScrRefund',
                                height: 450,
                                width: 978,
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
                                        {text: 'Processing ',id:prototype.id+'-hdFecha',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Date', dataIndex: 'strFormatDate', width: 110, align: 'center',
                                                    listeners: {
                                                        click: 'GridByWeek_colHandler',
                                                        args: ['']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:center;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Amount',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Curr', width: 70, dataIndex: 'SCURRENCY',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:center;background:#9ccfbf;";
                                                        return value ;
                                                    }
                                                },
                                                {text: 'Sale', width: 90, dataIndex: 'SVFOPUSD',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                    }
                                                },
                                                {text: 'Refund', width: 90, dataIndex: 'RVFOPUSD',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totRVFOPUSD, '0,000') + '<b>';
                                                    }
                                                },
                                                {text: '%', width: 70, dataIndex: 'Perc1',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totPerc1, '0,000.00') + '<b>';
                                                    }
                                                },
                                                {text: 'Difference', width: 90, dataIndex: 'Diff1',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totDiff1, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Qty Tran', width: 90, dataIndex: 'QTYTRAN',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                return Ext.util.Format.number(value, '0,000');
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                metaData.style = 'text-align:right';
                                                return '<b>' + Ext.util.Format.number(data.totQTYTRAN, '0,000') + '<b>';
                                            }
                                        },
                                        {text: 'Type of Error',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: '',id:prototype.id+'hdError1', width: 90, dataIndex: 'QTYERR1',
                                                    listeners: {
                                                        click: 'GridByWeek_colHandler',
                                                        args: ['01']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:right;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totQTYERR1, '0,000') + '<b>';
                                                    }
                                                },
                                                {text: '',id:prototype.id+'hdError2', width: 90, dataIndex: 'QTYERR2',
                                                    listeners: {
                                                        click: 'GridByWeek_colHandler',
                                                        args: ['08']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:right;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totQTYERR2, '0,000') + '<b>';
                                                    }
                                                },
                                                {text: '',id:prototype.id+'hdError3', width: 90, dataIndex: 'QTYERR3',
                                                    listeners: {
                                                        click: 'GridByWeek_colHandler',
                                                        args: ['06']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:right;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totQTYERR3, '0,000') + '<b>';
                                                    }
                                                },
                                                {text: '',id:prototype.id+'hdError4', width: 90, dataIndex: 'QTYERR1',
                                                    listeners: {
                                                        click: 'GridByWeek_colHandler',
                                                        args: ['04']
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:right;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrRefund').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totQTYERR4, '0,000') + '<b>';
                                                    }
                                                }
                                            ]

                                        }

                                    ]
                                }
                             }
                            ]
                        }
                    ]


                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxByWeek',
                    width: '100%',
                    hidden: true,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataScrRefund">

                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {xtype: 'label', id: prototype.id + '-lblTit_Week', text: '', style: "font-size:12px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataWeek',
                                    height: 560,
                                    width: 1170,
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
                                            {text: 'Card ',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'RCARDN', width: 130, align: 'center',
                                                        listeners: {
                                                            click: 'GridByTkt_colHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Type', dataIndex: 'RCARCOD', width: 60, align: 'center'}
                                                ]
                                            },
                                            {text: 'Amount USD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sale', width: 90, dataIndex: 'SVFOPUSD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataWeek').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Refund', width: 90, dataIndex: 'RVFOPUSD',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataWeek').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totRVFOPUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', width: 70, dataIndex: 'Perc1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataWeek').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totPerc1, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Difference', width: 90, dataIndex: 'Diff1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataWeek').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totDiff1, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Week',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '1', width: 90, dataIndex: 'SEM1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: '2', width: 90, dataIndex: 'SEM2',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: '13', width: 90, dataIndex: 'SEM3',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: '4', width: 90, dataIndex: 'SEM4',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: '5', width: 90, dataIndex: 'SEM5',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]

                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Transactions', width: 90, dataIndex: 'TOTAL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataWeek').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totTOTAL, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Errors', width: 90, dataIndex: 'QTYERROR',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataWeek').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYERROR, '0,000') + '<b>';
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
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxByTkt',
                    width: '100%',
                    hidden: true,
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataScrRefund">

                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {xtype: 'label', id: prototype.id + '-lblTit_Tkt', text: '', style: "font-size:12px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                {
                                xtype: 'grid',
                                padding: '20 0 0 0',
                                id: prototype.id + '-gridDataTkt',
                                height: 560,
                                width: 1100,
                                columnLines: true,
            //                    resizable: false,
                                features: [
                                    {
                                        dock: 'bottom',
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
                                        {text: 'Ticket ',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Number', dataIndex: 'strTicket', width: 110, align: 'center',
                                                    listeners: {
                                                        click: 'gridData_VIEWTKT_clickHandler'
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:center;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Processing ',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Date', dataIndex: 'strFormatDate2', width: 90, align: 'center'}
                                            ]
                                        },
                                        {text: 'Source',
                                            columns: [
                                                {text: 'Sales', dataIndex: 'strDescription', width: 60, align: 'center'}
                                            ]
                                        },
                                        {text: 'Transaction',
                                            columns: [
                                                {text: 'Code', dataIndex: 'strDescription4', width: 60, align: 'center'}
                                            ]
                                        },
                                        {text: 'Sales',
                                            columns: [
                                                {text: 'Date', dataIndex: 'strFormatDate3', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:center; margin-center:0px;background:#FFF9E0;';
                                                        return value;
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Refund',
                                            columns: [
                                                {text: 'Date', dataIndex: 'strFormatDate4', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:center; margin-center:0px;background:#FFF9E0;';
                                                        return value;
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Difference',
                                            columns: [
                                                {text: 'days', dataIndex: 'diffDate', width: 80, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:center; margin-center:0px;background:#FFF9E0;';
                                                        
                                                        return Ext.util.Format.number(value, '0,000');
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Country', dataIndex: 'SCOUNTRY', width: 60, align: 'center'},
                                        {text: 'Agent', dataIndex: 'SAGENT', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataTkt').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:center; margin-center:0px;';
                                                        metaData.tdAttr = 'data-qtip="' + data.strDescription2 + '"';
                                                        return value;
                                                    }
                                        },
                                        {text: 'Currency', dataIndex: 'SCURRENCY', width: 65, align: 'center'},
                                        {text: 'Sales',
                                            columns: [
                                                {text: 'Amount', width: 90, dataIndex: 'SVFOP', align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataTkt').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Refund',
                                            columns: [
                                                {text: 'Amount', width: 65, dataIndex: 'RVFOP', align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataTkt').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totRVFOP, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Difference',
                                            columns: [
                                                {text: 'Amount', width: 80, dataIndex: 'diffAmount', align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataTkt').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totdiffAmount, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Error',
                                            columns: [
                                                {text: 'Code', dataIndex: 'CERROR', width: 50, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataTkt').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:center; margin-center:0px;';
                                                        metaData.tdAttr = 'data-qtip="' + data.CERROR+'-'+data.strDescription1 + '"';
                                                        return value;
                                                    }
                                                }
                                            ]
                                        }

                                    ]
                                }
                             }
                            ]
                        }
                    ]


                }
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