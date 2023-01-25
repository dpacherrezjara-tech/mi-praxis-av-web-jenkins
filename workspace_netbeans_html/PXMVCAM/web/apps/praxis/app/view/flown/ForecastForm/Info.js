valor = '0';
Ext.define('Ext.Praxis.view.flown.ForecastForm.Info', {
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
                width: 1764,
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
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 784,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 784,
                                    height: 600,
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
                                                text: 'Period',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Contab.', dataIndex: 'FCONT', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flight', dataIndex: 'DFLIGHT', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PAX',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'ML', dataIndex: 'QTYPAX', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
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
                            id: prototype.id + '-panelGridDataItinerary',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 884,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataItinerary',
                                    height: 600,
                                    width: 884,
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
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'DFLIGHT', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'Domestic',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'FRO', dataIndex: 'FRO', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totFRO, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'LOC', dataIndex: 'LOC', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totLOC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'PLA', dataIndex: 'PLA', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPLA, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'International',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ASI', dataIndex: 'ASI', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totASI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'CAM', dataIndex: 'CAM', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totCAM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'CAN', dataIndex: 'CAN', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totCAN, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'CAR', dataIndex: 'CAR', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totCAR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'EUR', dataIndex: 'EUR', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totEUR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'SUD', dataIndex: 'SUD', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSUD, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USA', dataIndex: 'USA', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totUSA, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'TOTAL', dataIndex: 'totZonas', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataForecast',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1209,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecast',
                                    width: 1209,
                                    height: 600,
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
                                            /*{
                                             text: 'Date',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {
                                             text: 'Cont', dataIndex: 'FCONT', width: 100
                                             }
                                             ]
                                             },*/
                                            {text: '', dataIndex: 'strImagen1', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: 'Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flight', dataIndex: 'DFLIGHT', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PAX',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'REAL', dataIndex: 'QTYPAX', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FORECAST', dataIndex: 'QTYPAX_FORECAST', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_FORECAST, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount Revenue USD ',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'REAL', dataIndex: 'VCPNUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FORECAST', dataIndex: 'VCPNUSD_FORECAST', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD_FORECAST, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount Revenue MXN',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'REAL', dataIndex: 'VCPNMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'FORECAST', dataIndex: 'VCPNMXN_FORECAST', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN_FORECAST, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Seq',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Week Day', dataIndex: 'DWEEK', width: 70, },
                                                ]
                                            },
                                            {text: '', dataIndex: 'strImagen2', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen2 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPMXN_PORCENTAJE', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:";
                                                            //value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }},
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', height: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecastTotals',
                                    width: 690,
                                    height: 140,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary',
                                     dock: 'bottom'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '', dataIndex: 'strImagen1', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                }
                                            },
                                            {text: 'TYPE', dataIndex: 'TREG', width: 90},
                                            {
                                                text: 'PAX',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'REAL', dataIndex: 'QTYPAX', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
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
                            id: prototype.id + '-panelGridDataForecastPercentage',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1004,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                /*{
                                 xtype: 'panel',
                                 width: 150,
                                 height: 50,
                                 border: false,
                                 margin: '5 0 5 0',
                                 layout: {
                                 type: 'vbox',
                                 pack: 'center'
                                 },
                                 bodyStyle: 'background-color: transparent;',
                                 items: [
                                 {
                                 xtype: 'radiogroup',
                                 id: prototype.id + '-radiogroupForecast',
                                 fieldLabel: '',
                                 height: 50,
                                 columns: 1,
                                 vertical: true,
                                 items: [
                                 {boxLabel: '<b style="color:#148D28;">Forecast Percentage</b>', inputValue: 'FP', name: 'rbgTypeForecast', width: 150},
                                 {boxLabel: '<b style="color:#148D28;">Forecast Zones</b>', inputValue: 'FZ', name: 'rbgTypeForecast', width: 150},
                                 ],
                                 listeners: {
                                 change: 'onChangeRadioForecast'
                                 }
                                 }
                                 ]
                                 },*/
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecastPercentage',
                                    height: 600,
                                    width: 1004,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary',
                                     dock: 'bottom'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: '', dataIndex: 'strImagen1', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: 'Day',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Week', dataIndex: 'DWEEK', width: 100}
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
                                                    {text: 'Date', dataIndex: 'DFLIGHT', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'Domestic',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'FRO', dataIndex: 'percentageFRO', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totFRO, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'LOC', dataIndex: 'percentageLOC', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totLOC, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'PLA', dataIndex: 'percentagePLA', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totPLA, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'International',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ASI', dataIndex: 'percentageASI', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totASI, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'CAM', dataIndex: 'percentageCAM', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totCAM, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'CAN', dataIndex: 'percentageCAN', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totCAN, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'CAR', dataIndex: 'percentageCAR', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totCAR, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'EUR', dataIndex: 'percentageEUR', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totEUR, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'SUD', dataIndex: 'percentageSUD', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totSUD, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                    {
                                                        text: 'USA', dataIndex: 'percentageUSA', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totUSA, '0,000') + '<b>';
                                                         }*/
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'TOTAL', dataIndex: 'totalRegistros', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataForecastZones',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1549,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecastZones',
                                    width: 1549,
                                    height: 600,
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
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: 'Seq',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Week Day', dataIndex: 'DWEEK', width: 70}
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
                                                    {text: 'Date', dataIndex: 'DFLIGHT', width: 80}
                                                ]
                                            },
                                            {
                                                text: 'Domestic',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    //FRO
                                                    {
                                                        text: 'FRO',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXFRO', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXFRO, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDFRO', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDFRO, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDFRO', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDFRO, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNFRO', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNFRO, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_FRO + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_FRO', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //LOC
                                                    {
                                                        text: 'LOC',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXLOC', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXLOC, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDLOC', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDLOC, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDLOC', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDLOC, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNLOC', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNLOC, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_LOC + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_LOC', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //PLA
                                                    {
                                                        text: 'PLA',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXPLA', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXPLA, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDPLA', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDPLA, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDPLA', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDPLA, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNPLA', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNPLA, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_PLA + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_PLA', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'International',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    //ASI
                                                    {
                                                        text: 'ASI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXASI', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXASI, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDASI', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDASI, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDASI', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDASI, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNASI', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNASI, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_ASI + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_ASI', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //CAM
                                                    {
                                                        text: 'CAM',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXCAM', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXCAM, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDCAM', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDCAM, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDCAM', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDCAM, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNCAM', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNCAM, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_CAM + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_CAM', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //CAN
                                                    {
                                                        text: 'CAN',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXCAN', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXCAN, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDCAN', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDCAN, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDCAN', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDCAN, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNCAN', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNCAN, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_CAN + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_CAN', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //CAR
                                                    {
                                                        text: 'CAR',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXCAR', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXCAR, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDCAR', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDCAR, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDCAR', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDCAR, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNCAR', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNCAR, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_CAR + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_CAR', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //EUR
                                                    {
                                                        text: 'EUR',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXEUR', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXEUR, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDEUR', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDEUR, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDEUR', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDEUR, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNEUR', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNEUR, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_EUR + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_EUR', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //SUD
                                                    {
                                                        text: 'SUD',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXSUD', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXSUD, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDSUD', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDSUD, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDSUD', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDSUD, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNSUD', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNSUD, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_SUD + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_SUD', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
                                                    },
                                                    //USA
                                                    {
                                                        text: 'USA',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'PAX', dataIndex: 'PAXUSA', width: 60,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTPAXUSA, '0,000') + '<b>';
                                                                }},
                                                            {text: 'AVG USD', dataIndex: 'VPROUSDUSA', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVPROUSDUSA, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT USD', dataIndex: 'VCPNUSDUSA', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDUSA, '0,000.00') + '<b>';
                                                                }},
                                                            {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNUSA', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNUSA, '0,000.00') + '<b>';
                                                                }},
                                                        ]
                                                    },
                                                    {text: '', dataIndex: '', width: 20,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return '<img src=' + '"' + record.data.strImagen_USA + '"' + '>';
                                                        }
                                                    },
                                                    {
                                                        text: '%Var vs',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_USA', width: 95,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }}
                                                        ]
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
                            id: prototype.id + '-panelGridDataAmountByZones',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1600,
                            height: 'auto',
                            margin: '5 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    //id: prototype.id + '-panelGridDataAmountByZones',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    width: 1600,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart01',
                                            width: 641,
                                            border: false,
                                            height: 300,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Revenue MXN by Region',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['VCPNMXN'],
                                                    grid: true,
                                                    title: 'Millions of PESOS',
                                                    renderer: function(obj, value) {
                                                        /*if (value > 1) {
                                                         if ((value / 1000).toString().length > 3) {
                                                         return ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                         } else {
                                                         return ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                         }
                                                         } else {
                                                         return '';
                                                         }*/
                                                        return ' ' + Ext.util.Format.number((value), '0.00') + 'M';
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'ZONA',
                                                    yField: ['VCPNMXN'],
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['VCPNMXN'],
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0.00') + 'M'
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                /*{
                                                 type: 'line',
                                                 //stacked: false,
                                                 xField: 'ZONA',
                                                 yField: ['VCPNMXN'],
                                                 style: {
                                                 'stroke-width': 4
                                                 },
                                                 markerConfig: {
                                                 radius: 4
                                                 },
                                                 highlight: {
                                                 fill: '#000',
                                                 radius: 5,
                                                 'stroke-width': 2,
                                                 stroke: '#fff'
                                                 },
                                                 tooltip: {
                                                 trackMouse: true,
                                                 style: 'background: #FFF',
                                                 height: 20,
                                                 showDelay: 0,
                                                 dismissDelay: 0,
                                                 hideDelay: 0,
                                                 renderer: function(toolTip, record, ctx) {
                                                 toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                 }
                                                 },
                                                 renderer: 'onColumnRender'
                                                 }*/
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataAmountByZones',
                                            //height: 600,
                                            width: 274,
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
                                                        text: 'AMOUNT MXN', dataIndex: 'VCPNMXN', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAmountByZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Region', dataIndex: 'ZONA', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            //value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'AMOUNT USD', dataIndex: 'VCPNUSD', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAmountByZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart02',
                                            width: 641,
                                            border: false,
                                            height: 300,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Revenue USD by Region',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['VCPNUSD'],
                                                    grid: true,
                                                    title: 'Millions of USD',
                                                    renderer: function(obj, value) {
                                                        /*if (value > 1) {
                                                         if ((value / 1000).toString().length > 3) {
                                                         return ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                         } else {
                                                         return ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                         }
                                                         } else {
                                                         return '';
                                                         }*/
                                                        return ' ' + Ext.util.Format.number((value), '0.00') + 'M';
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'ZONA',
                                                    yField: ['VCPNUSD'],
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['VCPNUSD'],
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0.00') + 'M'
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {xtype: 'tbspacer', height: 20},
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    width: 1600,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-displaySAChart03',
                                            reference: 'chart',
                                            background: '#E0F8F7',
                                            innerPadding: 50,
                                            captions: {
                                                title: 'Revenue MXN by Market',
                                            },
                                            theme: 'default-gradients',
                                            width: 641,
                                            height: 320,
                                            /*legend: {
                                             docked: 'bottom'
                                             },*/
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'VCPNMXN',
                                                    colors: ['#339933', '#3978F5'],
                                                    /*label: {
                                                     field: 'ZONA',
                                                     calloutLine: {
                                                     length: 60,
                                                     width: 3
                                                     // specifying 'color' is also possible here
                                                     }
                                                     },*/
                                                    label: {
                                                        field: 'LABEL_MXN',
                                                        //display: 'insideEnd',
                                                        display: 'middle',
                                                        calloutLine: {
                                                            length: 60,
                                                            width: 3
                                                                    // specifying 'color' is also possible here
                                                        }
                                                        /*renderer: function(value, b, callout) {
                                                         callout.calloutVertical = false;
                                                         return Ext.util.Format.number(value, '0,000.00')
                                                         }*/
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataAmountByMarket',
                                            //height: 600,
                                            width: 274,
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
                                                        text: 'AMOUNT MXN', dataIndex: 'VCPNMXN', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAmountByMarket').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Market', dataIndex: 'ZONA', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            //value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'AMOUNT USD', dataIndex: 'VCPNUSD', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAmountByMarket').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-displaySAChart04',
                                            reference: 'chart',
                                            innerPadding: 50,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: 'Revenue USD by Market',
                                            },
                                            theme: 'default-gradients',
                                            width: 641,
                                            height: 320,
                                            /*legend: {
                                             docked: 'bottom'
                                             },*/
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'VCPNUSD',
                                                    colors: ['#339933', '#3978F5'],
                                                    label: {
                                                        field: 'LABEL_USD',
                                                        //display: 'insideEnd',
                                                        display: 'middle',
                                                        calloutLine: {
                                                            length: 60,
                                                            width: 3
                                                                    // specifying 'color' is also possible here
                                                        }
                                                        /*renderer: function(value, b, callout) {
                                                         callout.calloutVertical = false;
                                                         return Ext.util.Format.number(value, '0,000.00')
                                                         }*/
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMarketInGeneral',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            hidden: true,
                            width: 1600,
                            height: 'auto',
                            margin: '5 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    width: 800,
                                    height: 'auto',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataMarketFirstLevel',
                                            width: 664,
                                            height: 'auto',
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
                                                        text: 'Market', dataIndex: 'ZONA',
                                                        width: 90,
                                                    },
                                                    {
                                                        text: 'PAX',
                                                        dataIndex: 'QTYPAX',
                                                        width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Amount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', height: 50},
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelGridDataMarketSecondLevel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: true,
                                            width: 664,
                                            height: 'auto',
                                            margin: '5 0 0 0 ',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataMarketSecondLevelDomestic',
                                                    width: 664,
                                                    height: 'auto',
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
                                                                text: 'ZONA', dataIndex: 'ZONA',
                                                                width: 90,
                                                            },
                                                            {
                                                                text: 'PAX',
                                                                dataIndex: 'QTYPAX',
                                                                width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Amount',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Average',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Average',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                {xtype: 'tbspacer', height: 20},
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataMarketSecondLevelInternational',
                                                    width: 664,
                                                    height: 262,
                                                    columnLines: true,
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
                                                                text: 'ZONA', dataIndex: 'ZONA',
                                                                width: 90,
                                                            },
                                                            {
                                                                text: 'PAX',
                                                                dataIndex: 'QTYPAX',
                                                                width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').getStore().getData().items[0].data;
                                                                    console.log(data.totQTYPAX);
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Amount',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Average',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Average',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
                                                                        }
                                                                    },
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
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    width: 800,
                                    height: 'auto',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-displaySAChart05',
                                            reference: 'chart',
                                            innerPadding: 30,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: 'Revenue USD by Domestic Market',
                                            },
                                            theme: 'default-gradients',
                                            width: 641,
                                            height: 250,
                                            /*legend: {
                                             docked: 'bottom'
                                             },*/
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'VCPNUSD',
                                                    colors: ['#54AAB8', '#B5E6EE', '#6CDAEB'],
                                                    label: {
                                                        field: 'ZONA',
                                                        /*calloutLine: {
                                                         length: 60,
                                                         width: 3
                                                         // specifying 'color' is also possible here
                                                         }*/
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        },
                                        {xtype: 'tbspacer', height: 10},
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-displaySAChart06',
                                            reference: 'chart',
                                            innerPadding: 20,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: 'Revenue USD by International Market',
                                            },
                                            theme: 'default-gradients',
                                            width: 641,
                                            height: 370,
                                            /*legend: {
                                             docked: 'bottom'
                                             },*/
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'VCPNUSD',
                                                    colors: ['#1b5692', '#43a756', '#999999', '#de8a3d', '#74a2d7', '#f0c33b', '#9fc54d'],
                                                    label: {
                                                        field: 'ZONA',
                                                        /*calloutLine: {
                                                         length: 60,
                                                         width: 3
                                                         // specifying 'color' is also possible here
                                                         }*/
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataRevenueByYear',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            //hidden: true,
                            width: 1404,
                            height: 'auto',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {//Grillas
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    //hidden: true,
                                    width: 1404,
                                    height: 'auto',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {//USD & MXN
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: true,
                                            //hidden: true,
                                            width: 1102,
                                            height: 'auto',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                //align: 'center'
                                            },
                                            items: [
                                                //Months
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridMonths_1',
                                                    width: 92,
                                                    margin: '73 0 0 0 ',
                                                    height: 'auto',
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Months',
                                                                dataIndex: 'NAME',
                                                                width: 90,
                                                            },
                                                        ]
                                                    }
                                                },
                                                //Previous
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelDataPreviousYearUSD',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    border: true,
                                                    //hidden: true,
                                                    width: 338,
                                                    height: 'auto',
                                                    margin: '0 0 0 0 ',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        //PreviousYearDomestic
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataByPreviousYearDomesticUSD',
                                                            width: 334,
                                                            hidden: true,
                                                            height: 'auto',
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
                                                                        text: 'Domestic',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background:";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        //PreviousYearInternational
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataByPreviousYearInternationalUSD',
                                                            width: 334,
                                                            hidden: true,
                                                            height: 'auto',
                                                            columnLines: true,
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
                                                                        text: 'International',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background:";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        //PreviousYearGeneral
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataByPreviousYearGeneral',
                                                            width: 334,
                                                            height: 'auto',
                                                            columnLines: true,
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
                                                                        text: 'General',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background:";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000') + '<b>';
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
                                                },
                                                //Current
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelDataCurrentYearUSD',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    border: true,
                                                    //hidden: true,
                                                    width: 338,
                                                    height: 'auto',
                                                    margin: '0 0 0 0 ',
                                                    layout: {
                                                        type: 'hbox',
                                                        //align: 'center'
                                                    },
                                                    items: [
                                                        //CurrentYearDomestic
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataByCurrentYearDomesticUSD',
                                                            width: 334,
                                                            hidden: true,
                                                            height: 'auto',
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
                                                                        text: 'Domestic',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background:";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        //CurrentYearInternational
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataByCurrentYearInternationalUSD',
                                                            width: 334,
                                                            hidden: true,
                                                            height: 'auto',
                                                            columnLines: true,
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
                                                                        text: 'International',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background:";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        },
                                                        //CurrentYearGeneral
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataByCurrentYearGeneral',
                                                            width: 334,
                                                            height: 'auto',
                                                            columnLines: true,
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
                                                                        text: 'General',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background:";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000') + '<b>';
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            metaData.style = "text-align:right;background:";
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                                            var data = Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').getStore().getData().items[0].data;
                                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000') + '<b>';
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
                                                },
                                                //Balance
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-panelDataBalanceByYear',
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    border: true,
                                                    //hidden: true,
                                                    width: 338,
                                                    height: 'auto',
                                                    margin: '0 0 0 0 ',
                                                    layout: {
                                                        type: 'hbox',
                                                        //align: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDataBalanceByYear',
                                                            width: 334,
                                                            height: 'auto',
                                                            columnLines: true,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    //Domestic Balance
                                                                    {
                                                                        text: 'Domestic',
                                                                        id: prototype.id + '-DataDomesticBalanceByYear',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'DOMESTIC_B_QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var color = "";
                                                                                    if (value < 0) {
                                                                                        color = "#9C0101";
                                                                                    }
                                                                                    metaData.style = "text-align:right;color:" + color;
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'DOMESTIC_B_VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            var color = "";
                                                                                            if (value < 0) {
                                                                                                color = "#9C0101";
                                                                                            }
                                                                                            metaData.style = "text-align:right;color:" + color;
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'DOMESTIC_B_VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            var color = "";
                                                                                            if (value < 0) {
                                                                                                color = "#9C0101";
                                                                                            }
                                                                                            metaData.style = "text-align:right;color:" + color;
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                    //International Balance
                                                                    {
                                                                        text: 'International',
                                                                        id: prototype.id + '-DataInternationalBalanceByYear',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'INTERNATIONAL_B_QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var color = "";
                                                                                    if (value < 0) {
                                                                                        color = "#9C0101";
                                                                                    }
                                                                                    metaData.style = "text-align:right;color:" + color;
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'INTERNATIONAL_B_VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            var color = "";
                                                                                            if (value < 0) {
                                                                                                color = "#9C0101";
                                                                                            }
                                                                                            metaData.style = "text-align:right;color:" + color;
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'INTERNATIONAL_B_VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            var color = "";
                                                                                            if (value < 0) {
                                                                                                color = "#9C0101";
                                                                                            }
                                                                                            metaData.style = "text-align:right;color:" + color;
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        }
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                    //General Balance
                                                                    {
                                                                        text: 'General',
                                                                        id: prototype.id + '-DataGeneralBalanceByYear',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'PAX',
                                                                                dataIndex: 'GENERAL_B_QTYPAX',
                                                                                width: 90,
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var color = "";
                                                                                    if (value < 0) {
                                                                                        color = "#9C0101";
                                                                                    }
                                                                                    metaData.style = "text-align:right;color:" + color;
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue USD', dataIndex: 'GENERAL_B_VCPNUSD', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            var color = "";
                                                                                            if (value < 0) {
                                                                                                color = "#9C0101";
                                                                                            }
                                                                                            metaData.style = "text-align:right;color:" + color;
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                text: 'Amount',
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: false,
                                                                                    align: 'center'
                                                                                },
                                                                                columns: [
                                                                                    {text: 'Revenue MXN', dataIndex: 'GENERAL_B_VCPNMXN', width: 120,
                                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                            var color = "";
                                                                                            if (value < 0) {
                                                                                                color = "#9C0101";
                                                                                            }
                                                                                            metaData.style = "text-align:right;color:" + color;
                                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                                            return value;
                                                                                        },
                                                                                    },
                                                                                ]
                                                                            },
                                                                        ]
                                                                    },
                                                                ]
                                                            },
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {xtype: 'tbspacer', height: 20},
                                //Gráficos - GENERAL
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraphicGeneral',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    //hidden: true,
                                    width: 1404,
                                    height: 'auto',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart07',
                                            width: 652,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Comparison in USD last year with current - General',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['GENERAL_VCPNUSD_LY', 'GENERAL_VCPNUSD_CY'],
                                                    grid: true,
                                                    title: 'Millions of USD',
                                                    renderer: function(obj, value) {
                                                        return ' ' + Ext.util.Format.number((value), '0');
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                },
                                            ],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'MES',
                                                    yField: 'GENERAL_VCPNUSD_LY',
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: 'GENERAL_VCPNUSD_LY',
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                {
                                                    type: 'line',
                                                    stacked: true,
                                                    xField: 'MES',
                                                    yField: 'GENERAL_VCPNUSD_CY',
                                                    style: {
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        radius: 4,
                                                        lineWidth: 2
                                                    },
                                                    label: {
                                                        field: 'GENERAL_VCPNUSD_CY',
                                                        display: 'over',
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    markerConfig: {
                                                        radius: 4
                                                    },
                                                    highlight: {
                                                        fill: '#000',
                                                        radius: 5,
                                                        'stroke-width': 2,
                                                        stroke: '#fff'
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        style: 'background: #FFF',
                                                        height: 20,
                                                        showDelay: 0,
                                                        dismissDelay: 0,
                                                        hideDelay: 0,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart08',
                                            width: 652,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Comparison in MXN last year with current - General',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['GENERAL_VCPNMXN_LY', 'GENERAL_VCPNMXN_CY'],
                                                    grid: true,
                                                    title: 'Millions of MXN',
                                                    renderer: function(obj, value) {
                                                        return ' ' + Ext.util.Format.number((value), '0');
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                },
                                            ],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'MES',
                                                    yField: 'GENERAL_VCPNMXN_LY',
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: 'GENERAL_VCPNMXN_LY',
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                {
                                                    type: 'line',
                                                    stacked: true,
                                                    xField: 'MES',
                                                    yField: 'GENERAL_VCPNMXN_CY',
                                                    style: {
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        radius: 4,
                                                        lineWidth: 2
                                                    },
                                                    label: {
                                                        field: 'GENERAL_VCPNMXN_CY',
                                                        display: 'over',
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    markerConfig: {
                                                        radius: 4
                                                    },
                                                    highlight: {
                                                        fill: '#000',
                                                        radius: 5,
                                                        'stroke-width': 2,
                                                        stroke: '#fff'
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        style: 'background: #FFF',
                                                        height: 20,
                                                        showDelay: 0,
                                                        dismissDelay: 0,
                                                        hideDelay: 0,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }
                                            ]
                                        },
                                    ]
                                },
                                //Gráficos - DOMESTIC
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    id: prototype.id + '-panelGraphicDomestic',
                                    border: true,
                                    hidden: true,
                                    width: 1404,
                                    height: 'auto',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart09',
                                            width: 652,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Comparison in USD last year with current - Domestic',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['DOMESTIC_VCPNUSD_LY', 'DOMESTIC_VCPNUSD_CY'],
                                                    grid: true,
                                                    title: 'Millions of USD',
                                                    renderer: function(obj, value) {
                                                        return ' ' + Ext.util.Format.number((value), '0');
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                },
                                            ],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'MES',
                                                    yField: 'DOMESTIC_VCPNUSD_LY',
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: 'DOMESTIC_VCPNUSD_LY',
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                {
                                                    type: 'line',
                                                    stacked: true,
                                                    xField: 'MES',
                                                    yField: 'DOMESTIC_VCPNUSD_CY',
                                                    style: {
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        radius: 4,
                                                        lineWidth: 2
                                                    },
                                                    label: {
                                                        field: 'DOMESTIC_VCPNUSD_CY',
                                                        display: 'over',
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    markerConfig: {
                                                        radius: 4
                                                    },
                                                    highlight: {
                                                        fill: '#000',
                                                        radius: 5,
                                                        'stroke-width': 2,
                                                        stroke: '#fff'
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        style: 'background: #FFF',
                                                        height: 20,
                                                        showDelay: 0,
                                                        dismissDelay: 0,
                                                        hideDelay: 0,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart10',
                                            width: 652,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Comparison in MXN last year with current - Domestic',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['DOMESTIC_VCPNMXN_LY', 'DOMESTIC_VCPNMXN_CY'],
                                                    grid: true,
                                                    title: 'Millions of MXN',
                                                    renderer: function(obj, value) {
                                                        return ' ' + Ext.util.Format.number((value), '0');
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                },
                                            ],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'MES',
                                                    yField: 'DOMESTIC_VCPNMXN_LY',
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: 'DOMESTIC_VCPNMXN_LY',
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                {
                                                    type: 'line',
                                                    stacked: true,
                                                    xField: 'MES',
                                                    yField: 'DOMESTIC_VCPNMXN_CY',
                                                    style: {
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        radius: 4,
                                                        lineWidth: 2
                                                    },
                                                    label: {
                                                        field: 'DOMESTIC_VCPNMXN_CY',
                                                        display: 'over',
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    markerConfig: {
                                                        radius: 4
                                                    },
                                                    highlight: {
                                                        fill: '#000',
                                                        radius: 5,
                                                        'stroke-width': 2,
                                                        stroke: '#fff'
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        style: 'background: #FFF',
                                                        height: 20,
                                                        showDelay: 0,
                                                        dismissDelay: 0,
                                                        hideDelay: 0,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }
                                            ]
                                        },
                                    ]
                                },
                                //Gráficos - INTERNATIONAL
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraphicInternational',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    hidden: true,
                                    border: true,
                                    width: 1404,
                                    height: 'auto',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart11',
                                            width: 652,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Comparison in USD last year with current - International',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['INTERNATIONAL_VCPNUSD_LY', 'INTERNATIONAL_VCPNUSD_CY'],
                                                    grid: true,
                                                    title: 'Millions of USD',
                                                    renderer: function(obj, value) {
                                                        return ' ' + Ext.util.Format.number((value), '0');
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                },
                                            ],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'MES',
                                                    yField: 'INTERNATIONAL_VCPNUSD_LY',
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: 'INTERNATIONAL_VCPNUSD_LY',
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                {
                                                    type: 'line',
                                                    stacked: true,
                                                    xField: 'MES',
                                                    yField: 'INTERNATIONAL_VCPNUSD_CY',
                                                    style: {
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        radius: 4,
                                                        lineWidth: 2
                                                    },
                                                    label: {
                                                        field: 'INTERNATIONAL_VCPNUSD_CY',
                                                        display: 'over',
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    markerConfig: {
                                                        radius: 4
                                                    },
                                                    highlight: {
                                                        fill: '#000',
                                                        radius: 5,
                                                        'stroke-width': 2,
                                                        stroke: '#fff'
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        style: 'background: #FFF',
                                                        height: 20,
                                                        showDelay: 0,
                                                        dismissDelay: 0,
                                                        hideDelay: 0,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart12',
                                            width: 652,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Comparison in MXN last year with current - International',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['INTERNATIONAL_VCPNMXN_LY', 'INTERNATIONAL_VCPNMXN_CY'],
                                                    grid: true,
                                                    title: 'Millions of MXN',
                                                    renderer: function(obj, value) {
                                                        return ' ' + Ext.util.Format.number((value), '0');
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        translationX: -30
                                                    }
                                                },
                                            ],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    xField: 'MES',
                                                    yField: 'INTERNATIONAL_VCPNMXN_LY',
                                                    colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: 'INTERNATIONAL_VCPNMXN_LY',
//                                                            display: 'insideEnd',
                                                        display: 'outside',
                                                        calloutLine: {
                                                            length: 10,
                                                            width: 0,
//                                                                color: '#FFFFFF',
                                                        },
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                },
                                                {
                                                    type: 'line',
                                                    stacked: true,
                                                    xField: 'MES',
                                                    yField: 'INTERNATIONAL_VCPNMXN_CY',
                                                    style: {
                                                        lineWidth: 2
                                                    },
                                                    marker: {
                                                        radius: 4,
                                                        lineWidth: 2
                                                    },
                                                    label: {
                                                        field: 'INTERNATIONAL_VCPNMXN_CY',
                                                        display: 'over',
                                                        renderer: function(value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return Ext.util.Format.number(value, '0')
                                                        }
                                                    },
                                                    markerConfig: {
                                                        radius: 4
                                                    },
                                                    highlight: {
                                                        fill: '#000',
                                                        radius: 5,
                                                        'stroke-width': 2,
                                                        stroke: '#fff'
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        style: 'background: #FFF',
                                                        height: 20,
                                                        showDelay: 0,
                                                        dismissDelay: 0,
                                                        hideDelay: 0,
                                                        renderer: function(toolTip, record, ctx) {
                                                            toolTip.setHtml(record.get('MES') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataFareDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataFareDetail',
                                    width: 605,
                                    height: 550,
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
                                                text: 'Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flight', dataIndex: 'DFLIGHT', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'TICKET', width: 100,
                                                listeners: {
                                                    click: 'gridData_VIEWTKT_clickHandler'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background-color:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-forecast-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Coupon', dataIndex: 'CUPON', width: 60
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'ZONA', width: 80
                                            },
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'NFLIGHT', width: 80
                                                    }
                                                ]
                                            },
                                            {text: 'Document<br>Type', dataIndex: 'TRNCU', width: 80, },
                                            {text: 'Value USD', dataIndex: 'VALOR', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataFareDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVALOR, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                },
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
                            width: 800,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 800,
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


