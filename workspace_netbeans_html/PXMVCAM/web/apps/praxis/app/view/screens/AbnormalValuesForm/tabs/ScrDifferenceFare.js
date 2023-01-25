Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDifferenceFare', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrDifferenceFare',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDifferenceFareController'
    ],
    controller: 'ScrDifferenceFareController',
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
            id: prototype.id + '-boxPrincipalDifference',
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
                    id: prototype.id + '-boxMainDataDifference',
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">

                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    padding: '5px 0px 0px 0px',
                                    width: 774,
//                                    height: 428,
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
                                            {
                                                text: 'Sales Date', dataIndex: 'strFormatDate', width: 110, align: 'center',
                                                listeners: {
                                                    click: 'clickgridDetWeek_colHandler',
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Total',
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTTKT', width: 110, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTTKT, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'USD Net', dataIndex: 'VALORT', width: 110, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVALORT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sales',
                                                columns: [
                                                    {text: 'High Values', columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTKTSH', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQTKTSH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'USD Differences', dataIndex: 'VALORH', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totVALORH, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Low Values', columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTKTSL', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQTKTSL, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'USD Differences', dataIndex: 'VALORL', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totVALORL, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                    ]


                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxWeek',
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetWeek',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {xtype: 'label', id: prototype.id + '-titgridDetWeekS', text: '', style: "font-size:12px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetWeek',
                                    padding: '5px 0px 0px 0px',
                                    width: 788,
                                    height: 524,
                                    columnLines: true,
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
                                                text: 'Sales Country', dataIndex: 'COUNTRYS', width: 110, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background:#d5f4d5;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Total',
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTTKT', width: 110, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTTKT, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'USD Net', dataIndex: 'VALORT', width: 110, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVALORT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sales',
                                                columns: [
                                                    {text: 'High Values', columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTKTSH', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQTKTSH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'USD Differences', dataIndex: 'VALORH', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totVALORH, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Low Values', columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTKTSL', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQTKTSL, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'USD Differences', dataIndex: 'VALORL', width: 110, align: 'center',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totVALORL, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
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