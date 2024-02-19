valor = '0';
Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.Info', {
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
                width: 1300,
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
                            height: 'auto',
                            width: 704,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
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
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
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
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetBank',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 822,
                            margin: '0 0 0 0 ',
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
                                                                    click: 'onGridDetBankS'
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
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetBankS'
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
                                                                    click: 'onGridDetBankS'
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
                            border: true,
                            height: 'auto',
                            width: 702,
                            margin: '0 0 0 0 ',
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
                                                id: prototype.id + '-htDetDay',
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
//                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return value ;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                listeners: {
//                                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return  value ;
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
                            id: prototype.id + '-boxDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 702,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDayByS',
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
                                                id: prototype.id + '-htDetDayByS',
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
                            border: true,
                            height: 'auto',
                            width: 963,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetLiquida',
                                    width: 963,
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
                                            {text: 'Status', dataIndex: 'STVAL', width: 80, flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
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
                                                    click: 'onGridDetDetails'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = record.data.STVAL == 'Match' ? "text-align:center;color:#057ECB" : "text-align:center;";
                                                    
//                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                    return value;
                                                    return record.data.STVAL == 'Match' ? '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>' : value;
                                                },
                                            },
                                            
//                                            {
//                                                text: 'Liquidacion - Fase I',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Abono<br>Date', dataIndex: 'ADATE', width: 110,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            metaData.style = "text-align:center;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Match', dataIndex: 'QTYTRAN1', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#;";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totQTYTRAN1, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Pennding', dataIndex: 'QTYTRAN3', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#;";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totQTYTRAN3, '0,000') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
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
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Neto Settlement', dataIndex: 'NETOC', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOC, '0,000') + '<b>';
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
                                                            return value ;
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
                            id: prototype.id + '-boxDetLiquidaByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 803,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetLiquidaByS',
                                    width: 803,
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
                                            {text: 'Status', dataIndex: 'STVAL', width: 80, flex: 1, hidden : true, 
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
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
                                                    click: 'onGridDetDetails'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = record.data.STVAL == 'Match' ? "text-align:center;color:#057ECB" : "text-align:center;";
                                                    
//                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                    return value;
                                                    return record.data.STVAL == 'Match' ? '<a href="#payments-statement-reconciliations-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>' : value;
                                                },
                                            },
                                            
//                                            {
//                                                text: 'Liquidacion - Fase I',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Abono<br>Date', dataIndex: 'ADATE', width: 110,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            metaData.style = "text-align:center;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Match', dataIndex: 'QTYTRAN1', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#;";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totQTYTRAN1, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Pennding', dataIndex: 'QTYTRAN3', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#;";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquida').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totQTYTRAN3, '0,000') + '<b>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
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
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Neto Settlement', dataIndex: 'NETOC', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0e0fc;font-weight:bold";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetLiquidaByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETOC, '0,000') + '<b>';
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
                                                            return value ;
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
                            border: true,
                            height: 'auto',
                            width: 743,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDetails',
                                    width: 743,
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
//                                                text: 'Ticket',
//                                                columns: [
//                                                    {
//                                                        text: 'Number', dataIndex: 'strTicket', width: 110, align: 'center', menuDisabled: true,
//                                                        listeners: {
//                                                            click: 'onGridData_VIEWTKT_clickHandler'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 150, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'NETO', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetDetails').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETO, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Card Number', dataIndex: 'SCARDN', width: 150, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.ACARDN + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Authorization',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC', width: 100, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    var data = record.data;
                                                    //metaData.tdAttr = 'data-qtip="' + data.APNR + '"';
                                                    return value;
                                                }
                                            },
//                                            {
//                                                text: 'Bank Information',
//                                                columns: [
//                                                    {
//                                                        text: 'Acceptance Date', dataIndex: 'SDATEL', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Status', dataIndex: 'SSTVAL', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Payment Information',
//                                                columns: [
//                                                    {
//                                                        text: 'Date', dataIndex: 'SDATEP', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Status', dataIndex: 'SSTVALP', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Days', dataIndex: 'lngDays', width: 45, align: 'center',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    (data.lngDays >= 4) ? metaData.style = "text-align:center;color:#c22428"
//                                                            : metaData.style = "text-align:center;color:#2BC224";
//                                                    return value;
//                                                }
//                                            }
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
                            width: 353,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetBankByS',
                                    width: 353,
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
//                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80, align: 'center', hidden: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
//                                                    return value;
//                                                }
//                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'CBANK', width: 60, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayByS'
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
                                                            return value ;
                                                            
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetBankByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
//                                            {
//                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center', hidden: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',hidden: true,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;";
//                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                    return value;
//                                                },
//                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetBankByS').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
//                                                }
//                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
//                            width: 550,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    border: false,
//                                    bodyStyle: 'background:#E5ECEF;',
//                                    margin: '5 0 0 0',
//                                    width: 550,
//                                    defaults: {
//                                        anchor: '100%'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            text: '',
//                                            style: 'font-weight:bold;color:#0B333C;',
//                                            id: prototype.id + 'lblTitulo',
//                                            width: 550
//                                        }
//                                    ]
//                                },
                                {
                                    xtype: 'label',
                                    text: '',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    id: prototype.id + 'lblTitulo',
//                                    width: 550
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
                                                    click: 'onGridDetCardNbrByS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                            id: prototype.id + '-panelGridDataCross',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            height: 'auto',
                            width: 715,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle3',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '5 0 5 0',
                                    hide: true
                                },
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
//                                            {
//                                                text: 'Poliza',
//                                                columns: [
//                                                    {
//                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";
//                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";
//                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Date', dataIndex: 'FCONT', width: 80, align: 'center', menuDisabled: true,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;";
//                                                            var data = record.data;
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
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
                            width: 700,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 700,
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


