Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.ScrEMD', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrEMD',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.ScrEMDController'
    ],
    controller: 'ScrEMDController',
//    layout: 'fit',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            xtype: 'radiogroup',
            id: prototype.id + '-rbgStatus',
            items: [
                {boxLabel: '<b style="color:#148D28;">EMD</b>', inputValue: 'rbEMD', name: 'rbgStatus', checked: true},
                {xtype: 'tbspacer', width: 20},
                {boxLabel: '<b style="color:#148D28;">USE</b>', inputValue: 'rbUSE', name: 'rbgStatus'}
            ],
            listeners: {
                change: 'rbgReport_clickHandler'
            }
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainData_EMD',
            width: '100%',
            hidden: false,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 0 0 0"  // (top, right, bottom, left)
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
                            id: prototype.id + '-gridData_EMD',
                            width: 1283,
                            columnLines: true,
                            margin: "0 0 0 0",
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
                                    {id: prototype.id + '-columnName01', text: 'Sale',
//                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                listeners: {
                                                    click: 'imgByDay_clickHandler'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENC', width: 60
                                    },
                                    {
                                        text: 'EMD',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEM', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E3CAF6;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEM, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E3CAF6;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEM, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'EMD-A',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEA', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFCD;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFCD;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEA, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'EMD-S',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTES', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFC875;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTES, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTES', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFC875;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTES, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MD50',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEMD', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#9CD2FF;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEMD, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEMD', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#9CD2FF;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEMD, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MSC',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTMS', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFFF;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTMS, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTMS', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFFF;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTMS, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'VOU',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEV', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFD2D6;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEV, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEV', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFD2D6;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEV, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total EMD',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'TOTQTYEMD', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTQTYEMD, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'TOTAMTEMD', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTAMTEMD, '0,000') + '<b>';
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
            id: prototype.id + '-boxMainData_USE',
            width: '100%',
            hidden: false,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 0 0 0"  // (top, right, bottom, left)
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
                            id: prototype.id + '-gridData_USE',
                            width: 803,
                            columnLines: true,
                            margin: "0 0 0 0",
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
                                    {id: prototype.id + '-columnName02', text: 'Sale',
//                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                listeners: {
                                                    click: 'imgByDay_clickHandler'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENC', width: 60
                                    },
                                    {
                                        text: 'Use Flown',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QTKTFL', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTFL, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTFL', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTFL, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Use-Refund',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QTKTRF', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTRF, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTRF', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTRF, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Use-Exchange',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QTKTEX', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEX, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEX', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEX, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total Use',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'TOTQTYUSE', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTQTYUSE, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'TOTAMTUSE', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_USE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTAMTUSE, '0,000') + '<b>';
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
        /*{
            xtype: 'panel',
            id: prototype.id + '-boxMainDetailData_EMD',
            width: '100%',
            hidden: false,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 0 0 0"  // (top, right, bottom, left)
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
                            id: prototype.id + '-gridDetailData_EMD',
                            width: 1283,
                            columnLines: true,
                            margin: "0 0 0 0",
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
                                    {id: prototype.id + '-columnDetailName01', text: 'Sale',
//                                        text: 'Sale',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate2', width: 100,
                                                listeners: {
                                                    click: 'imgByDay_clickHandler'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENC', width: 60
                                    },
                                    {
                                        text: 'EMD',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEM', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E3CAF6;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEM, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEM', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#E3CAF6;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEM, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'EMD-A',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEA', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFCD;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEA', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFCD;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEA, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'EMD-S',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTES', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFC875;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTES, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTES', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFC875;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTES, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MD50',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEMD', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#9CD2FF;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEMD, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEMD', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#9CD2FF;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEMD, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MSC',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTMS', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFFF;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTMS, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTMS', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFFFFF;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTMS, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'VOU',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'QTKTEV', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFD2D6;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTKTEV, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMOUNTEV', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#FFD2D6;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNTEV, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total EMD',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Tickets', dataIndex: 'TOTQTYEMD', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTQTYEMD, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'TOTAMTEMD', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData_EMD').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTOTAMTEMD, '0,000') + '<b>';
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
        },*/
    ]
});

