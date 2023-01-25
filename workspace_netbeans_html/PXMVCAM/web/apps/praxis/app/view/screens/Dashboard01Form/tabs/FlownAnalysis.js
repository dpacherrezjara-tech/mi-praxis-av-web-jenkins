Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.FlownAnalysis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-FlownAnalysis',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController'
    ],
    controller: 'FlownAnalysisController',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            xtype: 'panel',
            width: '100%',
            id: prototype.id + '-filterMain',
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
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkWP_FA',
                    width: 130,
                    boxLabel: 'WorkProgress',
                    inputValue: '1',
                    listeners: {
                        change: 'chkWP_FA_click'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btnSwap_FA',
                    icon: 'resources/img/exchange.png',
                    tooltip: 'Swap',
                    listeners: {
                        click: 'btnSwap_FA_click'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainDataFA',
            width: '100%',
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
                    xtype: 'grid',
                    id: prototype.id + '-gridFAmonth',
                    width: 1482,
                    height: 392,
                    columnLines: true,
                    hidden: false,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        listeners: {
                                            click: 'viewDetFAFlight',
                                            args: ['']
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Total',
                                //                                                id: prototype.id + '-adgSalDate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Flights', dataIndex: 'QTYFlight', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Cabin',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Business',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'PerJ', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPer3, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG_J, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Economy',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'PerY', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPer4, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG_Y, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                text: 'Exceptions',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Not',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Not',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Revenue', dataIndex: 'QTYNRE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: '', dataIndex: 'strRuta', width: 20,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value === '1')
                                        return '<img src="resources/img/botones/check.png">';
                                    else
                                        return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                }
                            },
                            {
                                text: 'Comment', dataIndex: 'strDescripcion3', width: 100,
                            },
                            {
                                text: 'BN Not Flown',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTBN', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridFAmonth2',
                    width: 967,
                    height: 400,
                    columnLines: true,
                    hidden: true,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {text: 'Curr', dataIndex: 'strDescripcion4', width: 75},
                            {
                                text: 'Total',
                                //                                                id: prototype.id + '-adgSalDate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Exceptions',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Not Reported',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'PAX', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'PerCAP', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPerCAP, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Per1', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPer1, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Not Revenue',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'PAX', dataIndex: 'QTYNRE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPNRE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPNRE, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: '', dataIndex: 'strRuta', width: 20,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value === '1')
                                        return '<img src="resources/img/botones/check.png">';
                                    else
                                        return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                }
                            },
                            {
                                text: 'Comment', dataIndex: 'strDescripcion3', width: 100,
                            },
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelGridSearchWK',
            width: '100%',
            hidden: true,
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
                    xtype: 'grid',
                    id: prototype.id + '-gridSearchWK',
                    width: 1212,
                    height: 400,
                    columnLines: true,
                    hidden: false,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        listeners: {
                                            click: 'searchByWK'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Received',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Coupons', dataIndex: 'QTYFlight', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Valued',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Accounted',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX_F', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#9ccfbf;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_F, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN_F', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#9ccfbf;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN_F, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Pending',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX_J', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN_J', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Online',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QCPNON', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#04C5DA;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNON, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPNON', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#04C5DA;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNON, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'OAL',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QCPNOAL', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Per1', width: 60,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer1, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPNOAL', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 60,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '5 0 0 5',
                    width: 1200,
                    border: true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                    },
                    items: [
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-displayDetWKChart01',
                            width: 900,
                            border: true,
                            height: 280,
                            background: '#E0F8F7',
                            captions: {
                                title: {
                                    text: 'Total by Month Tickets',
                                    //alignTo: 'chart'
                                }
                            },
                            animation: {
                                duration: 200
                            },
                            interactions: ['itemhighlight'], 
                            legend: {
                                        docked: 'bottom',
                                        background: '#E0F8F7'
                                    },
                            axes: [{
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['QTYFlight','QTYPAX_F'],
                                    grid: true,
                                    title: '',
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
                                    grid: true,
                                    title: {
                                        text: 'State',
                                        translationX: -30
                                    }
                                },
                            ],
                            series: [{
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Received', 'Accounted'],
                                    xField: 'strFormatDate',
                                    yField: ['QTYFlight','QTYPAX_F'],
                                    colors: ['#3366CC', '#1e540e'],
                                    highlight: true,
                                    style: {
                                        inGroupGapWidth: -7,
                                        minGapWidth: 2,
                                        maxBarWidth: 1200
                                    },                                   
                                    tooltip: {
                                        trackMouse: true,
                                        height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            //toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                            toolTip.setHtml(record.get('QTYFlight') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                            toolTip.setHtml(record.get('QTYPAX_F') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                        }
                                    },
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelWKperMonth',
            width: '100%',
            hidden: true,
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
                    xtype: 'grid',
                    id: prototype.id + '-gridWKperMonth',
                    width: 1212,
                    height: 400,
                    columnLines: true,
                    hidden: false,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            value = '<b>' + value + '</b>';
                                            return  value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Received',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Coupons', dataIndex: 'QTYFlight', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Valued',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Accounted',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX_F', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#9ccfbf;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_F, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN_F', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#9ccfbf;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN_F, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Pending',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX_J', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN_J', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Online',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QCPNON', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#04C5DA;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNON, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPNON', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#04C5DA;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNON, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'OAL',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QCPNOAL', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Per1', width: 60,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer1, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPNOAL', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 60,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridWKperMonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        // -------------------------- FLOWN --------------------------
        {
            xtype: 'panel',
            id: prototype.id + '-panelFlownRadios',
            width: 1500,
//            hidden: true,
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
                {xtype: 'tbspacer', height: 2.5},
                // -------------------------- PRIMERO --------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelRadio',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'right'
                    },
                    items: [
//                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Flight Nbr:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNFLIGHT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'City Pair:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCPAIR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 6,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onUpperValue',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 120},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radioFlownAnalysis',
                            width: 650,
                            border: 1,
                            style: {
                                borderColor: 'black',
                                borderStyle: 'solid'
                            },
                            items: [
                                {boxLabel: '<b style="color:#148D28;">All</b>', inputValue: 'MXN', name: 'rbgpDetail', checked: true},
                                {boxLabel: '<b style="color:#148D28;">By Zone</b>', inputValue: 'Z', name: 'rbgpDetail'},
                                {boxLabel: '<b style="color:#148D28;">By City Pair</b>', inputValue: 'C', name: 'rbgpDetail'},
                                {boxLabel: '<b style="color:#148D28;">By Aircraft</b>', inputValue: 'P', name: 'rbgpDetail'},
                                {boxLabel: '<b style="color:#148D28;">Flight Profitability</b>', inputValue: 'FP', name: 'rbgpDetail'},
                            ],
                            listeners: {
                                change: 'ChangueFlown_clickHandler'
                            }
                        },
                    ]
                },
                // -------------------------- SEGUNDO --------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownAnalysis',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridFlownAnalysis',
                            width: 1290,
                            height: 580,
                            columnLines: true,
                            hidden: false,
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
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                                listeners: {
                                                    click: 'viewDetail',
                                                    args: ['FLIGHT']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Flight', dataIndex: 'QTYFlight', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
//                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Route',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Ori', dataIndex: 'CDEPART', width: 70},
                                            {text: 'Dest', dataIndex: 'CARRIVA', width: 70}
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                listeners: {
                                                    click: 'viewDetailByCabin',
                                                    args: ['', 'FLIGHT']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;color:#057ECB;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                        listeners: {
                                                            click: 'viewDetailByCabin',
                                                            args: ['J', 'FLIGHT']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;color:#057ECB;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                        listeners: {
                                                            click: 'viewDetailByCabin',
                                                            args: ['Y', 'FLIGHT']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;color:#057ECB;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exceptions',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Not Revenue',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYNRE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPNRE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNRE, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'BN Not Flown',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTBN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                // -------------------------- BY ZONE --------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxByZone',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByZone',
                            width: 1200,
                            height: 'auto',
//                            height: 353,
                            columnLines: true,
                            hidden: false,
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
                                        text: 'Zone',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Cod', dataIndex: 'ZONA', width: 60,
                                                listeners: {
                                                    click: 'viewDetail',
                                                    args: ['ZONE']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Name', dataIndex: 'strZona', width: 130,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Flight', dataIndex: 'QTYFlight', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                listeners: {
                                                    click: 'viewDetailByCabin',
                                                    args: ['', 'ZONE']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#fcf9ec;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                        listeners: {
                                                            click: 'viewDetailByCabin',
                                                            args: ['J', 'ZONE']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                        listeners: {
                                                            click: 'viewDetailByCabin',
                                                            args: ['Y', 'ZONE']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exceptions',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Revenue', dataIndex: 'QTYNRE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'BN Not Flown',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTBN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                // -------------------------- BY CITY --------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxByCityPair',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByCityPair',
                            width: 1200,
                            height: 'auto',
//                            height: 353,
                            columnLines: true,
                            hidden: false,
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
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 90,
//                                                listeners: {
//                                                    click: 'viewDetail',
//                                                    args: ['FLIGHT']
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Route',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Orig - Dest', dataIndex: 'strRuta', width: 100,
                                                //                                        listeners: {
                                                //                                            click: 'viewDetail',
                                                //                                            args: ['FLIGHT']
                                                //                                        },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Flight', dataIndex: 'QTYFlight', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        //                                                id: prototype.id + '-adgSalDate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                listeners: {
                                                    //                                            click: 'viewDetail',
                                                    //                                            args: ['FLIGHT']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#fcf9ec;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exceptions',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Revenue', dataIndex: 'QTYNRE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'BN Not Flown',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTBN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                // ------------------------ BY AIRCRAFT ------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxByNPlane',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByNPlane_OC',
                            width: 1200,
                            height: 'auto',
//                            height: 353,
                            columnLines: true,
                            hidden: false,
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
//                                    {
//                                        text: 'Flight',
//                                        defaults: {
//                                            menuDisabled: true,
//                                            sortable: false,
//                                            align: 'center'
//                                        },
//                                        columns: [
                                    {
                                        text: 'Aircraft', dataIndex: 'NPLANE', width: 90,
//                                                listeners: {
//                                                    click: 'viewDetail',
//                                                    args: ['FLIGHT']
//                                                },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
//                                        ]
//                                    },
                                    {
                                        text: 'Qty',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Flight', dataIndex: 'QTYFlight', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        //                                                id: prototype.id + '-adgSalDate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                listeners: {
                                                    //                                            click: 'viewDetail',
                                                    //                                            args: ['FLIGHT']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#fcf9ec;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#e8f9e8;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#deedfb;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Exceptions',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Not',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Revenue', dataIndex: 'QTYNRE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'BN Not Flown',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMTBN', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                // -------------------------- BY FLIGHT PROFITABILITY --------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxByFlightProfitability',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridDataByFlightProfitability',
                            width: 1420,
                            height: 'auto',
//                            height: 353,
                            columnLines: true,
                            hidden: false,
                            margin: "5 0 0 0",
                            features: [{
                                    ftype: 'summary',
                                    //dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'DFLIGHT', width: 80,
//                                                listeners: {
//                                                    click: 'viewDetail',
//                                                    args: ['FLIGHT']
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "color:#057ECB;";
                                                    //value = '<b>' + value + '</b>';
                                                    //return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 80,
//                                                listeners: {
//                                                    click: 'viewDetail',
//                                                    args: ['FLIGHT']
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "color:#057ECB;";
                                                    //value = '<b>' + value + '</b>';
                                                    //return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Aircraft', dataIndex: 'NPLANE', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //metaData.style = "color:#057ECB;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Route',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Orig - Dest', dataIndex: 'strRuta', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "color:#057ECB;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Class', dataIndex: 'CLAS', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //metaData.style = "color:#057ECB;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Pax',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Type', dataIndex: 'strDescTPAX', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "color:#057ECB;";
                                                    return value;
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'USD',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'VCPN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataByFlightProfitability').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return Ext.util.Format.number(data.totVCPN, '0,000.00');
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Miles', dataIndex: 'BASICM', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            //                                            value = '<b>' + value + '</b>';
                                            return value;
                                        },
//                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                            var data = Ext.getCmp(prototype.id + '-gridDataByFlightProfitability').getStore().getData().items[0].data;
//                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                            return Ext.util.Format.number(data.totBASICM, '0,000');
//                                        }
                                    },
                                    {
                                        text: 'Mile',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'TBASICM', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.000000');
                                                },
//                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDataByFlightProfitability').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                    return Ext.util.Format.number(data.totTBASICM, '0,000.000000');
//                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Operation',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Cost', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        text: 'General',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Cost', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Operation',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Difference', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Utility',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Loss', dataIndex: 'VCPN', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Accumulated Month',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Revenue', dataIndex: 'VCPN', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#f5cebf";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                            {
                                                text: 'Cost', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#f5cebf";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                            {
                                                text: 'Profit/Loss', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#f5cebf";
                                                    //                                            value = '<b>' + value + '</b>';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                            },
                                        ]
                                    },
                                ]
                            }
                        }
                    ]
                },
                // ----------------- Drilldown BY ALL---------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDetailData',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailData',
                            width: 1160,
                            height: 580,
                            columnLines: true,
                            hidden: false,
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
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                listeners: {
                                                    click: 'viewDetailByCupon',
                                                    args: ['DETAIL']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "color:#057ECB;";
//                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Carrier', dataIndex: 'CARRIER', width: 60},
                                    {
                                        text: 'Route',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Orig', dataIndex: 'CDEPART', width: 70},
                                            {text: 'Dest', dataIndex: 'CARRIVA', width: 70}
                                        ]
                                    },
                                    {
                                        text: 'Total',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#fcf9ec;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Cabin',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Business',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                        listeners: {
                                                            click: 'viewDetailByCabin',
                                                            args: ['J', 'DETAIL']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8;color:#057ECB;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Economy',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                        listeners: {
                                                            click: 'viewDetailByCabin',
                                                            args: ['Y', 'DETAIL']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb;color:#057ECB;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#deedfb";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'BN Not Flown',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pax', dataIndex: 'QBNPAX', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMTBN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
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
                    id: prototype.id + '-boxCoupon',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridCoupon',
                            width: 1000,
                            height: 580,
                            columnLines: true,
                            hidden: false,
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
                                        text: 'Ticket', dataIndex: 'strTicket', width: 130,
                                        listeners: {
                                            click: 'displayMasterTkt_clickHandler'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Sales',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFVTA', width: 100},
                                            {
                                                text: 'Country', dataIndex: 'PSVVTA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescPSVVTA + '"';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'AGTIA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescAgente + '"';
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: 'Fare',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Basis', dataIndex: 'FBASE', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 100},
                                            {text: 'Zone', dataIndex: 'ZONA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strZona + '"';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Orig', dataIndex: 'CDEPART', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCDEPART + '"';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Dest', dataIndex: 'CARRIVA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCARRIVA + '"';
                                                    return  value;
                                                }
                                            },
                                            {text: 'Carrier', dataIndex: 'CARR', width: 60},
                                            {text: 'Cabin', dataIndex: 'CABI', width: 60},
                                        ]
                                    },
                                    {
                                        text: 'Revenue',
                                        id: prototype.id + '-hd_MXN',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'USD', dataIndex: 'VCPN', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridCoupon').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.difVakues, '0,000') + '<b>';
                                                }
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
                    id: prototype.id + '-boxDetailByCabin',
                    width: '100%',
                    hidden: true,
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
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailByCabin',
                            width: 690,
                            height: 590,
                            columnLines: true,
                            hidden: false,
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
                                        text: 'Flight',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate', width: 110,
                                                listeners: {
                                                    click: 'viewDetailByCupon',
                                                    args: ['CABIN']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Fare',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Basis', dataIndex: 'FBASE', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'RBD', dataIndex: 'CLAS', width: 70},
                                    {
                                        text: 'Pax', dataIndex: 'QTYPAX', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailByCabin').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'Currency', dataIndex: 'strDescripcion4', width: 90},
                                    {
                                        text: 'Value', dataIndex: 'VCPN', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailByCabin').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Average',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Fare', dataIndex: 'AVG', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
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