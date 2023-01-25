valor = '0';
Ext.define('Ext.Praxis.view.payments.IntalmentSalesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1570,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1428,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    width: 1428,
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
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 75, sortable: true,
                                                        listeners: {
                                                            click: 'onGridDetMain'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            metaData.tdAttr = 'data-qtip="' + "Drilldown by bank" + '"';
                                                            return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'CURRENPAY', width: 75, sortable: true
                                            },
                                            {
                                                text: 'Match',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Quantity', dataIndex: 'QTYTKT_1', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#dbf8db;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_1, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_1', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#dbf8db;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_1, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_1', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#dbf8db;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_1, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Match Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans. Quantity',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Positive', dataIndex: 'QTYTKT_6', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_6, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Negative', dataIndex: 'QTYTKT_2', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#ccf2ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_2, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_2', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccf2ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_2', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccf2ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'T_DIFF_2', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.T_DIFF_2 > -1) ? metaData.style = "text-align:right;background-color:#ccf2ff;color:#000000"
                                                                            : metaData.style = "text-align:right;background-color:#ccf2ff;color:#FF0000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totT_DIFF_2, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Match Without EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Quantity', dataIndex: 'QTYTKT_3', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#ffffd9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_3, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_3', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffffd9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_3, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_3', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffffd9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_3, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'T_DIFF_3', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.T_DIFF_3 > -1) ? metaData.style = "text-align:right;background-color:#ffffd9;color:#000000"
                                                                            : metaData.style = "text-align:right;background-color:#ffffd9;color:#FF0000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totT_DIFF_3, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquid w/o',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sales',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Trans Qty', dataIndex: 'QTYTKT_5', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#E6DDF5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_5, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'EMD w/o',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Trans Qty', dataIndex: 'QTYTKT_8', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#ccf2ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_8, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'ADM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Generated', dataIndex: 'QTYDOCS', width: 75, sortable: true,
                                                        listeners: {
                                                            click: 'onGridDetPri2'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOCS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Pending', dataIndex: 'QTYDOCR', width: 75, sortable: true,
                                                        listeners: {
                                                            click: 'onGridDetPri2'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#ccf2ff;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOCR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Canceled', dataIndex: 'QTYDOC', width: 75, sortable: true,
                                                        listeners: {
                                                            click: 'onGridDetPri2'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#ccf2ff;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 20',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico01',
                                            width: 700,
                                            border: false,
                                            height: 450,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Total Amount by Sales Date \n MXN',
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
                                                    fields: ['TOTAL_1', 'TOTAL_2'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return  ' $' + Ext.util.Format.number((value / 1000000), '0.00') + 'M';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Sales Date',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
//                                                    stacked: false,
                                                    title: ['Paid', 'Receivable'],
                                                    xField: 'strFormatDate',
                                                    yField: ['TOTAL_1', 'TOTAL_2'],
                                                    colors: ['#339933', '#EC3838'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    }
//                                                    tooltip: {
//                                                        trackMouse: true,
//                                                        height: 28,
//                                                        renderer: function(toolTip, record, ctx) {
//                                                            var label = '';
//                                                            if (ctx.field === 'QMATCH') {
//                                                                label = 'Match';
//                                                            } else if (ctx.field === 'QLIQUI') {
//                                                                label = 'Settlement';
//                                                            } else if (ctx.field === 'QBANK') {
//                                                                label = 'Bank';
//                                                            } else if (ctx.field === 'QDIFF') {
//                                                                label = 'Diff';
//                                                            }
//                                                            toolTip.setHtml(label + ' -  ' + record.get('strFormatDate') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
//                                                        }
//                                                    }
                                                }]

                                        },
                                        {
                                            xtype: 'polar',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-grafico02',
                                            width: 400,
                                            border: false,
                                            margin: '0 0 0 100',
                                            innerPadding: 80,
                                            height: 500,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Total - Amount MXN',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF'
//                                            },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'TOTAL',
                                                    colors: ['#339933', '#EC3838'],
                                                    label: {
                                                        field: 'LABEL'
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('TOOLTIP'));
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataPriDet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1473,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirportDet',
                                    width: 1473,
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
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'IN_BANK', width: 75, sortable: true
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strBankDeposit', width: 120, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'CURRENPAY', width: 75, sortable: true
                                            },
                                            {
                                                text: 'Match',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Quantity', dataIndex: 'QTYTKT_1', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#dbf8db;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_1, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_1', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#dbf8db;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_1, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_1', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#dbf8db;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_1, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Match Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Positive', dataIndex: 'QTYTKT_6', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_6, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Negative', dataIndex: 'QTYTKT_2', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#ccf2ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_2, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_2', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccf2ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_2', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccf2ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'T_DIFF_2', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.T_DIFF_2 > -1) ? metaData.style = "text-align:right;background-color:#ccf2ff;color:#000000"
                                                                            : metaData.style = "text-align:right;background-color:#ccf2ff;color:#FF0000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totT_DIFF_2, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Match Without EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Quantity', dataIndex: 'QTYTKT_3', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#ffffd9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_3, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_3', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffffd9;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_3, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_3', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ffffd9;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_3, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'T_DIFF_3', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.T_DIFF_3 > -1) ? metaData.style = "text-align:right;background-color:#ffffd9;color:#000000"
                                                                            : metaData.style = "text-align:right;background-color:#ffffd9;color:#FF0000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totT_DIFF_3, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquid Without Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Trans.',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Quantity', dataIndex: 'QTYTKT_5', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'onGridDetPri'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#f7e8ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYTKT_5, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Charge', dataIndex: 'TOTALCOM_5', width: 75, sortable: true,
                                                                listeners: {
                                                                    click: 'btnTicketExcel_click2'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#f7e8ff;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    metaData.tdAttr = 'data-qtip="' + "Download Excel" + '"';
                                                                    return '<a href="#payments-intalment-sales-form" style="color:#000000;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALCOM_5, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'List', dataIndex: 'TCOMISCA_5', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#f7e8ff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTCOMISCA_5, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'T_DIFF_5', width: 75, sortable: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    (data.T_DIFF_5 > -1) ? metaData.style = "text-align:right;background-color:#f7e8ff;color:#000000"
                                                                            : metaData.style = "text-align:right;background-color:#f7e8ff;color:#FF0000";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirportDet').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totT_DIFF_5, '0,000') + '<b>';
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
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1553,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1553,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Source',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'strSCARF', width: 55
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Liq', dataIndex: 'strFormatDate', width: 75, sortable: true
                                                    },
                                                    {
                                                        text: 'Sale', dataIndex: 'strFormatDate1', width: 75, sortable: true
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CODEBANK', width: 55, sortable: true
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Type', dataIndex: 'SCARCOD', width: 55, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 75, sortable: true,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strComment + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card', dataIndex: 'SCARDN', width: 110, sortable: true,
                                                editor: {
                                                    xtype: 'textfield',
                                                    editable: true
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#CCFFFF;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Authorization',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC', width: 75, sortable: true
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 75, sortable: true
                                            },
                                            {
                                                text: 'Nbr',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Fees', dataIndex: 'INSTLCOUNT', width: 55, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'CURRENPAY', width: 55, sortable: true
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
                                                        text: 'Charge', dataIndex: 'TOTALCHRG', width: 95, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOTALCHRG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'strSORIG', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Fee',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'FIRSTINSAM', width: 95, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totFIRSTINSAM, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total Commission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Charged', dataIndex: 'TOTALCOM', width: 95, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.TOTALCOM === 0.00) ? metaData.style = "text-align:right;background-color:#d5f4d5;color:#FF0000"
                                                                    : metaData.style = "text-align:right;background-color:#d5f4d5;color:#000000";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOTALCOM, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'List', dataIndex: 'TCOMISCA', width: 95, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#def2ff;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTCOMISCA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Differences', dataIndex: 'diffTCOMIS', width: 75, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.diffTCOMIS > -1) ? metaData.style = "text-align:right;background-color:#ffe0e0;color:#000000"
                                                                    : metaData.style = "text-align:right;background-color:#ffe0e0;color:#FF0000";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_SVFOP, '0,000') + '<b>';
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
                                                        text: 'TKT', dataIndex: 'QTYTKT', width: 55, sortable: true,
                                                        listeners: {
                                                            click: 'onGridDet'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-intalment-sales-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYTKT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Flag',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ADM', dataIndex: 'strFADM', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strFADM + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
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
                            id: prototype.id + '-boxDetTkt',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1338,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTkt',
                                    width: 1338,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Src', dataIndex: 'strSCARF', width: 55,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.FTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 110,
                                                        editor: {
                                                            xtype: 'textfield',
                                                            editable: true,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                keypress: 'eventKey2',
                                                                specialkey: 'eventKey2'
                                                            }
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;background-color:#d5f4d5;editable:true;";
                                                            return '<a style="color:#057ECB;background-color:#CCFFFF;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Type', dataIndex: 'strTOPER', width: 75
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 55,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#b2e1ff;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', dataIndex: 'SCARDN', width: 100,
                                                        editor: {
                                                            xtype: 'textfield',
                                                            editable: true
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#b2e1ff;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            return '<a style="background-color:#CCFFFF;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#b2e1ff;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 55,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#b2e1ff;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b2e1ff;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTkt').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.SPNR === 'SALES') ? metaData.style = "text-align:center;background-color:#b2e1ff;color:#64418c"
                                                            : metaData.style = "text-align:center;background-color:#b2e1ff;color:#244066";
                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAGENT', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#b2e1ff;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'TRNCU', width: 75
                                                    },
                                                    {
                                                        text: 'Sub-Code', dataIndex: 'SEQ', width: 75
                                                    },
                                                    {
                                                        text: 'FEE Aeromexico', dataIndex: 'strDescripcion', width: 180,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.strDescripcion.substring(0, 1) === 'M') ? metaData.style = "text-align:left;color:#009900"
                                                                    : metaData.style = "text-align:left;color:#244066";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Audit Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sub-Code', dataIndex: 'REFERENNUM', width: 75
                                                    },
                                                    {
                                                        text: 'FEE Aeromexico', dataIndex: 'strFLOAD', width: 180,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.SEQ === data.REFERENNUM) ? metaData.style = "text-align:left;color:#009900"
                                                                    : metaData.style = "text-align:left;color:#FF0000";
                                                            metaData.tdAttr = 'data-qtip="' + data.strFLOAD + '"';
                                                            return value;
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
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
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
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


