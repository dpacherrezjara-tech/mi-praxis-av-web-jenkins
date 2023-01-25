Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrExchangeAnalisis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrExchangeAnalisis',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrExchangeAnalisisController'
    ],
    controller: 'ScrExchangeAnalisisController',
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
            id: prototype.id + '-boxPrincipalScrExchangeAnalisis',
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
                    id: prototype.id + '-boxMainDataScrExchangeAnalisis',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataScrExchangeAnalisis">

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
                                id: prototype.id + '-gridDataScrExchangeAnalisis',
                                //height: 450,
                                width: 805,
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
                                        {text: 'Sales',
                                            columns: [
                                                {
                                                    text: 'Date', dataIndex: 'strFormatDate', width: 90, align: 'center',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:center;background:#d5f4d5;";
                                                        return value;
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Totals',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Tickets', width: 70, dataIndex: 'QTKTS',
                                                    listeners: {
                                                        click: 'viewDetExchange_colHandler',
                                                        args: ['QTKTS','','']
                                                    },
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:right;background:#d5f4d5;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.lngTotQTKTS, '0,000') + '<b>';
                                                    }
                                                },
                                                {text: 'Amount',
                                                    defaults: {
                                                        menuDisabled: true,
                                                        sortable: true,
                                                        align: 'center'
                                                    },
                                                    columns: [
                                                        {text: 'USD', width: 90, dataIndex: 'AMOUNT',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right';
                                                                return Ext.util.Format.number(value, '0,000');
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.dblTotAMOUNT, '0,000') + '<b>';
                                                            }
                                                        },
                                                        {text: 'ADM', width: 70, dataIndex: 'VALADM',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right; margin-right:0px;';
                                                                return Ext.util.Format.number(value, '0,000');
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.totVALADM, '0,000') + '<b>';
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {text: 'Exchange with Additional',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Tickets',
                                                    defaults: {
                                                        menuDisabled: true,
                                                        sortable: true,
                                                        align: 'center'
                                                    },
                                                    columns: [
                                                        {text: '> 20 %', width: 70, dataIndex: 'QTKTS4',
                                                            listeners: {
                                                                click: 'viewDetExchange_colHandler',
                                                                args: ['QTKTS4','A','20']
                                                            },
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "font-weight:bold;text-align:right;background:#d5f4d5;";
                                                                return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.lngTotQTKTS4, '0,000') + '<b>';
                                                            }
                                                        },
                                                        {text: '> 30 %', width: 70, dataIndex: 'QTKTS5',
                                                            listeners: {
                                                                click: 'viewDetExchange_colHandler',
                                                                args: ['QTKTS5','A','30']
                                                            },
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "font-weight:bold;text-align:right;background:#d5f4d5;";
                                                                return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.lngTotQTKTS5, '0,000') + '<b>';
                                                            }
                                                        },
                                                        {text: '> 50 %', width: 70, dataIndex: 'QTKTS6',
                                                            listeners: {
                                                                click: 'viewDetExchange_colHandler',
                                                                args: ['QTKTS6','A','50']
                                                            },
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = "font-weight:bold;text-align:right;background:#d5f4d5;";
                                                                return '<a href="#" style="color:#057ECB;text-decoration:none;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.lngTotQTKTS6, '0,000') + '<b>';
                                                            }
                                                        }
                                                    ]
                                                },
                                                {text: 'Amount USD',
                                                    defaults: {
                                                        menuDisabled: true,
                                                        sortable: true,
                                                        align: 'center'
                                                    },
                                                    columns: [
                                                        {text: '> 20 %', width: 90, dataIndex: 'AMOUNT4',
                                                            listeners: {
                                                                click: 'GridByWeek_colHandler',
                                                                args: ['']
                                                            },
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right; margin-right:0px;';
                                                                return Ext.util.Format.number(value, '0,000');
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.dblTotAMOUNT4, '0,000') + '<b>';
                                                            }
                                                        },
                                                        {text: '> 30 %', width: 90, dataIndex: 'AMOUNT5',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right; margin-right:0px;';
                                                                return Ext.util.Format.number(value, '0,000');
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.dblTotAMOUNT5, '0,000') + '<b>';
                                                            }
                                                        },
                                                        {text: '> 50 %', width: 90, dataIndex: 'AMOUNT6',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'text-align:right; margin-right:0px;';
                                                                return Ext.util.Format.number(value, '0,000');
                                                            },
                                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                metaData.style = 'text-align:right';
                                                                return '<b>' + Ext.util.Format.number(data.dblTotAMOUNT6, '0,000') + '<b>';
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    hidden: false,
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-ChtExchangeMB_01',
                                            width: 1300,
                                            border: false,
                                            height: 260,
                                            background: '#D1E8FE',
                                            captions: {
                                                title: {
                                                    text: 'Tickets',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['QTKTS', 'QTKTSmax'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                //                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: '',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Total', 'Exchange with Additional'],
                //                                                title: 'year1', 'year2', 'year3',
                                                    xField: 'strFormatDate',
                                                    yField: ['QTKTS', 'QTKTSmax'],
                                                    colors: ['#67BFFF', '#ffff99'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1000
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'QTKTS') {
                                                                label = 'Total';
                                                            } else if (ctx.field === 'QTKTSmax') {
                                                                label = 'Exchange with Additional';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                //                                    renderer: function (sprite, config, rendererData, index, a, b, c) {
                //                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDetData',
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
                                {xtype: 'label', id: prototype.id + '-titDetExchange', text: '', style: "font-size:12px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                {
                                xtype: 'grid',
                                padding: '20 0 0 0',
                                id: prototype.id + '-gridDetExchange',
                                height: 563,
                                width: 1262,
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
                                        {text: 'Sales',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Agent', dataIndex: 'VENDOR', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:center; margin-center:0px;';
                                                        metaData.tdAttr = 'data-qtip="' + data.strDescription + '"';
                                                        return value;
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Ticket ',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Number', dataIndex: 'TKT', width: 120, align: 'center',
                                                    listeners: {
                                                        click: 'gridData_VIEWTKT_clickHandler'
                                                    },
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                        return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Transaction', dataIndex: 'TRNCU', width: 90, align: 'center'},
                                        {text: 'Exchange',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Miles', dataIndex: 'PMP', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totPMP, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Sales',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Miles', dataIndex: 'PMP1', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totPMP1, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Difference',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Rate', dataIndex: 'RATED', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#70DB70;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totRATED, '0,000.00') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Currency', dataIndex: 'CURRENC', width: 70, align: 'center'},
                                        {text: 'Exchange',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Fare', dataIndex: 'VALOR', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#d5f4d5;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totVALOR, '0,000.00') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Sales',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Fare', dataIndex: 'VALOR1', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;background:#d5f4d5;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totVALOR1, '0,000.00') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Exchange Payment Amount',
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {text: 'Exchange', dataIndex: 'VALOREX', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totVALOREX, '0,000.00') + '<b>';
                                                    }
                                                },
                                                {text: 'Add. Cash', dataIndex: 'VALORCA', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totVALORCA, '0,000.00') + '<b>';
                                                    }
                                                },
                                                {text: 'Add. CCard', dataIndex: 'VALORCC', width: 90, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;';
                                                        return Ext.util.Format.number(value, '0,000.00');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totVALORCC, '0,000.00') + '<b>';
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
                                                {text: 'ADM', dataIndex: 'VALADM', width: 70, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = 'text-align:right; margin-right:0px;';
                                                        return Ext.util.Format.number(value, '0,000');
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var data = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data;
                                                        metaData.style = 'text-align:right';
                                                        return '<b>' + Ext.util.Format.number(data.totVALADM, '0,000') + '<b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'Sales',
                                            columns: [
                                                {text: 'CPN', dataIndex: 'SALICPN', width: 50, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var strColor = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data.strColor;
                                                        metaData.style = 'text-align:center; margin-right:0px;background:'+strColor+';';
                                                        return value;
                                                    }
                                                }
                                            ]
                                        },
                                        {text: 'User',
                                            columns: [
                                                {text: 'CPN', dataIndex: 'USEICPN', width: 50, align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var strColor = Ext.getCmp(prototype.id + '-gridDetExchange').getStore().getData().items[0].data.strColor;
                                                        metaData.style = 'text-align:center; margin-right:0px;background:'+strColor+';';
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