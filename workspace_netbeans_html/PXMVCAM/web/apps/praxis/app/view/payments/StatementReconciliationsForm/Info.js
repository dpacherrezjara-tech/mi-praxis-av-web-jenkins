    Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;border: none;',
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1500,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1284,
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
                                                text: 'Payment',
                                                id: prototype.id + '-htDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetBank'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Statement Reconciliation',
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
                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#c0e0fc";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQMATCHPercent', width: 70, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c0e0fc";
                                                                    var newValue = value / 100;
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '%</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#c0e0fc";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Statement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Settlement', dataIndex: 'lngQPEND', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#c0e0fc";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngTOTALE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTOTALE, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Other', dataIndex: 'lngQPEND1', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;color:#057ECB;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQPEND1, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQSALES', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQTMATCH', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetProceLIQByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'lngQTMATCHPercent', width: 70, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '%</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTMATCHPercent, '0,000') + '%<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQTMANUAL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetProceLIQByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTMANUAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQTPEND', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetProceLIQByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        id: prototype.id + '-editActionDELiqDetail',
                                                        width: 40,
                                                        text: 'View',
                                                        align: 'center',

                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-eye',
                                                                tooltip: 'View',
                                                                handler: 'onViewClickLiqDetail',
//                                                                style: 'background-color:#d5f4d5;',
                                                                bodyStyle: 'background-color: #d5f4d5;',

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngTOTALL', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTOTALL, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        
                        ///////////////// CASHH
                        
                        
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataCash',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1248 ,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCash',
                                    width: 1248,
                                    columnLines: true,
                                    features: [{ ftype: 'summary' }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Payment',
                                                id: prototype.id + '-htDate',
                                                columns: [
                                                    {
                                                        text: 'Date',
                                                        dataIndex: 'strFormatDate',
                                                        width: 100,
                                                        listeners: { click: 'onGridDetLiquidaCash' },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "color:#057ECB;";
                                                            return '<a href="#payments-statement-reconciliations-form" ' +
                                                                   'style="color:#057ECB;text-decoration:underline;"><b>' + value + '</b></a>';
                                                        },
                                                        summaryRenderer: function () {
                                                            return '<b>Total</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            // ===================== BANK STATEMENT =====================
                                            {
                                                text: 'Bank Statement Reconciliation',
                                                columns: [

                                                    // ---- Match ----
                                                    {
                                                        text: 'Match',
                                                        columns: [
                                                            {
                                                                text: 'Automatic',
                                                                dataIndex: 'lngQMATCH',
                                                                width: 100,
                                                                listeners: { click: 'onGridDetLiquidaCash' },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#c0e0fc";
                                                                    return '<a href="#payments-statement-reconciliations-form" ' +
                                                                           'style="color:#057ECB;text-decoration:underline;"><b>' +
                                                                           Ext.util.Format.number(value, '0,000') + '</b></a>';
                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '</b></div>';
                                                                }   
                                                            },
                                                            {
                                                                text: '%',
                                                                dataIndex: 'lngQMATCHPercent',
                                                                width: 70,
                                                                align: 'center',
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;background-color:#c0e0fc";
                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '%</b>';
                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQMATCHPercent, '0,000') + '</b></div>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual',
                                                                dataIndex: 'lngQMANUAL',
                                                                width: 100,
                                                                listeners: { click: 'onGridDetLiquidaCash' },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#c0e0fc";
                                                                    return '<a href="#payments-statement-reconciliations-form" ' +
                                                                           'style="color:#057ECB;text-decoration:underline;"><b>' +
                                                                           Ext.util.Format.number(value, '0,000') + '</b></a>';
                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '</b></div>';
                                                                }
                                                            }
                                                        ]
                                                    },

                                                    // ---- Statement ----
                                                    {
                                                        text: 'Statement',
                                                        columns: [
                                                            {
                                                                text: 'w/o Settlement',
                                                                dataIndex: 'lngQPEND',
                                                                width: 100,
                                                                listeners: { click: 'onGridDetLiquidaCash' },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#c0e0fc";
                                                                    return '<a href="#payments-statement-reconciliations-form" ' +
                                                                           'style="color:#008FE3;text-decoration:underline;"><b>' +
                                                                           Ext.util.Format.number(value, '0,000') + '</b></a>';
                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '</b></div>';
                                                                }
                                                            }
                                                        ]
                                                    },

                                                    // ---- Total ----
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'lngTOTALE',
                                                        width: 100,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function () {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                          .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotTOTALE, '0,000') + '</b></div>';
                                                        }
                                                    }
                                                ]
                                            },

                                            // ===================== SETTLEMENT =====================
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [

                                                    // ---- Match ----
                                                    {
                                                        text: 'Match',
                                                        columns: [
                                                            {
                                                                text: 'Auto',
                                                                dataIndex: 'lngQTMATCH',
                                                                width: 100,
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');  

                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQTMATCH, '0,000') + '</b></div>';
                                                                }
                                                            },
                                                            {
                                                                text: '%',
                                                                dataIndex: 'lngQTMATCHPercent',
                                                                width: 70,
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQTMATCHPercent, '0,000') + '</b></div>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual',
                                                                dataIndex: 'lngQTMANUAL',
                                                                width: 100,
//                                                                listeners: { click: 'onGridDetProceLIQByS' },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');

                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQTMANUAL, '0,000') + '</b></div>';
                                                                }
                                                            }
                                                        ]
                                                    },

                                                    // ---- Settlement ----
                                                    {
                                                        text: 'Settlement',
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales',
                                                                dataIndex: 'lngQTPEND',
                                                                width: 100,
//                                                                listeners: { click: 'onGridDetProceLIQByS' },
                                                                renderer: function (value, metaData) {
                                                                    metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');

                                                                },
                                                                summaryRenderer: function () {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                                  .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQTPEND, '0,000') + '</b></div>';
                                                                }
                                                            }
                                                        ]
                                                    },

                                                    // ---- Total ----
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'lngQSALES',
                                                        width: 100,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');

                                                        },
                                                        summaryRenderer: function () {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                          .getStore().getData().items[0].data;
                                                                        return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQSALES, '0,000') + '</b></div>';
                                                        }
                                                    },

                                                    // ---- Sales Direct ----
                                                    {
                                                        text: 'Sales <br> Direct',
                                                        dataIndex: 'lngQSALESDIRECT',
                                                        width: 100,
//                                                        listeners: { click: 'onGridDetSalesDirect' },
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');

                                                        },
                                                        summaryRenderer: function () {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                          .getStore().getData().items[0].data;
                                                            return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotQSALESDIRECT, '0,000') + '</b></div>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        dataIndex: 'lngTOTALL',
                                                        width: 100,
                                                        renderer: function (value, metaData) {
                                                            metaData.style = "text-align:right;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function () {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataCash')
                                                                          .getStore().getData().items[0].data;
                                                            return '<div style="text-align:right;"><b>' + Ext.util.Format.number(data.lngTotTOTALL, '0,000') + '</b></div>';
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
                            id: prototype.id + '-panelGridDataDetailMPF060',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1487,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailMPF060',
                                    width: 1487,
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
                                                text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45, align: 'center', menuDisabled: true,
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailMPF060').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Comision', dataIndex: 'COMISION', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Comistota', dataIndex: 'COMISTOTA', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Merchant', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onViewDet'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.SCARCOD == 'AX' && data.SCOUNTRY == 'MX') {
                                                                return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            } else {
                                                                return value;
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ID SAP', dataIndex: 'BANDOC', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.FSTVAL === '3' && data.PENDINGDAYS >= 4) {
                                                                metaData.style += "background-color:#fcec82;";
                                                            }
                                                            if (['1', '4', '5'].includes(data.FSTVAL)) {
                                                                metaData.style += "background-color:#ddf0d3;";
                                                                value = ''
                                                            }
                                                            return value;
                                                        }
                                                    },
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
                                                        handler: 'onDataEntryMPF060'
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
                            id: prototype.id + '-panelGridDetProceLIQ',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1093,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetProceLIQ',
                                    width: 1093,
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
                                                text: 'Process',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'COREP', width: 60, align: 'center', menuDisabled: true, id: prototype.id + '-columBYS_COREP',
                                                        listeners: {
                                                            click: 'onGridDetDayProcLIQByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            console.log(data.IN_STVAL, 'gridDataDetProceLIQ')
//                                                             if(data.IN_STVAL === 'P') {
//                                                                Ext.getCmp(prototype.id + '-columBYS_COREP').hide()
//                                                            } else {
//                                                                Ext.getCmp(prototype.id + '-columBYS_COREP').show()
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcionCOREP', width: 200, align: 'center', menuDisabled: true, id: prototype.id + '-columBYS_strDescripcionCOREP',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                            var data = record.data;
//                                                            if(data.IN_STVAL === 'P'){
//                                                                Ext.getCmp(prototype.id + '-columBYS_strDescripcionCOREP').hide()
//                                                            }else {
//                                                                Ext.getCmp(prototype.id + '-columBYS_strDescripcionCOREP').show()
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
//                                                            }

                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Country',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayProcLIQByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcionSCOUNTRY', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CBANK', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayProcLIQByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcion', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
//                                                listeners: {
//                                                    click: 'onGridDetQtyByS'
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;

                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetProceLIQ').getStore().getData().items[0].data;
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetProceLIQ').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetBank',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 822,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetBank',
                                    width: 822,
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
                                                        text: 'Code', dataIndex: 'CBANK', width: 70, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescripcion', width: 150, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;

                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Statement Reconciliation',
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
                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetDayByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetBank').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQDIFF', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetDayByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetBank').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTSAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetBank').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTSAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Statement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'without Settlement', dataIndex: 'lngQPEND', width: 160,
                                                                listeners: {
                                                                    click: 'onGridDetDayByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetBank').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'Total', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetBank').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTotal, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 702,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDay',
                                    width: 702,
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
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetLiquida'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Statement Reconciliation',
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
                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetLiquidaByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQDIFF', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetLiquidaByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTSAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTSAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Statement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'without Settlement', dataIndex: 'lngQPEND', width: 160,
                                                                listeners: {
                                                                    click: 'onGridDetLiquidaByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'Total', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTotal, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetLiquida',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1073,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleByLiquidaS',
                                    text: '',
                                    padding: '6 0',
                                    style: 'font-weight:bold;text-align:center;',
                                    width: 900
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetLiquida',
                                    width: 1073,
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
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
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
                                            {text: 'Status', dataIndex: 'STVAL', width: 80, flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
//                                            {text: 'Bank Code', dataIndex: 'CODEBANK', width: 90,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                            {text: 'Doc SAP Bank', dataIndex: 'BANDOC', width: 110,
                                                listeners: {
//                                                    click: 'onGridDetDetails'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                    if (record.data.STVAL === 'Match' || record.data.STVAL === 'Match Manual') {
//                                                        metaData.style = "text-align:center;color:#057ECB";

//                                                        value = '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }

                                            },
                                            {
                                                text: 'Conciliacion - Fase I',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Abono<br>Date', dataIndex: 'VALDATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Neto EECC', dataIndex: 'NETO', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Neto Settlement', dataIndex: 'NETOC', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },

                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Sett.', dataIndex: 'QTYTRAN1', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
//                                                            click: 'onGridDataCross'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    if (data.FSTVAL === '3' && data.PENDINGDAYS >= 4) {
                                                        metaData.style += "background-color:#fcec82;";
                                                    }
                                                    if (['1', '4', '5'].includes(data.FSTVAL)) {
                                                        metaData.style += "background-color:#ddf0d3;";
                                                        value = ''
                                                    }
                                                    return value;
                                                }
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
                                },
                            ]
                        },

                            ///// 
                            ///// GRILLA DETALLE MPF102
                            
                            
                            
                            
                            {
                                xtype: 'panel',
                                id: prototype.id + '-panelGridDataCashDetail',
                                bodyStyle: 'background-color: #E3EAEF;',
                                border: false,
                                height: 'auto',
                                width: 1180,
                                margin: '10 0 0 0',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        id: prototype.id + '-lblDetailCash',
                                        text: '',
                                        padding: '6 0',
                                        style: 'font-weight:bold;text-align:center;',
                                        width: 1160
                                    },
                                    {
                                        xtype: 'grid',
                                        id: prototype.id + '-gridCashDetail',
                                        width: 1160,
                                        columnLines: true,
                                        features: [{ ftype: 'summary' }],
                                        columns: {
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: false,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    text: 'Country',
                                                    dataIndex: 'DESC_SCOUNTRY',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Doc. Type',
                                                    dataIndex: 'TDOC',
                                                    width: 100,
                                                    renderer: function (value, metaData, record) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdAttr = 'data-qtip="' + record.data.TDOC + '"';
                                                        if (value === 'S') {
                                                            return 'SALES';
                                                        }  
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Status',
                                                    dataIndex: 'STVAL',
                                                    width: 95,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Merchant',
                                                    dataIndex: 'MERCHAND',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Doc SAP BANK',
                                                    dataIndex: 'BANDOC',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Abono Date',
                                                    dataIndex: 'ADATE',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Currency',
                                                    dataIndex: 'SCURRENCY',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";

                                                        
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Neto EECC',
                                                    dataIndex: 'NETO',
                                                    width: 160,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:right;";
                                                        return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridCashDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOEECC, '0,000.00') + '<b>';
                                                        }
                                                },
                                                {
                                                    text: 'Neto Settlement',
                                                    dataIndex: 'NETOC',
                                                    width: 160,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:right;";
                                                        return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridCashDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOSETLEMENT, '0,000.00') + '<b>';
                                                        }
                                                },
                                                {
                                                    text: 'Source',
                                                    dataIndex: 'CCUSTPRO',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        if (value === '00') {
                                                            value = 'BSP';
                                                        }  else if (value === '01'){
                                                            value = 'ICCS';
                                                        }  else if (value === '02'){
                                                            value = 'ARC';
                                                        }  
                                                        return value;
                                                    }
                                                },
                                                
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 40,
                                                    text: 'Edit',
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            iconCls: 'prx-icon-edit',
                                                            tooltip: 'Edit',
                                                            handler: 'onEditClickCash'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            
                            
                            ////////
                            ///////////7
                        
                            {
                                xtype: 'panel',
                                id: prototype.id + '-boxDetLiquiCash',
                                bodyStyle: 'background-color: #E3EAEF;',
                                border: false,
                                height: 'auto',
                                width: 1180,
                                margin: '10 0 0 0',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        id: prototype.id + '-lblTittleCash',
                                        text: '',
                                        padding: '6 0',
                                        style: 'font-weight:bold;text-align:center;',
                                        width: 1160
                                    },
                                    {
                                        xtype: 'grid',
                                        id: prototype.id + '-gridDetLiquiCash',
                                        width: 1160,
                                        columnLines: true,
                                        features: [{ ftype: 'summary' }],
                                        columns: {
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: false,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    text: 'Country',
                                                    dataIndex: 'DESC_SCOUNTRY',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Doc. Type',
                                                    dataIndex: 'TDOC',
                                                    width: 100,
                                                    renderer: function (value, metaData, record) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdAttr = 'data-qtip="' + record.data.TDOC + '"';
                                                        if (value === 'S') {
                                                            return 'SALES';
                                                        }  
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Status',
                                                    dataIndex: 'STVAL',
                                                    width: 95,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Merchant',
                                                    dataIndex: 'MERCHAND',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Doc SAP BANK',
                                                    dataIndex: 'BANDOC',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Abono Date',
                                                    dataIndex: 'ADATE',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Currency',
                                                    dataIndex: 'SCURRENCY',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";

                                                        
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Neto EECC',
                                                    dataIndex: 'NETO',
                                                    width: 160,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:right;";
                                                        return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquiCash').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOEECC, '0,000.00') + '<b>';
                                                        }
                                                },
                                                {
                                                    text: 'Neto Settlement',
                                                    dataIndex: 'NETOC',
                                                    width: 160,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:right;";
                                                        return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquiCash').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOSETLEMENT, '0,000.00') + '<b>';
                                                        }
                                                },
                                                {
                                                    text: 'Source',
                                                    dataIndex: 'CCUSTPRO',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        if (value === '00') {
                                                            value = 'BSP';
                                                        }  else if (value === '01'){
                                                            value = 'ICCS';
                                                        }  else if (value === '02'){
                                                            value = 'ARC';
                                                        }  
                                                        return value;
                                                    }
                                                },
                                                
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 40,
                                                    text: 'Edit',
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            iconCls: 'prx-icon-edit',
                                                            tooltip: 'Edit',
                                                            handler: 'onEditClickCash'
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
                                id: prototype.id + '-boxDetSalesDirect',
                                bodyStyle: 'background-color: #E3EAEF;',
                                border: false,
                                height: 'auto',
                                width: 1080,
                                margin: '10 0 0 0',
                                layout: {
                                    type: 'vbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        id: prototype.id + '-lblTittleCashSalesDirect',
                                        text: '',
                                        padding: '6 0',
                                        style: 'font-weight:bold;text-align:center;',
                                        width: 1060
                                    },
                                    {
                                        xtype: 'grid',
                                        id: prototype.id + '-gridDetSalesDirect',
                                        width: 1060,
                                        columnLines: true,
                                        features: [{ ftype: 'summary' }],
                                        columns: {
                                            defaults: {
                                                menuDisabled: true,
                                                sortable: false,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    text: 'Country',
                                                    dataIndex: 'SCOUNTRY',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Doc. Type',
                                                    dataIndex: 'TDOC',
                                                    width: 100,
                                                    renderer: function (value, metaData, record) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdAttr = 'data-qtip="' + record.data.TDOC + '"';
                                                        if (value === 'S') {
                                                            return 'SALES';
                                                        }  
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Status',
                                                    dataIndex: 'STVAL',
                                                    width: 95,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Merchant',
                                                    dataIndex: 'MERCHAND',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Doc SAP BANK',
                                                    dataIndex: 'BANDOC',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Abono Date',
                                                    dataIndex: 'ADATE',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Currency',
                                                    dataIndex: 'SCURRENCY',
                                                    width: 100,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:center;";
                                                        metaData.tdCls = "x-grid-cell x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";

                                                        
                                                        return value;
                                                    }
                                                },
                                                {
                                                    text: 'Neto EECC',
                                                    dataIndex: 'NETO',
                                                    width: 160,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:right;";
                                                        return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSalesDirect').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOEECC, '0,000.00') + '<b>';
                                                        }
                                                },
                                                {
                                                    text: 'Neto Settlement',
                                                    dataIndex: 'NETOC',
                                                    width: 160,
                                                    renderer: function (value, metaData) {
                                                        metaData.style = "text-align:right;";
                                                        return '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSalesDirect').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOSETLEMENT, '0,000.00') + '<b>';
                                                        }
                                                },
                                                
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 40,
                                                    text: 'Edit',
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            iconCls: 'prx-icon-edit',
                                                            tooltip: 'Edit',
                                                            handler: 'onEditClickSalesDirect'
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
                            id: prototype.id + '-boxDetLiquidaByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 993,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetLiquidaByS',
                                    width: 993,
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
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
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
                                            {text: 'Status', dataIndex: 'STVAL', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc SAP Bank', dataIndex: 'BANDOC', width: 110,
                                                listeners: {
//                                                    click: 'onGridDetDetails'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = record.data.STVAL == 'Match' ? "text-align:center;color:#057ECB" : "text-align:center;";

                                                    return record.data.STVAL == 'Match' ? value : value;
                                                },
                                            },
                                            {
                                                text: 'Conciliacion - Fase I',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Abono<br>Date', dataIndex: 'VALDATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Neto EECC', dataIndex: 'NETO', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Neto Settlement', dataIndex: 'NETOC', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },

                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Sett.', dataIndex: 'QTYTRAN1', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
//                                                            click: 'onGridDataCross'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    if (data.FSTVAL === '3' && data.PENDINGDAYS >= 4) {
                                                        metaData.style += "background-color:#fcec82;";
                                                    }
                                                    if (['1', '4', '5'].includes(data.FSTVAL)) {
                                                        metaData.style += "background-color:#ddf0d3;";
                                                        value = ''
                                                    }
                                                    return value;
                                                }
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
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDetails',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1073,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDetails',
                                    width: 1073,
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
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
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
                                            {text: 'Status', dataIndex: 'STVAL', width: 80, flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant', dataIndex: 'MERCHAND', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc SAP Bank', dataIndex: 'BANDOC', width: 110,
                                                listeners: {
//                                                    click: 'onGridDetDetails'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = record.data.STVAL == 'Match' ? "text-align:center;color:#057ECB" : "text-align:center;";

                                                    return record.data.STVAL == 'Match' ? value : value;
                                                },
                                            },
                                            {
                                                text: 'Conciliacion - Fase I',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Abono<br>Date', dataIndex: 'VALDATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#c0e0fc;font-weight:bold";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Neto EECC', dataIndex: 'NETO', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDetails').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETO, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Neto Settlement', dataIndex: 'NETOC', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDetails').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },

                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Sett.', dataIndex: 'QTYTRAN1', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
//                                                            click: 'onGridDataCross'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#244066;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDetails').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    if (data.FSTVAL === '3' && data.PENDINGDAYS >= 4) {
                                                        metaData.style += "background-color:#fcec82;";
                                                    }
                                                    if (['1', '4', '5'].includes(data.FSTVAL)) {
                                                        metaData.style += "background-color:#ddf0d3;";
                                                        value = ''
                                                    }
                                                    return value;
                                                }
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
                            id: prototype.id + '-panelGridDetBankByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 573,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetBankByS',
                                    width: 573,
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
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CBANK', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayBySS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescripcion', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },

                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
//                                                listeners: {
//                                                    click: 'onGridDetQtyByS'
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;

                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetBankByS').getStore().getData().items[0].data;
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetBankByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetProceByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1093,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetProceByS',
                                    width: 1093,
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
                                                text: 'Process',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'COREP', width: 60, align: 'center', menuDisabled: true, id: prototype.id + '-columBYS_COREP',
                                                        listeners: {
                                                            click: 'onGridDetDayBySS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            console.log(data.IN_STVAL, 'gridDataDetProceByS')
//                                                             if(data.IN_STVAL === 'P') {
//                                                                Ext.getCmp(prototype.id + '-columBYS_COREP').hide()
//                                                            } else {
//                                                                Ext.getCmp(prototype.id + '-columBYS_COREP').show()
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcionCOREP', width: 200, align: 'center', menuDisabled: true, id: prototype.id + '-columBYS_strDescripcionCOREP',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                            var data = record.data;
//                                                            if(data.IN_STVAL === 'P'){
//                                                                Ext.getCmp(prototype.id + '-columBYS_strDescripcionCOREP').hide()
//                                                            }else {
//                                                                Ext.getCmp(prototype.id + '-columBYS_strDescripcionCOREP').show()
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
//                                                            }

                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Country',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayBySS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcionSCOUNTRY', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CBANK', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayBySS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcion', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
//                                                listeners: {
//                                                    click: 'onGridDetQtyByS'
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;

                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetProceByS').getStore().getData().items[0].data;
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetProceByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetProceByPend',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 833,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetProceByPend',
                                    width: 833,
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
                                                text: 'Country',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayBySS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcionSCOUNTRY', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CBANK', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayBySS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcion', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
//                                                listeners: {
//                                                    click: 'onGridDetQtyByS'
//                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;

                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetProceByPend').getStore().getData().items[0].data;
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetProceByPend').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetProce',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1042,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetProce',
                                    width: 1042,
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
//                                            {
//                                                text: 'Process',
//                                                columns: [
//                                                    {
//                                                        text: 'Code', dataIndex: 'COREP', width: 60, align: 'center', menuDisabled: true,
//                                                        listeners: {
//                                                            click: 'onGridDetDay'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
////                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
//                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
////                                                            return  value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Name', dataIndex: 'strDescripcionCOREP', width: 200, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
//                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
//                                                            return value;
//                                                        },
//                                                    },
//                                                ]
//                                            },
                                            {
                                                text: 'Country',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcionSCOUNTRY', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CBANK', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strDescripcion', width: 200, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank Statement Reconciliation',
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
                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 90,
                                                                listeners: {
                                                                    click: 'onGridDetDayByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetProce').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQDIFF', width: 90,
                                                                listeners: {
                                                                    click: 'onGridDetDayByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetProce').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTSAL', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetProce').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTSAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Statement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'without Settlement', dataIndex: 'lngQPEND', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetDayByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetProce').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'Total', width: 148,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetProce').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTotal, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
//                            width: 550,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: '',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    id: prototype.id + 'lblTitulo',
//                                    width: 550
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleByDayS',
                                    text: '',
                                    padding: '6 0',
                                    style: 'font-weight:bold;text-align:center;',
                                    width: 900
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetDayByS',
                                    width: 403,
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
                                                text: 'Day', dataIndex: 'SDATE', width: 90, align: 'center',
                                                listeners: {
                                                    click: 'onGridDetLiquidaStvalDrill'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDayByS').getStore().getData().items[0].data;
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDayByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetDayProcLIQByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
//                            width: 550,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: '',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    id: prototype.id + 'lblTituloProcLIQByS',
//                                    width: 550
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTittleProcLIQByS',
                                    text: '',
                                    padding: '6 0',
                                    style: 'font-weight:bold;text-align:center;',
                                    width: 900
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDayProcLIQByS',
                                    width: 403,
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
                                                text: 'Day', dataIndex: 'SDATE', width: 90, align: 'center',
                                                listeners: {
                                                    click: 'onGridDetDetailProceByS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayProcLIQByS').getStore().getData().items[0].data;
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayProcLIQByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataCross',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 715,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCross',
                                    width: 715,
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
                                                text: 'Status', dataIndex: 'STVAL', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Bussines', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                hidden: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Type', dataIndex: 'CARDTYPE', width: 50, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.CARDTYPE + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
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
                                                                    var data = record.data;
//                                                                    metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
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
//                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
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
                                                        hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                hidden: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataCross').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.NETO, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetDetailProceByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1447,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetDetailProceByS',
                                    width: 1447,
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
                                                text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45, align: 'center', menuDisabled: true,
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDetailProceByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Comision', dataIndex: 'COMISION', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Comistota', dataIndex: 'COMISTOTA', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Merchant', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onViewDet'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.SCARCOD == 'AX' && data.SCOUNTRY == 'MX') {
                                                                return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            } else {
                                                                return value;
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ID SAP', dataIndex: 'BANDOC', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.FSTVAL === '3' && data.PENDINGDAYS >= 4) {
                                                                metaData.style += "background-color:#fcec82;";
                                                            }
                                                            if (['1', '4', '5'].includes(data.FSTVAL)) {
                                                                metaData.style += "background-color:#ddf0d3;";
                                                                value = ''
                                                            }
                                                            return value;
                                                        }
                                                    },
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
                                                        iconCls: 'prx-icon-update-bash',
                                                        tooltip: 'Edit',
                                                        handler: 'onDataEntryMPF060'
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
                            id: prototype.id + '-panelGridDetLiqDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1447,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetLiqDetail',
                                    width: 1447,
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
                                                text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center', menuDisabled: true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45, align: 'center', menuDisabled: true,
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
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetLiqDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Comision', dataIndex: 'COMISION', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Comistota', dataIndex: 'COMISTOTA', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Merchant', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onViewDet'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.SCARCOD == 'AX' && data.SCOUNTRY == 'MX') {
                                                                return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            } else {
                                                                return value;
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ID SAP', dataIndex: 'BANDOC', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            if (data.FSTVAL === '3' && data.PENDINGDAYS >= 4) {
                                                                metaData.style += "background-color:#fcec82;";
                                                            }
                                                            if (['1', '4', '5'].includes(data.FSTVAL)) {
                                                                metaData.style += "background-color:#ddf0d3;";
                                                                value = ''
                                                            }
                                                            return value;
                                                        }
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
                            id: prototype.id + '-panelGridDataTACA',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 1144,
                            margin: '10 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTACA',
                                    width: 1144,
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
                                                text: 'Payment',
                                                id: prototype.id + '-htDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetBank'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Statement Reconciliation',
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
                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQDIFF', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTSAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTSAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Statement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'without Settlement', dataIndex: 'lngQPEND', width: 160,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPEND, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'Total', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTotal, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Match', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Auto', dataIndex: 'lngQMATCHL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetProceLIQByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCHL, '0,000') + '<b>';
                                                                }
                                                            },

                                                            {
                                                                text: 'Manual', dataIndex: 'lngQDIFFL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetProceLIQByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFFL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'lngQPENDL', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetProceLIQByS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPENDL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        id: prototype.id + '-editActionDELiqDetail',
                                                        width: 40,
                                                        text: 'View',
                                                        align: 'center',

                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-eye',
                                                                tooltip: 'View',
                                                                handler: 'onViewClickLiqDetail',
//                                                                style: 'background-color:#d5f4d5;',
                                                                bodyStyle: 'background-color: #d5f4d5;',

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'TotalL', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotTotalL, '0,000') + '<b>';
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
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 700,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: #E1E6EC; border-radius: 5px;',
                            margin: '15px 0 0px 0px',
                            items: [
                                    {
                                        xtype: 'panel',
                                        width: 450,
                                        height: 25,
                                        bodyStyle: 'background-color: #6A8BAA; border: 1px solid #81BEF7',
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
                                                width: 50,
                                                style: 'margin-top: 3px;color:white;font-weight:bold'
                                            },
                                            {
                                                id: prototype.id + '-lbl-currentPage',
                                                text: '1',
                                                width: 50,
                                                style: 'margin-top: 3px;color:white;font-weight:bold'
                                            },
                                            {
                                                text: 'OF',
                                                width: 50,
                                                style: 'margin-top: 3px;color:white;font-weight:bold'
                                            },
                                            {
                                                id: prototype.id + '-lbl-pageCount',
                                                text: '0',
                                                width: 50,
                                                style: 'margin-top: 3px;color:white;font-weight:bold'
                                            },
                                            {xtype: 'tbspacer', width: 50},
                                            {
                                                text: 'Total Found',
                                                width: 80,
                                                style: 'margin-top: 3px;color:white;font-weight:bold'
                                            },
                                            {
                                                id: prototype.id + '-lbl-total',
                                                text: '0',
                                                width: 40,
                                                style: 'margin-top: 3px;color:white;font-weight:bold'
                                            }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
);


