Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.ScrExpired', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrExpired',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.ScrExpiredController'
    ],
    controller: 'ScrExpiredController',
//    layout: 'fit',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainData_expired',
            width: 1500,
            height: 631,
            hidden: false,
            layout: {
                type: 'vbox',
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
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_expired',
                            width: 874,
                            height: 370,
//                            height: 'auto',
                            columnLines: true,
                            margin: "5 0 0 0",
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Accounting',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                listeners: {
                                                    click: 'GridExpiredDetail_colHandler'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Coupons Expired',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Coupons', dataIndex: 'QCPNS', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#fff0e6;text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQCPNS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'CURRENC', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#fff0e6;";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'VALOR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#fff0e6;text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVALOR, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'AVG', dataIndex: 'perVALOR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#fff0e6;text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPerVALOR, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Commission', dataIndex: 'VCOMIS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#fff0e6;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCOMIS, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'YQ',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Value', dataIndex: 'VALORYQ', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#fff0e6;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVALORYQ, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Coupons Tax',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNST', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#e6faff;text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQCPNST, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Curr.', dataIndex: 'CURRENC', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#e6faff;";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'VALORTAX', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#e6faff;text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVALORTAX, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'AVG', dataIndex: 'perVALORYQ', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#e6faff;text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_expired').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPerVALORYQ, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                    ]
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
                            id: prototype.id + '-displayExpiredChartxxxx',
                            width: 1300,
                            border: false,
                            height: 260,
                            background: '#E0F8F7',
                            captions: {
                                title: {
                                    text: 'Coupons Expired',
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
                                    fields: ['QCPNS', 'QCPNST'],
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
                                    title: ['Expired', 'TAX'],
//                                                title: 'year1', 'year2', 'year3',
                                    xField: 'strFormatDate',
                                    yField: ['QCPNS', 'QCPNST'],
                                    colors: ['#ff8533', '#4ddbff'],
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
                                            if (ctx.field === 'QCPNS') {
                                                label = 'Expired';
                                            } else if (ctx.field === 'QCPNST') {
                                                label = 'TAX';
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
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainData_expiredDetail',
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
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_expiredDetail',
                            width: 1000,
                            height: 600,
                            columnLines: true,
                            margin: "5 0 0 0",
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Accounting Date: ',
                                        id: prototype.id + '-ExpiredDetailTitle',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Country',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'COUNTRYS', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Name', dataIndex: 'strDescripcion', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Coupons Expired',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'QCPNS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#fff0e6;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPNS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'CURRENC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#fff0e6;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'VALOR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#fff0e6;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVALOR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'AVG', dataIndex: 'perVALOR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#fff0e6;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPerVALOR, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Commission', dataIndex: 'VCOMIS', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#fff0e6;text-align:right";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCOMIS, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'YQ',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Value', dataIndex: 'VALORYQ', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#fff0e6;text-align:right";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVALORYQ, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Coupons Tax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QCPNST', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#e6faff;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPNST, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Curr.', dataIndex: 'CURRENC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#e6faff;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'VALORTAX', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#e6faff;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVALORTAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'perVALORYQ', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#e6faff;text-align:right";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_expiredDetail').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPerVALORYQ, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        },
                    ]
                }
            ]
        },
    ]
});