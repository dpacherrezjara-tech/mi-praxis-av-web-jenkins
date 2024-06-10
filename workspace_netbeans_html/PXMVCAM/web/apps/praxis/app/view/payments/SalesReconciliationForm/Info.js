Ext.define('Ext.Praxis.view.payments.SalesReconciliationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;'
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            border: false,
            width: '100%',
            autoScroll: true,
            overflowY: 'scroll',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-vskPrincipal',
                    border: false,
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxConsultas',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-vskMain',
                                    border: false,
                                    width: '100%',
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
                                                    width: 870,
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
                                                                        listeners: {
                                                                            click: 'gridDetCountry_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:center;";
                                                                            return 'Total';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MATCH',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_DIFF',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQDIFF, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPEND', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_PEND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALES', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Accounted',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIPE, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDebitsData',
                                            hidden: true,
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
                                                    id: prototype.id + '-gridDebitsData',
                                                    width: 1570,
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
                                                                text: 'Trans.',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                                        listeners: {
//                                                                            click: 'gridDetCountry_clickHandler_DEBITS'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return  value ;
                                                                        }
                                                                    }
                                                                ]
                                                            },
//                                                            {
//                                                                text: 'Settlement Reconciliation',
//                                                                columns: [
//                                                                    {
//                                                                        text: 'Match', menuDisabled: true,
//                                                                        columns: [
//                                                                            {
//                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                                listeners: {
//                                                                                    click: 'onGridDetCardSMain_DEBITS_MATCH'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                                                }
//                                                                            },
//                                                                            {
//                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 60, align: 'center', menuDisabled: true, //flex: 1
//                //                                                                listeners: {
//                //                                                                    click: 'onGridDetCardS'
//                //                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
//                                                                                    return value;
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
//                                                                                }
//                                                                            },
//                                                                            {
//                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                                listeners: {
//                                                                                    click: 'onGridDetCardSMain_DEBITS_MATCH_MANUAL'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
//                                                                                }
//                                                                            },
//                                                                            {
//                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100, align: 'center', menuDisabled: true, //flex: 1
////                                                                                listeners: {
////                                                                                    click: 'onGridDetCardSMain_DEBITS'
////                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
//                                                                                }
//                                                                            }
//                                                                        ]
//                                                                    },
//                                                                    {
//                                                                        text: 'Settlement', menuDisabled: true,
//                                                                        columns: [
//                                                                            {
//                                                                                text: 'w/o Sales', dataIndex: 'lngQPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
//                                                                                listeners: {
//                                                                                    click: 'onGridDetCardSMain_DEBITS_PEND'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
//                                                                                }
//                                                                            }
//                                                                        ]
//                                                                    },
//                                                                    {
//                                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100, align: 'center', menuDisabled: true,
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
//                                                                            return Ext.util.Format.number(value, '0,000');
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
//                                                                        }
//                                                                    },
//                                                                    
//                                                                ]
//                                                            },
                                                            {
                                                                text: 'Reconciliation By Refund',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCHRF', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MATCH_REFND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCHRF, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercentRF', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentRF, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUALRF', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MANUAL_REFND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUALRF, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFFRF', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_DIFF_REFND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQMANUALRF, '0,000');
//                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDRF', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_PEND_REFND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPENDRF, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALESRF', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALESRF, '0,000');
                                                                        }
                                                                    },

                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Chgbak',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCHCH', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MATCH_CHGBAK',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCHCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercentCH', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#FFFFFF;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentCH, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUALCH', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MANUAL_CHGBAK',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUALCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFFCH', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_DIFF_CHGBAK',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQMANUALCH, '0,000');
//                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Trans.',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDCH', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_PEND_CHGBAK',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#FFFFFF;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPENDCH, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALESCH', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALESCH, '0,000');
                                                                        }
                                                                    },

                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Acredit',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCHAC', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MATCH_ACREDIT',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCHAC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercentAC', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#A4E7EC;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercentAC, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUALAC', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MANUAL_ACREDIT',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUALAC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFFAC', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_DIFF_ACREDIT',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQMANUALAC, '0,000');
//                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Trans.',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPENDAC', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_PEND_ACREDIT',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#A4E7EC;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDebitsData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPENDAC, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALESAC', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALESAC, '0,000');
                                                                        }
                                                                    },

                                                                ]
                                                            },
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelGridDetCardByS_Debits',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            height: 'auto',
                                            width: 392,
                                            margin: '0 0 0 0 ',
                                            hidden: true,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataDetCardByS_Debits',
                                                    width: 392,
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
                                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                listeners: {
                                                                    click: 'gridDet_DEBITS_clickHandler'
                                                                }

                                                            },
                                                            {
                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-panelGridDetCardByS_Debits').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-panelGridDetCardByS_Debits').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelGridDataDetalle_DEBITS',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: false,
                                            height: 'auto',
                                            hidden: true,
                                            width: 1373,
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-labelTitle3_DEBITS',
                                                    labelAlign: 'center',
                                                    labelStyle: 'color:#231223',
                                                    align: 'center',
                                                    margin: '5 0 5 0',
                                                    hide: true
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataDetalle_DEBITS',
                                                    width: 1373,
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
                                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Doc. Type', dataIndex: 'descTDOC', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center', id: prototype.id + '-ColumnDateDetalle',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit Card',
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.',
                                                                        columns: [
                                                                            {
                                                                                text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;";
                                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                                    return value;
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Merchant',
                                                                columns: [
                                                                    {
                                                                        text: 'Number', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetalle_DEBITS').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Poliza',
                                                                columns: [
                                                                    {
                                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Date', dataIndex: 'FCONT', width: 80, align: 'center', menuDisabled: true,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Qty',
                                                                columns: [
                                                                    {
                                                                        text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                                        listeners: {
                                                                            click: 'onGridTicket'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle_DEBITS').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                sortable: false,
                                                                xtype: 'actioncolumn',
                                                                id: prototype.id + '-gridEdit_DEBITS',
                                                                width: 40,
                                                                text: 'View',
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-edit',
                                                                        tooltip: 'View',
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
                                            id: prototype.id + '-boxMainDataAcc',
                                            hidden: true,
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
                                                // <editor-fold defaultstate="collapsed" desc="gridDataAcc">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataAcc',
                                                    width: 870,
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
                                                                text: 'Accounting',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                                            metaData.style = "background-color:#d5f4d5;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return  value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPEND', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALES', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Accounted',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAcc').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIPE, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCountry',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetCountry">
//                                                {
//                                                    xtype: 'panel',
//                                                    width: 1250,
//                                                    bodyStyle: 'background: #ECECEC;',
//                                                    border: true,
//                                                    layout: 'hbox',
//                                                    defaults: {
//                                                        border: false
//                                                    },
//                                                    items: [
//                                                        {
//                                                            xtype: 'label',
//                                                            id: prototype.id + '-lblTitDetCountry',
//                                                            text: '',
//                                                            padding: '6 0',
//                                                            style: 'font-weight:bold;text-align:center;',
//                                                            width: 900
//                                                        },
//                                                    ]
//                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCountry',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1020,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Country',
                                                                columns: [
                                                                    {
                                                                        text: 'Code', width: 50, dataIndex: 'SCOUNTRY',
                                                                        listeners: {
                                                                            click: 'gridDetCard_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Name', width: 200, dataIndex: 'strDescCountry',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = 'text-align:left;background-color:#d5f4d5;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MATCH',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 70, align: 'center', menuDisabled: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '%</b>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000.00') + '%<b>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_MANUAL',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_DIFF',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPEND', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_PEND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALES', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Accounted',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIPE, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                                        //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCard',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetCard">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCard',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 950,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Credit Card', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', width: 50, dataIndex: 'SCARCOD',
                                                                        listeners: {
                                                                            click: 'gridDetDay_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Description', width: 200, dataIndex: 'strDescCard',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = 'text-align:left;background-color:#d5f4d5;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetDayS_clickHandler_MATCH',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetDayS_clickHandler_MANUAL',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetCountry_clickHandler_DIFF',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPEND', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetDayS_clickHandler_PEND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALES', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Accounted',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIPE, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetDay',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetDay">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetDay',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 790,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Sales', flex: 1,
                                                                id: prototype.id + '-label_13',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Day', width: 90, dataIndex: 'SDATE',
                                                                        listeners: {
                                                                            click: 'gridDetTicket_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Reconciliation By Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Match',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetTicketS_clickHandler_MATCH',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetTicketS_clickHandler_MANUAL',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
//                                                                                listeners: {
//                                                                                    click: 'gridDetTicketS_clickHandler_DIFF',
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'w/o Sett.', dataIndex: 'lngQPEND', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetTicketS_clickHandler_PEND',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Tkt', dataIndex: 'lngQSALES', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5;";
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            return  value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Accounted',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Processed', dataIndex: 'lngQPOLIC', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIC, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPOLIPE', width: 100,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#b6d8ee;";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPOLIPE, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxByCashMonth',
                                            hidden: true,
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
                                                // <editor-fold defaultstate="collapsed" desc="gridDetCashMonth">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCashMonth',
                                                    width: 820,
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
                                                                text: 'Sales', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', flex: 1, //width: 120
                                                                        listeners: {
                                                                            click: 'gridCashDetCountry_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Currency', dataIndex: 'SCURRENC', width: 52
                                                            },
                                                            {
                                                                text: 'Sale',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Cash Amount', dataIndex: 'SVFOPUSD', width: 114,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCashMonth').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totSVFOPUSD, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Credit Card Payment',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Paying', dataIndex: 'CPSVFOPUSD', width: 114,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                                    return win.formatLngNumber(value);
                                                                                },
                                                                                //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                //                                                                                    metaData.style = "text-align:right;";
                                                                                //                                                                                    var data = Ext.getCmp(prototype.id+'-gridDetCashMonth').getStore().getData().items[0].data;
                                                                                //                                                                                    return Ext.util.Format.number(data.totSVFOPUSD, '0,000');
                                                                                //                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Refund',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Cash Amount', dataIndex: 'SVFOPUSDRF', width: 114,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCashMonth').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totSVFOPUSDRF, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Credit Card Payment',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Paying', dataIndex: 'CPSVFOPUSDRF', width: 114,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                                    return win.formatLngNumber(value);
                                                                                },
                                                                                //                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                //                                                                                    metaData.style = "text-align:right;";
                                                                                //                                                                                    var data = Ext.getCmp(prototype.id+'-gridDetCashMonth').getStore().getData().items[0].data;
                                                                                //                                                                                    return Ext.util.Format.number(data.totSVFOPUSD, '0,000');
                                                                                //                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Pending',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Sale', dataIndex: 'CWSVFOPUSD', width: 114,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        //                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                        //                                                                            metaData.style = "text-align:right;";
                                                                        //                                                                            var data = Ext.getCmp(prototype.id+'-gridDetCashMonth').getStore().getData().items[0].data;
                                                                        //                                                                            return Ext.util.Format.number(data.totSVFOPUSDRF, '0,000');
                                                                        //                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Refund', dataIndex: 'CWSVFOPUSDRF', width: 114,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        //                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                        //                                                                            metaData.style = "text-align:right;";
                                                                        //                                                                            var data = Ext.getCmp(prototype.id+'-gridDetCashMonth').getStore().getData().items[0].data;
                                                                        //                                                                            return Ext.util.Format.number(data.totSVFOPUSDRF, '0,000');
                                                                        //                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxByCashCountry',
                                            hidden: true,
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
                                                // <editor-fold defaultstate="collapsed" desc="gridDetCashCountry">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCashCountry',
                                                    width: 900,
                                                    titleAlign: 'center',
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
                                                                text: 'Country', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 50,
                                                                        listeners: {
                                                                            click: 'gridCashDetDay_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Name', dataIndex: 'strDescCountry', flex: 1, //width: 200,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = "text-align:left;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Local',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 90
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Sale',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOP', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return win.formatLngNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount USD', dataIndex: 'SVFOPUSD', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCashCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totSVFOPUSD, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Refund',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOPRF', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                            return win.formatLngNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount USD', dataIndex: 'SVFOPUSDRF', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCashCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totSVFOPUSDRF, '0,000');
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
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxByCashDay',
                                            hidden: true,
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
                                                // <editor-fold defaultstate="collapsed" desc="gridDetCashDay">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCashDay',
                                                    width: 680,
                                                    titleAlign: 'center',
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
                                                                text: 'Sale', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strDescripcion', flex: 1//width: 120,
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Sale',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOP', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return win.formatLngNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount USD', dataIndex: 'SVFOPUSD', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCashDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totSVFOPUSD, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Refund',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOPRF', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                            return win.formatLngNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount USD', dataIndex: 'SVFOPUSDRF', width: 150,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#FFF8DC;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCashDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.totSVFOPUSDRF, '0,000');
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
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetByPNR',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetByPNR">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetByPNR',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1325,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    /*features: [{
                                                     ftype: 'summary'
                                                     }],*/
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Sale <br> Date', dataIndex: 'SDATE', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Ticket', dataIndex: 'TICKET', width: 120,
                                                                listeners: {
                                                                    click: 'viewMasterTkt2'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "background-color:#d5f4d5;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit Card',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', dataIndex: 'SCARDN', width: 140,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'TDOC', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Seq', dataIndex: 'SEQ', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'STVAL', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Agent <br> Code', dataIndex: 'SAGENT', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'TVENTA', dataIndex: 'TVENTA', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Payment', dataIndex: 'SPAYMENT', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale <br> Amount MXN', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale <br> Amount USD', dataIndex: 'SVFOPUSD', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetTicket',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetTicket">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetTicket',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1305,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', width: 120, dataIndex: 'strTicket',
                                                                        listeners: {
                                                                            click: 'viewMasterTkt3'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "background-color:#d5f4d5;";
                                                                            value = '<b>' + value + '</b>';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'strPEM', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'STVAL', width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:left;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'CERROR', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.CERROR + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 35,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                id: prototype.id + '-hcDetTkt',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'SDATE', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Country',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SCOUNTRY + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', width: 130, dataIndex: 'strSCARDN',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                                        text: 'Code', dataIndex: 'SAGENT', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Transaction',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'TRNCU', width: 55,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    return value;
                                                                }
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
                                                                        text: 'Status', dataIndex: 'BSTVAL', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
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
                                                                        text: 'Status', dataIndex: 'strFlagStat', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'View', dataIndex: '', width: 40,
                                                                listeners: {
                                                                    click: 'viewDataEntry_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdAttr = 'data-qtip="View"';
                                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetTicket_DEBITS',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetTicket">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetTicket_DEBITS',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1305,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Ticket',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', width: 120, dataIndex: 'strTicket',
                                                                        listeners: {
                                                                            click: 'viewMasterTkt3'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "background-color:#d5f4d5;";
                                                                            value = '<b>' + value + '</b>';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'strPEM', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'STVAL', width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:left;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'CERROR', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.CERROR + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 35,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                id: prototype.id + '-hcDetTkt_DEBITS',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'SDATE', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Country',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SCOUNTRY + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', width: 130, dataIndex: 'strSCARDN',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                                        text: 'Code', dataIndex: 'SAGENT', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Transaction',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'TRNCU', width: 55,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    return value;
                                                                }
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
                                                                        text: 'Status', dataIndex: 'BSTVAL', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
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
                                                                        text: 'Status', dataIndex: 'strFlagStat', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'View', dataIndex: '', width: 40,
                                                                listeners: {
                                                                    click: 'viewDataEntry_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdAttr = 'data-qtip="View"';
                                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCountryS',
                                            hidden: true,
//                                            width: '100%',
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
                                                {
                                                    xtype: 'panel',
                                                    //                                                    width: '100%',
                                                    bodyStyle: 'background: transparent;',
                                                    border: false,
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCountryS">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetCountryS',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 530,
                                                            minHeight: 200,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Country', flex: 1,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                                                listeners: {
                                                                                    click: 'gridDetCardS_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Name', dataIndex: 'strDescCountry', flex: 1, //width: 200,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                                    return value;
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryS').getStore().getData().items[0].data;
                                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_10',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        //</editor-fold>
                                                        {xtype: 'tbspacer', width: 30},
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCSE">
                                                        {
                                                            xtype: 'grid',
                                                            title: ' Errors',
                                                            hidden: true,
                                                            id: prototype.id + '-gridDetCSE',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 345,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: '',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Error', dataIndex: 'strDescripcion', width: 250, id: prototype.id + '-verQuery', hidden: true,
                                                                                listeners: {
                                                                                    click: 'openQuery'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;color:#057ECB;font-weight:bold;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Error', dataIndex: 'strDescripcion', width: 250, id: prototype.id + '-noQuery', hidden: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 80, id: prototype.id + '-con', hidden: true,
                                                                                listeners: {
                                                                                    click: 'gridDetCountrySEr_clickHandler',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;font-weight:bold;";
                                                                                    value = win.formatLngNumber(value);
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var items = Ext.getCmp(prototype.id + '-gridDetCSE').getStore().getData().items;
                                                                                    var cant = 0;
                                                                                    for (var i = 0; i < items.length; i++)
                                                                                        cant += items[0].data.lngQACCB;
                                                                                    return win.formatLngNumber(cant);
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 80, id: prototype.id + '-sin', hidden: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatLngNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var items = Ext.getCmp(prototype.id + '-gridDetCSE').getStore().getData().items;
                                                                                    var cant = 0;
                                                                                    for (var i = 0; i < items.length; i++)
                                                                                        cant += items[0].data.lngQACCB;
                                                                                    console.log(cant);
                                                                                    return win.formatLngNumber(cant);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                        //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCountryS_REFND',
                                            hidden: true,
//                                            width: '100%',
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
                                                {
                                                    xtype: 'panel',
                                                    //                                                    width: '100%',
                                                    bodyStyle: 'background: transparent;',
                                                    border: false,
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCountryS">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetCountryS_REFND',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 530,
                                                            minHeight: 200,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                        listeners: {
                                                                            click: 'gridDet_REFND_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country', flex: 1,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                                                listeners: {
                                                                                    click: 'gridDet_REFND_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Name', dataIndex: 'strDescCountry', flex: 1, //width: 200,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                                    return value;
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryS_REFND').getStore().getData().items[0].data;
                                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                                        }
                                                                    },
                                                                    
                                                                    {
                                                                        text: 'Refund',
                                                                        id: prototype.id + '-label_10_REFND',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                                //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCountryS_CHGBAK',
                                            hidden: true,
//                                            width: '100%',
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
                                                {
                                                    xtype: 'panel',
                                                    //                                                    width: '100%',
                                                    bodyStyle: 'background: transparent;',
                                                    border: false,
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCountryS">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetCountryS_CHGBAK',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 530,
                                                            minHeight: 200,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                        listeners: {
                                                                            click: 'gridDet_CHGBAK_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country', flex: 1,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                                                listeners: {
                                                                                    click: 'gridDet_CHGBAK_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Name', dataIndex: 'strDescCountry', flex: 1, //width: 200,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                                    return value;
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryS_CHGBAK').getStore().getData().items[0].data;
                                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                                        }
                                                                    },
                                                                    
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_10_CHGBAK',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                                //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCountryS_ACREDIT',
                                            hidden: true,
//                                            width: '100%',
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
                                                {
                                                    xtype: 'panel',
                                                    //                                                    width: '100%',
                                                    bodyStyle: 'background: transparent;',
                                                    border: false,
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCountryS">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetCountryS_ACREDIT',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 530,
                                                            minHeight: 200,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                        listeners: {
                                                                            click: 'gridDet_ACREDIT_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                            metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Country', flex: 1,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                                                listeners: {
                                                                                    click: 'gridDet_ACREDIT_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Name', dataIndex: 'strDescCountry', flex: 1, //width: 200,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                                    return value;
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryS_ACREDIT').getStore().getData().items[0].data;
                                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                                        }
                                                                    },
                                                                    
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_10_ACREDIT',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                                //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCardS',
                                            hidden: true,
//                                            width: 660,
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
                                                {
                                                    xtype: 'panel',
//                                                    width: '100%',
                                                    bodyStyle: 'background: transparent;',
                                                    border: false,
                                                    layout: 'hbox',
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCardS">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetCardS',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 630,
                                                            minHeight: 200,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Credit Card', flex: 1,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Code', dataIndex: 'SCARCOD', width: 60,
                                                                                listeners: {
                                                                                    click: 'gridDetDayS_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Description', dataIndex: 'strDescCard', width: 300, //flex: 1, 
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                                    return value;
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCardS').getStore().getData().items[0].data;
                                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_11',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatDblNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardS').getStore().getData().items[0].data;
                                                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardS').getStore().getData().items[0].data;
                                                                                    return win.formatDblNumber(data.dblTotAVFOP);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        //</editor-fold>
                                                        {xtype: 'tbspacer', width: 30},
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetCCSE">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetCCSE',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 295,
                                                            hidden: true,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: '',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Error', dataIndex: 'strDescripcion', width: 200,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 80, id: prototype.id + '-con1', hidden: true,
                                                                                listeners: {
                                                                                    click: 'gridDetCountrySEr2_clickHandler',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;font-weight:bold;";
                                                                                    value = win.formatLngNumber(value);
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var items = Ext.getCmp(prototype.id + '-gridDetCCSE').getStore().getData().items;
                                                                                    var cant = 0;
                                                                                    for (var i = 0; i < items.length; i++)
                                                                                        cant += items[0].data.lngQACCB;
                                                                                    return win.formatLngNumber(cant);
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 80, id: prototype.id + '-sin1', hidden: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatLngNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var items = Ext.getCmp(prototype.id + '-gridDetCCSE').getStore().getData().items;
                                                                                    var cant = 0;
                                                                                    for (var i = 0; i < items.length; i++)
                                                                                        cant += items[0].data.lngQACCB;
                                                                                    return win.formatLngNumber(cant);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                        //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetDayS',
                                            hidden: true,
//                                            width: '100%',
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
                                                {
                                                    xtype: 'panel',
//                                                    width: 800,
                                                    bodyStyle: 'background: transparent;',
                                                    border: false,
                                                    layout: 'hbox',
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetDayS">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetDayS',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 360,
                                                            minHeight: 200,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_14',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Day', dataIndex: 'SDATE', width: 90,
                                                                                listeners: {
                                                                                    click: 'gridDetTicketS_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatLngNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDayS').getStore().getData().items[0].data;
                                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_12',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatDblNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayS').getStore().getData().items[0].data;
                                                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        hidden: true,
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayS').getStore().getData().items[0].data;
                                                                                    return win.formatDblNumber(data.dblTotAVFOP);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        //</editor-fold>
                                                        {xtype: 'tbspacer', width: 30},
                                                        //<editor-fold defaultstate="collapsed" desc="gridDetDSE">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridDetDSE',
                                                            bodyStyle: 'background: transparent;',
                                                            width: 280,
                                                            hidden: true,
                                                            titleAlign: 'center',
                                                            columnLines: true,
                                                            enableColumnMove: false,
                                                            features: [{
                                                                    ftype: 'summary'
                                                                }],
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: '',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Error', dataIndex: 'strDescripcion', width: 200,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var data = record.data;
                                                                                    metaData.style = "text-align:left;";
                                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return win.formatLngNumber(value);
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var items = Ext.getCmp(prototype.id + '-gridDetDSE').getStore().getData().items;
                                                                                    var cant = 0;
                                                                                    for (var i = 0; i < items.length; i++)
                                                                                        cant += items[0].data.lngQACCB;
                                                                                    return win.formatLngNumber(cant);
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                        //</editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetTktS',
                                            hidden: true,
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
                                                {
                                                    xtype: 'panel',
                                                    width: 1250,
                                                    bodyStyle: 'background: #ECECEC;',
                                                    border: true,
                                                    hidden: true,
                                                    layout: 'hbox',
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTitDetTktByStval',
                                                            text: '',
                                                            padding: '6 0',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 900
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Error:',
                                                            padding: '6 0',
                                                            style: 'text-align:left;',
                                                            width: 74
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbError',
                                                            queryMode: 'local',
                                                            allowBlank: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 100,
                                                            typeAhead: true,
                                                            valueField: 'code', displayField: 'name',
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '4 0',
                                                            listeners: {
                                                                change: 'cbxError_changeHandler',
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'image',
                                                            id: prototype.id + '-imgSearchEM',
                                                            src: 'resources/img/botones/search.png',
                                                            mode: 'image',
                                                            padding: '6 0',
                                                            listeners: {
                                                                afterrender: function (c) {
                                                                    Ext.create('Ext.tip.ToolTip', {
                                                                        target: c.getEl(),
                                                                        html: 'Search'
                                                                    });
                                                                },
                                                                el: {
                                                                    click: 'cbxError_changeHandler',
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                //<editor-fold defaultstate="collapsed" desc="gridDetTktByStval">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetTktByStval',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1505,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    plugins: {
                                                        ptype: 'cellediting',
                                                        clicksToEdit: 1
                                                    },
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Ticket', flex: 1,
                                                                id: prototype.id + '-columnTkt_DETALLE',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', flex: 1, /*width: 120,*/ dataIndex: 'strTicket', //enableTextSelection :true,
                                                                        listeners: {
                                                                            click: 'gridData_act1_clickHandler'
                                                                        },
//                                                                        editor: {
//                                                                            xtype: 'textfield',
//                                                                            editable: true,
//                                                                            enableKeyEvents: true,
//                                                                            listeners: {
//                                                                                keypress: 'eventKeyTKT',
//                                                                                specialkey: 'eventKeyTKT'
//                                                                            }
//                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'strPEM', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Deb.Type', dataIndex: 'TYPE', width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: 'Error',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'CERROR', width: 155,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.CERROR + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 32,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales',
                                                                id: prototype.id + '-hcDetTktS',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Country',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Number', width: 150, dataIndex: 'strSCARDN',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 105,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Transaction',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'TRNCU', width: 55
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
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
                                                                        text: 'Status', dataIndex: 'STVAL', width: 135,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
//                                                            {
//                                                                text: 'View', dataIndex: '', width: 40,
//                                                                listeners: {
//                                                                    click: 'viewDataEntry_clickHandler'
//                                                                },
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    var data = record.data;
//                                                                    metaData.tdAttr = 'data-qtip="' + (Number(data.lngQOBS) > 1 ? 'View' : 'View') + '"';
//                                                                    var src = Number(data.lngQOBS) > 1 ? 'resources/img/botones/16x16/warning.png' : 'resources/img/botones/16x16/Change.png';
//                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'View', dataIndex: '', width: 40,
                                                                listeners: {
                                                                    click: 'viewDataEntry_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdAttr = 'data-qtip="View"';
                                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
                                                                }
                                                            }
                                                        ]
                                                    },
//                                                    viewConfig: {
//                                                        stripeRows: true,
//                                                        enableTextSelection: true,
//                                                        markDirty: false,
//                                                        getRowClass: function (record, rowIndex, rowParams, store) {
//                                                            if (rowIndex % 2 === 0)
//                                                                return 'rowA';
//                                                        }
//                                                    },
//                                                    trackMouseOver: true,
//                                                    scope: this,
//                                                    listeners: {
//                                                        scope: this,
//                                                        afterrender: function (obj) {
//
//                                                        }
//                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetTktS_DEBITS',
                                            hidden: true,
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
                                                {
                                                    xtype: 'panel',
                                                    width: 1250,
                                                    bodyStyle: 'background: #ECECEC;',
                                                    border: true,
                                                    hidden: true,
                                                    layout: 'hbox',
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblTitDetTktByStval_DEBITS',
                                                            text: '',
                                                            padding: '6 0',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 900
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Error:',
                                                            padding: '6 0',
                                                            style: 'text-align:left;',
                                                            width: 74
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbError_DEBITS',
                                                            queryMode: 'local',
                                                            allowBlank: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 100,
                                                            typeAhead: true,
                                                            valueField: 'code', displayField: 'name',
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            padding: '4 0',
                                                            listeners: {
                                                                change: 'cbxError_changeHandler',
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'image',
                                                            id: prototype.id + '-imgSearchEM_DEBITS',
                                                            src: 'resources/img/botones/search.png',
                                                            mode: 'image',
                                                            padding: '6 0',
                                                            listeners: {
                                                                afterrender: function (c) {
                                                                    Ext.create('Ext.tip.ToolTip', {
                                                                        target: c.getEl(),
                                                                        html: 'Search'
                                                                    });
                                                                },
                                                                el: {
                                                                    click: 'cbxError_changeHandler',
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                //<editor-fold defaultstate="collapsed" desc="gridDetTktByStval">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetTktByStval_DEBITS',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1030,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    plugins: {
                                                        ptype: 'cellediting',
                                                        clicksToEdit: 1
                                                    },
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Ticket', flex: 1,
                                                                id: prototype.id + '-columnTkt_debits',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
                                                                        listeners: {
//                                                                            click: 'gridData_act1_clickHandler'
                                                                        },
//                                                                        editor: {
//                                                                            xtype: 'textfield',
//                                                                            editable: true,
//                                                                            enableKeyEvents: true,
//                                                                            listeners: {
//                                                                                keypress: 'eventKeyTKT',
//                                                                                specialkey: 'eventKeyTKT'
//                                                                            }
//                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return  value ;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'strPEM', width: 90,hidden:true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error',hidden:true,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'CERROR', width: 155, 
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:left;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.CERROR + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 32, hidden:true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Process',
                                                                id: prototype.id + '-hcDetTktS_DEBITS',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Country',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Number', width: 150, dataIndex: 'strSCARDN',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 105,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
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
                                                                        text: 'Status', dataIndex: 'STVAL', width: 135,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
//                                                            {
//                                                                text: 'View', dataIndex: '', width: 40,
//                                                                listeners: {
//                                                                    click: 'viewDataEntry_clickHandler'
//                                                                },
//                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    var data = record.data;
//                                                                    metaData.tdAttr = 'data-qtip="' + (Number(data.lngQOBS) > 1 ? 'View' : 'View') + '"';
//                                                                    var src = Number(data.lngQOBS) > 1 ? 'resources/img/botones/16x16/warning.png' : 'resources/img/botones/16x16/Change.png';
//                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
//                                                                }
//                                                            },
                                                            {
                                                                text: 'View', dataIndex: '', width: 40,
                                                                listeners: {
                                                                    click: 'viewDataEntry_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdAttr = 'data-qtip="View"';
                                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
                                                                }
                                                            }
                                                        ]
                                                    },
//                                                    viewConfig: {
//                                                        stripeRows: true,
//                                                        enableTextSelection: true,
//                                                        markDirty: false,
//                                                        getRowClass: function (record, rowIndex, rowParams, store) {
//                                                            if (rowIndex % 2 === 0)
//                                                                return 'rowA';
//                                                        }
//                                                    },
//                                                    trackMouseOver: true,
//                                                    scope: this,
//                                                    listeners: {
//                                                        scope: this,
//                                                        afterrender: function (obj) {
//
//                                                        }
//                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetTktMatch',
                                            hidden: true,
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetTktMatch">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetTktMatch',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1260,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
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
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Ticket', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', flex: 1, /*width: 120,*/ dataIndex: 'strTicket', //enableTextSelection :true,
                                                                        listeners: {
                                                                            click: 'gridData_act1_clickHandler'
                                                                        },
//                                                                        editor: {
//                                                                            xtype: 'textfield',
//                                                                            editable: true,
//                                                                            enableKeyEvents: true,
//                                                                            listeners: {
//                                                                                keypress: 'eventKeyTKT',
//                                                                                specialkey: 'eventKeyTKT'
//                                                                            }
//                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strTicket + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'STVAL', width: 130,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 35,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                    return value;
                                                                }
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Number', width: 140, dataIndex: 'strSCARDN',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = 'text-align:center;color:' + color + ';background-color:#b2e1ff;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 95,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return win.formatDblNumber(value);
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetTktMatch').getStore().getData().items[0].data;
                                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Invoice',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', dataIndex: 'SINVN', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.SINVN + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Bank Payment',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'BDATEP', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.BDATEP + '"';
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Status', dataIndex: 'BSTVAL', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Transaction',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'TRNCU', width: 75
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
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
                                                                        text: 'Status', dataIndex: 'strFlagStat', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'View', dataIndex: '', width: 40,
                                                                listeners: {
                                                                    click: 'viewDataEntry_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdAttr = 'data-qtip="View"';
                                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#payments-sales-reconciliation-form"><img src="' + src + '"></a>';
                                                                }
                                                            }
                                                        ]
                                                    },
//                                                    viewConfig: {
//                                                        stripeRows: true,
//                                                        enableTextSelection: true,
//                                                        markDirty: false,
//                                                        getRowClass: function (record, rowIndex, rowParams, store) {
//                                                            if (rowIndex % 2 === 0)
//                                                                return 'rowA';
//                                                        }
//                                                    },
//                                                    trackMouseOver: true,
//                                                    scope: this,
//                                                    listeners: {
//                                                        scope: this,
//                                                        afterrender: function (obj) {
//
//                                                        }
//                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetBySAGENT',
                                            hidden: true,
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

                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetBySAGENT',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1325,
                                                    titleAlign: 'center',
                                                    columnLines: true,
                                                    enableColumnMove: false,
                                                    /*features: [{
                                                     ftype: 'summary'
                                                     }],*/
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Sale <br> Date', dataIndex: 'SDATE', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Ticket', dataIndex: 'TICKET', width: 120,
                                                                listeners: {
                                                                    click: 'viewMasterTkt2'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "background-color:#d5f4d5;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-sales-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit Card',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', dataIndex: 'SCARDN', width: 140,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'TDOC', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Seq', dataIndex: 'SEQ', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'STVAL', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Agent <br> Code', dataIndex: 'SAGENT', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'TVENTA', dataIndex: 'TVENTA', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Payment', dataIndex: 'SPAYMENT', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale <br> Amount MXN', dataIndex: 'SVFOP', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale <br> Amount USD', dataIndex: 'SVFOPUSD', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxPagDetail',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            height: '100%',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                margin: '3px 0px 0px 5px'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lblPagActual',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lblPagTotal',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 40},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lblRowsTotal',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                    ]
                }
            ]
        }
    ]
});

