//valor = '0';
Ext.define('Ext.Praxis.view.payments.CashForm.Info', {
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
                width: 1500,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            hidden: false,
                            width: '100%',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 700,
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
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
//                                                        listeners: {
//                                                            click: 'gridDetCountry_clickHandler'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return value    ;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:center;";
                                                            return 'Total';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    
                                                    {
                                                                text: 'ARC', dataIndex: 'lngARC', width: 100,
                                                                listeners: {
                                                                    click: 'bankAssignmentARC',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQARC, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'BSP', dataIndex: 'lngBSP', width: 100,
                                                                listeners: {
                                                                    click: 'bankAssignmentBSP',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQBSP, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Venta directa', dataIndex: 'lngVentaDirecta', width: 100,
                                                                listeners: {
                                                                    click: 'bankAssignmentVenta',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQVentaDirecta, '0,000');
                                                                }
                                                            }
                                                            
                                                    
                                                  
                                                ]
                                            },
                                            {
                                                text: 'Conciliacion CASH',
                                                style: 'background-color:#BAB5AD;font-weight:bold;',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                    style: 'background-color:#BAB5AD;font-weight:bold;', // 👈 AQUÍ
                                                },
                                                columns: [
                                                    
                                                    {
                                                                text: 'ARC', dataIndex: 'lngArcConc', width: 100,
                                                                listeners: {
                                                                    click: 'gridDetailMore',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQARCConc, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'BSP', dataIndex: 'lngBspConc', width: 100,
                                                                listeners: {
                                                                    click: 'gridDetailMore',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQBSPConc, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Venta Directa', dataIndex: 'lngVentaDirectaConc', width: 100,
                                                                listeners: {
                                                                    click: 'gridDetailMore',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTotQVentaDirectaConc, '0,000');
                                                                }
                                                            }
                                                            
                                                            
                                                    
                                                  
                                                ]
                                            },
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDetailDate',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetailDate',
                            hidden: false,
                            width: '100%',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailDate',
                                    width: 620,
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
                                                        text: 'Payday', dataIndex: 'strFormatDate', width: 100,
//                                                        listeners: {
//                                                            click: 'gridDetCountry_clickHandler'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:center;";
                                                            return 'Total';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pending Payments',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    
                                                    {
                                                                text: '(0 - 10) days', dataIndex: 'lng0_10', width: 100,
                                                                listeners: {
                                                                    click: 'bankReportDay',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDate').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot0_10, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '(11 - 20) days', dataIndex: 'lng11_20', width: 100,
                                                                listeners: {
                                                                    click: 'bankReportDay',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDate').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot11_20, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '(20 - 31) days', dataIndex: 'lng21_30', width: 100,
                                                                listeners: {
                                                                   click: 'bankReportDay',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDate').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot21_30, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '(31 - 40) days', dataIndex: 'lng31_40', width: 100,
                                                                listeners: {
                                                                   click: 'bankReportDay',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDate').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot31_40, '0,000');
                                                                }
                                                            },{
                                                            
                                                                text: '40 days or more', dataIndex: 'lng41_MAS', width: 120,
                                                                listeners: {
                                                                    click: 'bankReportDay',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDate').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot41_mas, '0,000');
                                                                }
                                                            }
                                                            
                                                    
                                                  
                                                ]
                                            }
                                            
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDetailDay',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDetailDay',
                            hidden: false,
                            width: '100%',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailDay',
                                    width: 620,
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
                                                        text: 'Payday', dataIndex: 'strFormatDate', width: 100,
//                                                        listeners: {
//                                                            click: 'gridDetCountry_clickHandler'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:center;";
                                                            return 'Total';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pending Payments',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    
                                                    {
                                                                text: '(0 - 10) days', dataIndex: 'lng0_10', width: 100,
//                                                                listeners: {
                                                                    click: 'searchDetDay',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot0_10, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '(11 - 20) days', dataIndex: 'lng11_20', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot11_20, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '(20 - 31) days', dataIndex: 'lng21_30', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot21_30, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: '(31 - 40) days', dataIndex: 'lng31_40', width: 100,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot31_40, '0,000');
                                                                }
                                                            },{
                                                            
                                                                text: '40 days or more', dataIndex: 'lng41_MAS', width: 120,
//                                                                listeners: {
//                                                                    click: 'gridDetCountry_clickHandler_MATCH',
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-cash-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailDay').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.lngTot41_mas, '0,000');
                                                                }
                                                            }
                                                            
                                                    
                                                  
                                                ]
                                            }
                                            
                                        ]
                                    }
                                }
                                // </editor-fold>
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
        },
        
    ]
}
);


