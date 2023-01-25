valor = '0';
Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.Info', {
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
                width: 1750,
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
                            width: 1173,
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
//                                    width: 1093,
//                                    defaults: {
//                                        anchor: '100%'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'button',
//                                            id: prototype.id + '-imgSwap1',
//                                            icon: 'resources/img/botones/16x16/swap.png',
//                                            autoEl: {
//                                                tag: 'label',
//                                                'data-qtip': 'Back'
//                                            }
//                                        }
//                                    ]
//                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-imgSwap1',
                                    icon: 'resources/img/exchange.png',
                                    width: 50,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Back'
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1173,
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
                                                id: prototype.id + '-columnName01', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', sortable: false, menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Paying', dataIndex: 'lngQTEF', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTEF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paying w/o', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Settlement', dataIndex: 'lngQPAS48', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPAS48, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTOTSAL', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTOTSAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Accepted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQACEP', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACEP, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Rejected', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQRECH', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQRECH, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Suspect', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQSOSP', width: 90, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQSOSP, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQTOTBK', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTBK, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Paying',
                                                columns: [
                                                    {
                                                        text: 'without', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'lngQTOTWS', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTWS, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Clarification', dataIndex: 'lngQCLAR', width: 85, align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCardS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#fbb1af;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQCLAR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'ChargeBack', dataIndex: 'lngQCHRG', width: 85, align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCardS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#fbb1af;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQCHRG, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataSwap',
                                    width: 1133,
                                    hidden: true,
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
                                                id: prototype.id + '-columnName01Swap', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'w/o Paying', dataIndex: 'lngQTEF', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTEF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paying w/o', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Settlement', dataIndex: 'lngQPAS48', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPAS48, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTOTSAL', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return  value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTOTSAL, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Accepted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQACEPT', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSwap').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACEPT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Rejected', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQRECHT', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSwap').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQRECHT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Suspect', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQSOSPT', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSwap').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQSOSPT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQTOTBKT', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSwap').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTBKT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Paying',
                                                columns: [
                                                    {
                                                        text: 'without', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'lngQTOTWS', width: 80, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTWS, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Clarification', dataIndex: 'lngQCLAR', width: 85, align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCardS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#fbb1af;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQCLAR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'ChargeBack', dataIndex: 'lngQCHRG', width: 85, align: 'center', menuDisabled: true, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCardS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#fbb1af;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQCHRG, '0,000') + '<b>';
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
                            id: prototype.id + '-panelGridDetDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1233,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetDay',
                                    width: 1233,
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
                                                id: prototype.id + '-adghFechaDay', text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Day', dataIndex: 'SDATE', width: 90, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetCardNbr'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                text: 'Match', dataIndex: 'lngQMATCH', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQDIFF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'without Paying', dataIndex: 'lngQTEF', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardNbr'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTEF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paying without', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Settlement', dataIndex: 'lngQPAS48', width: 100, align: 'center', menuDisabled: true, //flex: 1
                                                                listeners: {
                                                                    click: 'onGridDetCardNbr'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPAS48, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Reconciliation',
                                                columns: [
                                                    {
                                                        text: 'Accepted', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQACEP', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACEP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQACEPT', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACEPT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Rejected', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQRECH', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQRECH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQRECHT', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQRECHT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Suspect', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQSOSP', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQSOSP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQSOSPT', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQSOSPT, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Paying',
                                                columns: [
                                                    {
                                                        text: 'without', menuDisabled: true,
                                                        columns: [
                                                            {
                                                                text: 'Sales', dataIndex: 'lngQTOTWS', width: 100, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTOTWS, '0,000') + '<b>';
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
                            id: prototype.id + '-panelGridDetCardByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 773,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetCardByS',
                                    width: 773,
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
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetDayByS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Description', dataIndex: 'strDescCard', width: 250, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'strSORIG', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardByS').getStore().getData().items[0].data;
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
                            id: prototype.id + '-panelGridDetCardNbr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1308,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetCardNbr',
                                    width: 1308,
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Src', dataIndex: 'FTE', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Seq', dataIndex: 'SEQNUM', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'strSORIG', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Author.',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbr').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Settlement',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TDATE', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquidation',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATEF', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'BDATEP', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Deposit', dataIndex: 'strBankDeposit', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'FLAGC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.FLAGC + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYDOC', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetTicket'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbr').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
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
                            id: prototype.id + '-panelGridDetTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1038,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetTicket',
                                    width: 1038,
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
                                                text: 'Ticket',
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 110, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 90, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'AAGENT', width: 80, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'ACURRENCY', width: 50, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AVFOP', width: 80, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetTicket').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Card Number', dataIndex: 'ACARDN', width: 120, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.ACARDN + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'APNR', width: 70, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.APNR + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Authorization',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'AAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Acceptance Date', dataIndex: 'BDATEL', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVAL', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment Information',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'BDATEP', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVALP', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days', dataIndex: 'lngDays', width: 45, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.lngDays >= 4) ? metaData.style = "text-align:center;color:#c22428"
                                                            : metaData.style = "text-align:center;color:#2BC224";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:center;background-color:#d5f4d5;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetDayByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                            id: prototype.id + '-panelGridDetCardNbrByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1328,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetCardNbrByS',
                                    width: 1328,
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
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Src', dataIndex: 'FTE', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Seq', dataIndex: 'SEQNUM', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'strSORIG', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Author.',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Settlement',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TDATE', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquidation',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATEF', width: 80, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetA1531'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:center;background-color:#c8c3d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'BDATEP', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                columns: [
                                                    {
                                                        text: 'Deposit', dataIndex: 'strBankDeposit', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'BSTVAL', width: 80, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Merchant', dataIndex: 'MERCHN', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'SPNR', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'FLAGC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.FLAGC + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onViewDet'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            if (data.SCARCOD == 'AX' && data.SCOUNTRY == 'MX') {
                                                                return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            } else {
                                                                return value;
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYDOC', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridDetTicket'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
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
                            id: prototype.id + '-panelGridDet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1593,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPrevSettlement',
                                    width: 610,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Src', dataIndex: 'FTE_PREV', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD_PREV', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN_PREV', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Seq', dataIndex: 'SEQNUM_PREV', width: 35, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'SORIG_PREV', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Author.',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC_PREV', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY_PREV', width: 50, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP_PREV', width: 100, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Type', dataIndex: 'TYPE', width: 80, align: 'center', menuDisabled: true,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', id: prototype.id + '-tbspacerSettlement', height: 40},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDet',
                                    width: 1593,
                                    height: 600,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'SDATE', dataIndex: 'SDATE', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'PRDA', dataIndex: 'PRDA', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'EPAAMEDATA', dataIndex: 'EPAAMEDATA', width: 1130, align: 'left',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:left;" : "text-align:left;";
                                                    //metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'MERCHN', dataIndex: 'MERCHN', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SETTLD', dataIndex: 'SETTLD', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'NBATCH', dataIndex: 'NBATCH', width: 75, align: 'center',
                                                listeners: {
                                                    click: 'onGridDetByBatch'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'TREGI', dataIndex: 'TREGI', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetByBatch',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1593,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetByBatch',
                                    width: 1593,
                                    height: 600,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'SDATE', dataIndex: 'SDATE', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'PRDA', dataIndex: 'PRDA', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'EPAAMEDATA', dataIndex: 'EPAAMEDATA', width: 1130, align: 'left',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:left;" : "text-align:left;";
                                                    //metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'MERCHN', dataIndex: 'MERCHN', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'SETTLD', dataIndex: 'SETTLD', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'NBATCH', dataIndex: 'NBATCH', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'TREGI', dataIndex: 'TREGI', width: 75, align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = (record.data.FLAG_CARD === 1) ? "background-color: #E3ED50;text-align:center;" : "text-align:center;";
                                                    //metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetA1531',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1696,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    width: 550,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            id: prototype.id + 'lblTituloDetA1531',
                                            width: 550
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    height: 'auto',
                                    width: 1000,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Agent',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAgent',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
//                                            editable: false,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            width: 130
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Sales Date :',
                                            id: prototype.id + '-txtSaleDate',
                                            autoSelect: false,
                                            format: 'Ymd',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            selectOnFocus: true,
                                            enableKeyEvents: true,
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 120,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 210,
//                                            hidden: true,
                                            hiddenLabel: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    height: 'auto',
                                    width: 1731,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'top'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataDetA1531TKT',
                                            width: 724,
                                            height: 550,
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
                                                        text: 'Nbr', dataIndex: 'RN', width: 35, align: 'center'
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        columns: [
                                                            {
                                                                text: 'Src', dataIndex: 'FTE', width: 35, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Code', dataIndex: 'SCARCOD', width: 35, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'SCARDN', width: 120, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Seq', dataIndex: 'SEQNUM', width: 35, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Bank', dataIndex: 'strSORIG', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;background-color:#d5f4d5;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Merchant',
                                                        columns: [
                                                            {
                                                                text: 'Number', dataIndex: 'MERCHN', width: 80, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Author.',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Select',
                                                        xtype: 'checkcolumn',
//                                                        id: prototype.id + '-id_checkIATA',
                                                        width: 70,
                                                        dataIndex: 'false',
                                                        listeners: {
                                                            checkchange: 'checkPP'
                                                        },
//                                                        renderer: function (value, meta, record, row, col) {
//                                                            if (record.data.IATADATE !== '') {
//                                                                meta['tdCls'] = 'x-item-disabled';
//                                                            } else {
//                                                                meta['tdCls'] = '';
//                                                            }
//                                                            return new Ext.ux.CheckColumn().renderer(value);
//                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataDetA1531Excel',
                                            width: 804,
                                            height: 530,
                                            columnLines: true,
                                            features: [{
                                                    ftype: 'summary'
                                                }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                items: [
                                                    {
                                                        text: 'Ticket', dataIndex: 'strTicket', width: 150, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'STATT', width: 80, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'FOP Type', dataIndex: 'FCONC', width: 50, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'AFLOAD', width: 40, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Currency', dataIndex: 'CURRENPAY', width: 50, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Value', dataIndex: 'AMOUNTR', width: 100, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'FOP Code', dataIndex: 'CMNO', width: 100, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Cia', dataIndex: 'ACARCOD', width: 50, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Ref Number', dataIndex: 'REFERENNUM', width: 120, align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'chk',
                                                        xtype: 'checkcolumn',
//                                                        id: prototype.id + '-id_checkIATA',
                                                        width: 50,
                                                        dataIndex: 'false',
                                                        listeners: {
                                                            checkchange: 'checkPP2'
                                                        },
//                                                        renderer: function (value, meta, record, row, col) {
//                                                            if (record.data.IATADATE !== '') {
//                                                                meta['tdCls'] = 'x-item-disabled';
//                                                            } else {
//                                                                meta['tdCls'] = '';
//                                                            }
//                                                            return new Ext.ux.CheckColumn().renderer(value);
//                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            border: true,
                                            height: 'auto',
                                            width: 100,
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    margin: '0 0 0 0',
                                                    id: prototype.id + '-btnSave',
                                                    text: '<b>Save</b>',
                                                    listeners: {
                                                        click: 'SaveConciliacionManual'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-chkColor',
                                                    boxLabel: 'By Color',
                                                    checked: false,
                                                    width: 90,
                                                    listeners: {
                                                        change: 'showByColor'
                                                    }
                                                },
                                            ]
                                        }
                                    ]
                                }
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
                                            width: 650,
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strDescCountry', flex: 1, //width: 200,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatLngNumber(value);
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryS').getStore().getData().items[0].data;
                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                        }
                                                    },
                                                    {
                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //var data = record.data;
                                                                    var color = "#244066";
                                                                    //var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    /*{
                                                     text: 'ACCB',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {
                                                     text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     var data = record.data;
                                                     var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                     metaData.style = "text-align:right;color:" + color + ";";
                                                     return win.formatDblNumber(value);
                                                     }
                                                     }
                                                     ]
                                                     }*/
                                                ]
                                            }
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', width: 30},
                                        //<editor-fold defaultstate="collapsed" desc="gridDetCSE">
                                        {
                                            xtype: 'grid',
                                            title: ' Errors',
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    //color color:#057ECB
                                                                    metaData.style = "text-align:left;font-weight:bold;color:#057ECB";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                    //return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error', dataIndex: 'strDescripcion', width: 250, id: prototype.id + '-noQuery', hidden: true,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;font-weight:bold;";
                                                                    value = win.formatLngNumber(value);
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatLngNumber(value);
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                    border: true,
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
                                            width: 650,
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Description', dataIndex: 'strDescCard', flex: 1, //width: 200,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatLngNumber(value);
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetCardS').getStore().getData().items[0].data;
                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                        }
                                                    },
                                                    {
                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //var data = record.data;
                                                                    //var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                    metaData.style = "text-align:right";
                                                                    return win.formatDblNumber(value);
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardS').getStore().getData().items[0].data;
                                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    /*{
                                                     text: 'ACCB',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {
                                                     text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     var data = record.data;
                                                     var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                     metaData.style = "text-align:right;color:" + color + ";";
                                                     return win.formatDblNumber(value);
                                                     },
                                                     summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = "text-align:right;";
                                                     var data = Ext.getCmp(prototype.id + '-gridDetCardS').getStore().getData().items[0].data;
                                                     return win.formatDblNumber(data.dblTotAVFOP);
                                                     }
                                                     }
                                                     ]
                                                     }*/
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //metaData.style = "text-align:right;color:#057ECB;font-weight:bold;";
                                                                    metaData.style = "text-align:right;";
                                                                    value = win.formatLngNumber(value);
                                                                    //return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                    return value
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatLngNumber(value);
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                    border: true,
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
                                            width: 600,
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
                                                                text: 'Day', dataIndex: 'SDATE', width: 140,
                                                                listeners: {
                                                                    click: 'gridDetTicketS_clickHandler'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                    //metaData.style = "text-align:center";
                                                                    return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                    //return value
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatLngNumber(value);
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetDayS').getStore().getData().items[0].data;
                                                            return win.formatLngNumber(data.lngTotQACCB);
                                                        }
                                                    },
                                                    {
                                                        text: 'Currency', dataIndex: 'SCURRENCY', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 260,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //var data = record.data;
                                                                    //var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayS').getStore().getData().items[0].data;
                                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    /*{
                                                     text: 'ACCB',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {
                                                     text: 'Amount', dataIndex: 'AVFOP', width: 120,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     var data = record.data;
                                                     var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                     metaData.style = "text-align:right;color:" + color + ";";
                                                     return win.formatDblNumber(value);
                                                     },
                                                     summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                     metaData.style = "text-align:right;";
                                                     var data = Ext.getCmp(prototype.id + '-gridDetDayS').getStore().getData().items[0].data;
                                                     return win.formatDblNumber(data.dblTotAVFOP);
                                                     }
                                                     }
                                                     ]
                                                     }*/
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:left;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatLngNumber(value);
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                            id: prototype.id + '-boxDetByPNR',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1133,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetByPNR',
                                    width: 1133,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Sale <br> Date', dataIndex: 'SDATE', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHN', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        text: 'Type', dataIndex: 'TIPOTAR', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value;
                                                        }
                                                    },
                                                    /*{
                                                     text: 'Bank', dataIndex: 'CODEBANK', width: 80,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     return value;
                                                     }
                                                     },*/
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sale <br> Amount', dataIndex: 'SVFOP', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Type', dataIndex: 'TDOC', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Src', dataIndex: 'strDescFTE', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent <br> Code', dataIndex: 'SAGENT', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            /*{
                                             text: 'FADYEN', dataIndex: 'FADYEN', width: 80,
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },*/
                                        ]
                                    }
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
                                                afterrender: function(c) {
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
                                    width: 1265,
                                    minHeight: 200,
                                    titleAlign: 'center',
                                    columnLines: true,
                                    enableColumnMove: false,
                                    /*plugins: {
                                     ptype: 'cellediting',
                                     clicksToEdit: 1
                                     },*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
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
                                                        text: 'Date', dataIndex: 'SDATE', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
                                                    return value;
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
                                                        text: 'Settlement', dataIndex: 'TDATE', width: 80,
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
                                                        text: 'Liquidación', dataIndex: 'DATEF', width: 80,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Type', dataIndex: 'strPEM', width: 60,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    metaData.tdAttr = 'data-qtip="' + data.strPEM + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 150,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    metaData.tdAttr = 'data-qtip="' + data.strPEM + '"';
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:right;color:" + color;
                                                    return win.formatDblNumber(value);
                                                }
                                            },
                                            {
                                                text: 'Credit Card - C1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code C-1', dataIndex: 'SCARCOD1', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    /*{
                                                     text: 'Number', dataIndex: 'SCARDN', width: 140,
                                                     renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                     var data = record.data;
                                                     var color = data.strPEM === 'SALES'? "#64418c" : "#244066";
                                                     metaData.style = "text-align:center;color:"+color;
                                                     metaData.tdAttr = 'data-qtip="'+data.SCARDN+'"';
                                                     return value;
                                                     }
                                                     },*/
                                                    {
                                                        text: 'Author. C-1', dataIndex: 'SAUTHOC1', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                            metaData.style = "text-align:center;color:" + color;
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Ref. ACCB', dataIndex: 'NUMREF', width: 110,
                                                listeners: {
                                                    click: 'showTicket'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? "#64418c" : "#244066";
                                                    metaData.style = "text-align:center;color:" + color;
                                                    if(data.NUMREF.substr(0,3) === '139'){
                                                        return '<a href="#payments-bank-reconciliation-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                                    } else {
                                                        return value;
                                                    }                                                    
                                                }
                                            },
//                                            {
//                                                text: 'Ticket', flex: 1,
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    resizable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Number', flex: 1, /*width: 120,*/ dataIndex: 'strTicket',
////                                                                        listeners: {
//////                                                                            click: 'gridData_act1_clickHandler'
////                                                                        },
//                                                        /*editor: {
//                                                            xtype: 'textfield',
//                                                            editable: true,
//                                                            enableKeyEvents: true,
//                                                            listeners: {
//                                                                keypress: 'eventKeyTKT',
//                                                                specialkey: 'eventKeyTKT'
//                                                            }
//                                                        },*/
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
//                                                            metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
//                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                            metaData.unselectableAttr = "unselectable='off'";
//                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Type', dataIndex: 'strPEM', width: 90,
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                    metaData.style = "text-align:center;color:" + color + ";";
//                                                    metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Error',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Code', dataIndex: 'CERROR', width: 155,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:left;color:" + color + ";";
//                                                            metaData.tdAttr = 'data-qtip="' + data.CERROR + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Src', dataIndex: 'FTE', width: 32,
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                    metaData.style = "text-align:center;color:" + color + ";";
//                                                    metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-hcDetTktS',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                            metaData.tdAttr = 'data-qtip="' + data.SDATE + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Country',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 60,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Credit Card',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Code', dataIndex: 'SCARCOD', width: 45,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Card Number', width: 150, dataIndex: 'strSCARDN',
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = 'text-align:center;color:' + color + ';background-color:#CCFFFF;';
//                                                            metaData.tdAttr = 'data-qtip="' + data.strSCARDN + '"';
//                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
//                                                            metaData.unselectableAttr = "unselectable='off'";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {
//                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 70,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Amount', dataIndex: 'SVFOP', width: 75,
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
//                                                    return win.formatDblNumber(value);
//                                                }
//                                            },
//                                            {
//                                                text: 'PNR', dataIndex: 'SPNR', width: 70,
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                    metaData.tdAttr = 'data-qtip="' + data.SPNR + '"';
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Agent',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Code', dataIndex: 'SAGENT', width: 70,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
//                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Transaction',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Code', dataIndex: 'TRNCU', width: 55
//                                                    }
//                                                ]
//                                            },
//                                            {
//                                                text: 'Days', dataIndex: 'lngDays', width: 45,
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
//                                                    metaData.style = "text-align:center;color:" + color + ";";
//                                                    return value;
//                                                }
//                                            },
//                                            {
//                                                text: 'Flag',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {
//                                                        text: 'Status', dataIndex: 'strFlagStat', width: 50,
//                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
//                                                            metaData.style = "text-align:center;color:" + color + ";";
//                                                            metaData.tdAttr = 'data-qtip="' + data.strFlagStat + '"';
//                                                            return value;
//                                                        }
//                                                    }
//                                                ]
//                                            },
//                                            /*{
//                                                text: 'View', dataIndex: '', width: 40,
//                                                listeners: {
//                                                    click: 'viewDataEntry_clickHandler'
//                                                },
//                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    metaData.tdAttr = 'data-qtip="' + (Number(data.lngQOBS) > 1 ? 'View' : 'View') + '"';
//                                                    var src = Number(data.lngQOBS) > 1 ? 'resources/img/botones/16x16/warning.png' : 'resources/img/botones/16x16/Change.png';
//                                                    return '<a href="#payments-bank-reconciliation-form"><img src="' + src + '"></a>';
//                                                }
//                                            }*/
                                        ]
                                    }
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
                                    width: 1230,
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
                                                        text: 'Number', flex: 1, /*width: 120,*/ dataIndex: 'strTicket',
//                                                                        listeners: {
//                                                                            click: 'gridData_act1_clickHandler'
//                                                                        },
                                                        editor: {
                                                            xtype: 'textfield',
                                                            editable: true,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                keypress: 'eventKeyTKT',
                                                                specialkey: 'eventKeyTKT'
                                                            }
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                            metaData.tdAttr = 'data-qtip="' + data.strTicket + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.unselectableAttr = "unselectable='off'";
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 130,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Src', dataIndex: 'FTE', width: 35,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', width: 140, dataIndex: 'strSCARDN',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAUTHOC + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strMoneda + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                    return win.formatDblNumber(value);
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTktMatch').getStore().getData().items[0].data;
                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
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
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                            metaData.tdAttr = 'data-qtip="' + data.SAGENT + '"';
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                            metaData.style = "text-align:center;color:" + color + ";";
                                                            metaData.tdAttr = 'data-qtip="' + data.BDATEP + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVAL', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdAttr = 'data-qtip="View"';
                                                    var src = 'resources/img/botones/16x16/1326498593_018.png';
                                                    return '<a href="#payments-bank-reconciliation-form"><img src="' + src + '"></a>';
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
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 572,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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
                        },
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


