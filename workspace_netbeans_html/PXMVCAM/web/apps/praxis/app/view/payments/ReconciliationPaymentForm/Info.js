valor = '0';
Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.Info', {
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
                width: 1850,
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
                            id: prototype.id + '-boxMainSummary',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainSummary',
                                    width: 1800,
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
                                                text: 'Processing',
                                                id: prototype.id + '-msDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 90,
                                                        listeners: {
                                                            click: 'onGridDetSummary'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Zone', dataIndex: 'ZONA', width: 50},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Curr', dataIndex: 'PCURRENCY', width: 50},
                                            {
                                                text: 'Summary',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'PGROSAMOU', width: 110,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPGROSAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'PDISCAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPDISCAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'PSFEEAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPSFEEAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'PADJAMOUN', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPADJAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'PTAXAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPTAXAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Op. Debit', dataIndex: 'ODBALAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totODBALAMOU, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'PNETAMOU', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPNETAMOU, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Summary vs Submission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 110,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DISCAMOUNC', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'ADJAMOUNC', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totADJAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'TAXAMOUNC', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Op. Debit', dataIndex: 'ODBALAMOUC', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totODBALAMOUC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 110,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'DIFF_PGROSAMOU', width: 110,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PGROSAMOU <= -1) {
                                                            if (record.data.DIFF_PGROSAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PGROSAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DIFF_PDISCAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PDISCAMOU <= -1) {
                                                                    if (record.data.DIFF_PDISCAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PDISCAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'DIFF_PSFEEAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PSFEEAMOU <= -1) {
                                                                    if (record.data.DIFF_PSFEEAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PSFEEAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'DIFF_PADJAMOUN', width: 110,
                                                                listeners: {
                                                                    //
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PADJAMOUN <= -1) {
                                                                    if (record.data.DIFF_PADJAMOUN === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PADJAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'DIFF_PTAXAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PTAXAMOU <= -1) {
                                                                    if (record.data.DIFF_PTAXAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PTAXAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Op. Debit', dataIndex: 'DIFF_ODBALAMOU', width: 110,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_ODBALAMOU <= -1) {
                                                                    if (record.data.DIFF_ODBALAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_ODBALAMOU, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'DIFF_PNETAMOU', width: 110,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PNETAMOU <= -1) {
                                                            if (record.data.DIFF_PNETAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PNETAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '', dataIndex: '', width: 10
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
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1800,
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
                                                text: 'Processing',
                                                id: prototype.id + '-htDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 80,
                                                        listeners: {
                                                            click: 'onGridDetSubmission'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'AX Number', dataIndex: 'AXPAYNBR', width: 80},
                                            {text: 'Status', dataIndex: 'desCERROR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.tdAttr = 'data-qtip="' + record.data.DES_CERROR + '"';
                                                        if (record.data.CERROR >= 80) {
                                                            metaData.style = "text-align:center;background-color:#ffff6b;";
                                                        } else {
                                                            metaData.style = "text-align:center;background-color:#fc8686;";
                                                        }
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Zone', dataIndex: 'ZONA', width: 50},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Curr', dataIndex: 'PCURRENCY', width: 50},
                                            {
                                                text: 'Summary',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'PGROSAMOU', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPGROSAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Pay Rate', dataIndex: 'RATECOMBA', width: 70,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale Rate', dataIndex: 'RATECOMSM', width: 70,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission', dataIndex: 'PDISCAMOU', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPDISCAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'PSFEEAMOU', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPSFEEAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'PADJAMOUN', width: 85,
                                                                listeners: {
                                                                    click: 'onGridDetAdjustment'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPADJAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT Rate', dataIndex: 'RATEIVABA', width: 65,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'PTAXAMOU', width: 75,
                                                                listeners: {
                                                                    click: 'onGridDetTaxes'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    if (data.SCOUNTRY === 'AR') {
                                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                    } else {
                                                                        return value;
                                                                    }
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totPTAXAMOU, '0,000.00') + '<b>';
                                                                },
                                                            },
                                                            {
                                                                text: 'Op. Debit', dataIndex: 'ODBALAMOU', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totODBALAMOU, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'PNETAMOU', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totPNETAMOU, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Summary vs Submission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Pay Rate', dataIndex: 'RATECOMBAC', width: 70,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Sale Rate', dataIndex: 'RATECOMSMC', width: 70,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Commission', dataIndex: 'DISCAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'ADJAMOUNC', width: 85,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totADJAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT Rate', dataIndex: 'RATEIVABAC', width: 65,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'TAXAMOUNC', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Op. Debit', dataIndex: 'ODBALAMOUC', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totODBALAMOUC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'DIFF_PGROSAMOU', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PGROSAMOU <= -1) {
                                                            if (record.data.DIFF_PGROSAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PGROSAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DIFF_PDISCAMOU', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PDISCAMOU <= -1) {
                                                                    if (record.data.DIFF_PDISCAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PDISCAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'DIFF_PSFEEAMOU', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PSFEEAMOU <= -1) {
                                                                    if (record.data.DIFF_PSFEEAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PSFEEAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'DIFF_PADJAMOUN', width: 85,
                                                                listeners: {
                                                                    //
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PADJAMOUN <= -1) {
                                                                    if (record.data.DIFF_PADJAMOUN === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PADJAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'DIFF_PTAXAMOU', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_PTAXAMOU <= -1) {
                                                                    if (record.data.DIFF_PTAXAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PTAXAMOU, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Op. Debit', dataIndex: 'DIFF_ODBALAMOU', width: 75,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    //if (record.data.DIFF_ODBALAMOU <= -1) {
                                                                    if (record.data.DIFF_ODBALAMOU === 0) {
                                                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDIFF_ODBALAMOU, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'DIFF_PNETAMOU', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //if (record.data.DIFF_PNETAMOU <= -1) {
                                                            if (record.data.DIFF_PNETAMOU === 0) {
                                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PNETAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Download',
                                                        xtype: 'actioncolumn',
                                                        width: 75,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/24x24/dollar.png',
                                                                getClass: function (v, meta, rec) {
                                                                    /*if (rec.data.DIFF_PNETAMOU > -1) {
                                                                     metaData.css = 'x-hide-display';
                                                                     return v;
                                                                     } else {
                                                                     meta.tdAttr = 'data-qtip="Debit Memo"';
                                                                     return v;
                                                                     }*/
                                                                    meta.tdAttr = 'data-qtip="Debit Memo"';
                                                                    return v;
                                                                },
                                                                handler: 'onSendClick'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTaxes',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1794,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTaxes',
                                    width: 1484,
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
                                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Tax<br>Date', dataIndex: 'TAXPDATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Zone', dataIndex: 'ZONA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Curr.', dataIndex: 'PCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 90,
                                                listeners: {
//                                                            click: 'onGridDetPricing'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
//                                                                value = '<b>' + value + '</b>';
                                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'AX Number', dataIndex: 'AXPAYNBR', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Tax Description', dataIndex: 'TAXDESCRI', width: 180,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Taxes',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tax Base<br>Amount', dataIndex: 'TAXBAMOUN', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TAXBAMOUN_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Tax Rate', dataIndex: 'TAXRATE', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Tax Amount', dataIndex: 'TAXAMOUNT', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TAXAMOUNT_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Taxes',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Tax Base<br>Amount', dataIndex: 'TAXBAMOUNC', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TAXBAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Tax Rate', dataIndex: 'TAXRATEC', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Tax Amount', dataIndex: 'TAXAMOUNTC', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TAXAMOUNTC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetSubmission',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetSubmission',
                                    width: 1450,
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
                                                id: prototype.id + '-htDateSunmission',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "background-color:#BAC9F4;";
                                                            }
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            //{text: 'Code', dataIndex: 'STYPECD', width: 55},
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 90,
                                                        listeners: {
                                                            click: 'onGridDetTransaction'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            if (data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:center;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }

                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            if (data.desCERROR === 'Sub Total' || data.desCERROR === 'Adjustment') {
                                                                return value;
                                                            } else {
                                                                value = '<b>' + value + '</b>';
                                                                return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            }
                                                        }
                                                    },
                                                    {text: 'Status', dataIndex: 'desCERROR', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "background-color:#BAC9F4;";
                                                            } else if (record.data.CERROR === '') {
                                                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#fc8686;";
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Submission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID <br> Sub.', dataIndex: 'IDITEMS', width: 60,
                                                        listeners: {
                                                            click: 'onGridDetTransaction'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:center;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            }

                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Submis<br>Date', dataIndex: 'BSUMDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:center;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'AMEX <br> Process Date', dataIndex: 'AXPRODAT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:center;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Invoice Number', dataIndex: 'SIREFNBR', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:center;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr', dataIndex: 'SCURRENCY', width: 60, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:center;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            }
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Submission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUN', width: 90,
                                                        listeners: {
//                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DISCAMOUN', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.desCERROR === 'Sub Total') {
                                                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT <br> Commission', dataIndex: 'TAXAMOUN', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.desCERROR === 'Sub Total') {
                                                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUN', width: 90,
                                                        listeners: {
//                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Transac.<br>Count', dataIndex: 'TRANCOUNT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            }
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTRANCOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Submission vs Transaction/Pricing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            }

                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DISCAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.desCERROR === 'Sub Total') {
                                                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT <br> Commission', dataIndex: 'TAXAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (record.data.desCERROR === 'Sub Total') {
                                                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Transac.<br>Count', dataIndex: 'TRANCOUNTC', width: 60,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.desCERROR === 'Sub Total') {
                                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTRANCOUNTC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTransaction',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1700,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTransaction',
                                    width: 1590,
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
                                                text: 'Payment',
                                                id: prototype.id + '-htDateTransaction',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetPricing'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROIN', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    if (record.data.CERROIN === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    metaData.tdAttr = 'data-qtip="' + data.DES_CERROIN + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Type', dataIndex: 'TDOC', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.TDOC === 'S') {
                                                        value = 'Sales';
                                                    } else if (record.data.TDOC === 'R') {
                                                        value = 'Refund';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    /*{text: 'Merchant <br> Location ID', dataIndex: 'LMERCHID', width: 90,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:center;background-color:#FCF6DC";
                                                     return value;
                                                     }
                                                     },*/
                                                    {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 70,
                                                        listeners: {
                                                            click: 'onGridDetPricingByItemt'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120,
                                                        listeners: {
                                                            click: 'onViewPNR'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
//                                                            value = '<br>' + value + '<br>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;text-align:center">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Seller ID', dataIndex: 'SELLERID', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Installment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Plan', dataIndex: 'NBRINSTA', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'TRANSDATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID', dataIndex: 'TRANSID', width: 130, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sub.Gros. <br> Amoun P.Cur', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUN_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'MSI',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate<br>Comm.', dataIndex: 'RATESFEE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.SFEEAMOU_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accel.<br>Amount', dataIndex: 'ACCEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOU_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Comm.', dataIndex: 'ACCEAMOUC', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Commission Base',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Discount<br>Rate', dataIndex: 'DISCRATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUN_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TGROSAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'MSI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate<br>Comm.', dataIndex: 'RATESFEEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Commission Base',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Discount<br>Rate Comm.', dataIndex: 'DISCRATEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'First Inst. <br> Amou.Conc', dataIndex: 'FINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Subseq.Ins. <br> Amou.Conc', dataIndex: 'SINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDiffTransaction',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1750,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDiffTransaction',
                                    width: 1700,
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
                                                text: 'Payment',
                                                id: prototype.id + '-htDateDiffTransaction',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROIN', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    if (record.data.CERROIN === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    metaData.tdAttr = 'data-qtip="' + data.DES_CERROIN + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Zone', dataIndex: 'ZONA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Description', dataIndex: 'DES_CERROIN', width: 190,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Type', dataIndex: 'TDOC', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.TDOC === 'S') {
                                                        value = 'Sales';
                                                    } else if (record.data.TDOC === 'R') {
                                                        value = 'Refund';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120,
                                                        listeners: {
                                                            click: 'onViewPNR'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;text-align:center">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Seller ID', dataIndex: 'SELLERID', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Installment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Plan', dataIndex: 'NBRINSTA', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'TRANSDATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID', dataIndex: 'TRANSID', width: 130, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sub.Gros. <br> Amoun P.Cur', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUN_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'MSI',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate<br>Comm.', dataIndex: 'RATESFEE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.SFEEAMOU_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accel.<br>Amount', dataIndex: 'ACCEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOU_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Comm.', dataIndex: 'ACCEAMOUC', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Commission Base',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Discount<br>Rate', dataIndex: 'DISCRATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUN_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TGROSAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'MSI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate<br>Comm.', dataIndex: 'RATESFEEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Commission Base',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Discount<br>Rate Comm.', dataIndex: 'DISCRATEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDiffTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'First Inst. <br> Amou.Conc', dataIndex: 'FINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Subseq.Ins. <br> Amou.Conc', dataIndex: 'SINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetPricing',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1794,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetPricing',
                                    width: 1794,
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
                                                id: prototype.id + '-htDatePricing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 90,
                                                        listeners: {
//                                                            click: 'onGridDetPricing'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
//                                                                value = '<b>' + value + '</b>';
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Pricing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval <br> Code', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fee <br> Code', dataIndex: 'FEECODE', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Transaction <br> Date', dataIndex: 'TRANSDATE', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 90,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                    if (record.data.DISCRATE === -16 || record.data.DISCRATE === 16) {
                                                        return '';
                                                    } else {
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Discount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate', dataIndex: 'DISCRATE_IMPORT', width: 85,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'DISCAMOUN_IMPORT', width: 85,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUN_IMPORT, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'VAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate', dataIndex: 'DISCRATE_IVA', width: 85,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'DISCAMOUN_IVA', width: 85,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUN_IVA, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 90,
                                                listeners: {
                                                    //                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                    if (record.data.DISCRATEBA === -16 || record.data.DISCRATEBA === 16) {
                                                        return '';
                                                    } else {
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUC, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Result Reconciliation Pricing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Commission',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate', dataIndex: 'DISCRATEBA_IMPORT', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'DISCAMOUNC_IMPORT', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC_IMPORT, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'VAT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate', dataIndex: 'DISCRATEBA_IVA', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                },
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'DISCAMOUNC_IVA', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC_IVA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetChargeback',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1730,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetChargeback',
                                    width: 1730,
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
                                            {text: 'Source', dataIndex: 'RECTYPE', width: 130,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#B2DAFA";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Number', dataIndex: 'CHADJNBR', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120, },
                                            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Reason <br> Code', dataIndex: 'CHAADJCOD', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {text: 'Description', dataIndex: 'CHAADJDES', width: 300,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;background-color:#FCF6DC";
                                                    metaData.tdAttr = 'data-qtip="' + data.CHAADJDES + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUN', width: 100,
                                                        listeners: {
//                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOUN', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'TAXAMOUN', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUN', width: 100,
                                                        listeners: {
//                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Commission', dataIndex: 'DISCAMOUNC', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'TAXAMOUNC', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainSettlement',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1475,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainSettlement',
                                    width: 1475,
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
                                                text: 'Payment',
                                                id: prototype.id + '-mSetDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 100,
                                                        listeners: {
                                                            click: 'onGridSettlement'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'ZONA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'PCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'GROSS<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Commission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    /*{
                                                     text: 'Rate', dataIndex: 'DISCRATE_IMPORT', width: 90,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;background-color:#B2DAFA";
                                                     value = Ext.util.Format.number(value, '0,000.00 %');
                                                     return value;
                                                     }
                                                     },*/
                                                    {
                                                        text: 'Amount', dataIndex: 'DISCAMOUN_IMPORT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    /*{
                                                     text: 'VAT Rate', dataIndex: 'DISCRATE_IVA', width: 90,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;background-color:#B2DAFA";
                                                     value = Ext.util.Format.number(value, '0,000.00 %');
                                                     return value;
                                                     }
                                                     },*/
                                                    {
                                                        text: 'VAT', dataIndex: 'DISCAMOUN_IVA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Acceleration <br> Amount', dataIndex: 'ACCEAMOU', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'VAT COMM<br>1+2', dataIndex: 'TAXAMOUN_AD', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'GROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency<br>Settlement', dataIndex: 'PCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Reconciled<br>Net Amount', dataIndex: 'NETAMOUNC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                    value = Ext.util.Format.number(value, '0,000.00');
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
                            id: prototype.id + '-boxSettlement',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1750,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSettlement',
                                    width: 1750,
                                    height: 'auto',
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
                                                id: prototype.id + '-settDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 100,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Id', dataIndex: 'PMERCHID', width: 90,
                                                        listeners: {
                                                            click: 'onGridDetSettMerchant'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.tdAttr = 'data-qtip="' + record.data.DES_CERROR + '"';
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'ZONA', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'PCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'GROSS<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Commission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Pay Rate', dataIndex: 'DISCRATE_IMPORT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Sale Rate', dataIndex: 'RATECOMSM', width: 70,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'DISCAMOUN_IMPORT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN_IMPORT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT Rate', dataIndex: 'DISCRATE_IVA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'DISCAMOUN_IVA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN_IVA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOU, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Acceleration <br> Amount', dataIndex: 'ACCEAMOU', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totACCEAMOU, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'VAT COMM<br>1+2', dataIndex: 'TAXAMOUN_AD', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUN_AD, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'GROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUN_CB, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency<br>Settlement', dataIndex: 'PCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Reconciled<br>Net Amount', dataIndex: 'NETAMOUNC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetSettlement',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1720,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetSettlement',
                                    width: 1720,
                                    height: 'auto',
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
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 50,
                                                text: 'Detail',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-detail',
                                                        tooltip: 'Detail',
                                                        handler: 'onEditClickSettlement'
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                id: prototype.id + '-detSettDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TRANSDATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Diff.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Days', dataIndex: 'PASSED_DAYS', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value > 11) {
                                                                metaData.style = "color:#de2828";
                                                            }

                                                            if (record.data.INSTANBR > 0 && value > 2) {
                                                                metaData.style = "color:#de2828";
                                                            }
                                                            return value;
                                                        },
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Reconciliation<br>Settlement', dataIndex: 'desCERROIN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.CERROIN === '') {
                                                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#fc8686;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 145,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'ZONA', width: 60,
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
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
                                                        text: 'Type', dataIndex: 'RECTYPE', width: 100,
                                                    }
                                                ]
                                            },
                                            {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
                                                listeners: {
                                                    click: 'onTktsDetail'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    if (value === 0) {
                                                        return value;
                                                    } else {
                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    }
                                                }
                                            },
                                            {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNRbySPNR'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Document <br> Type', dataIndex: 'descTDOC', width: 80,
                                            },
                                            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                                            {text: 'Auth.', dataIndex: 'SAUTHOC', width: 70},
                                            {text: 'Installment<br>Plan', dataIndex: 'NBRINSTA', width: 90},
                                            {text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 90},
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.SVFOPS_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'MSI',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate<br>Comm.', dataIndex: 'RATESFEE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accel.<br>Amount', dataIndex: 'ACCEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACCEAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Comm.', dataIndex: 'ACCEAMOUC', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT COMM<br>1 2', dataIndex: 'IVACOM12', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px';
                                                            return '<b>' + Ext.util.Format.number(data.totIVACOM12, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Commission Base',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Discount<br>Rate', dataIndex: 'DISCRATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                            if (data.TGROSAMOUN >= data.TGROSAMOUC - 0.5 && data.TGROSAMOUN <= data.TGROSAMOUC + 0.5) {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TGROSAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'MSI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate<br>Comm.', dataIndex: 'RATESFEEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (Ext.util.Format.number(data.RATESFEE, '0,000.00') !== Ext.util.Format.number(data.RATESFEEC, '0,000.00')) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.ACCEAMOUC >= data.SFEEAMOUC - 0.5 && data.ACCEAMOUC <= data.SFEEAMOUC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT COMM<br>1 2', dataIndex: 'VATCOMMSIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.IVACOM12 >= data.VATCOMMSIC - 0.5 && data.IVACOM12 <= data.VATCOMMSIC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.VATCOMMSIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Commission Base',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Discount<br>Rate Comm.', dataIndex: 'DISCRATEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (Ext.util.Format.number(data.DISCRATE, '0,000.00') !== Ext.util.Format.number(data.DISCRATEC, '0,000.00')) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.DISCAMOUN >= data.DISCAMOUNC - 0.5 && data.DISCAMOUN <= data.DISCAMOUNC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (Ext.util.Format.number(data.DISCRATEI, '0,000.00') !== Ext.util.Format.number(data.DISCRATEIC, '0,000.00')) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.DISCAMOUNI >= data.DISCAMOUIC - 0.5 && data.DISCAMOUNI <= data.DISCAMOUIC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'CHADJNBR', width: 110},
                                                    {text: 'Reason Code', dataIndex: 'CHAADJCOD', width: 90},
                                                    {text: 'Description', dataIndex: 'CHAADJDES', width: 280,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="' + record.data.CHAADJDES + '"';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Merch. Loc.', dataIndex: 'LMERCHID', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Seller ID', dataIndex: 'SELLERID', width: 70},
                                                    {
                                                        text: 'Amount', dataIndex: 'GROSAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUN_CB, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUN_CB_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUN_CB, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency<br>Settlement', dataIndex: 'IN_PCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Calculated<br>Commission ', dataIndex: 'DISCAMOSC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOSC, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Rule', dataIndex: 'descFREGLA', width: 85,
                                            },
                                            {
                                                text: 'Flag <br> Complement', dataIndex: 'descFCOMPL', width: 100,
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetailTktSettlement',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1720,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailTktSettlement',
                                    width: 1720,
                                    height: 'auto',
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
                                                id: prototype.id + '-detSettTktDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TRANSDATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'AXPRODAT', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'ZONA', width: 60,
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Reconciliation<br>Settlement', dataIndex: 'desCERROR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.CERROR === '') {
                                                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                            } else {
                                                                metaData.tdAttr = 'data-qtip="' + record.data.DES_CERROR + '"';
                                                                metaData.style = "text-align:center;background-color:#fc8686;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                                            return value;
                                                        }
                                                    },
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
                                                        text: 'Type', dataIndex: 'RECTYPE', width: 100,
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNRbySPNR'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                                            {text: 'Auth.', dataIndex: 'SAUTHOC', width: 70},
                                            /*{text: 'Installment <br> Plan', dataIndex: 'NBRINSTA', width: 90},
                                             {text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 90},*/
                                            {
                                                text: 'Total <br> Amount', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Amount<br>Total Transact.', dataIndex: 'TGROSAMOUC', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    if (rowIndex > 0) {
                                                        return ''
                                                    } else {
                                                        return value;
                                                    }
                                                },
                                                /*summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.TGROSAMOUC_TOTAL, '0,000.00') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
//                                            {
//                                                text: 'Adjustment', dataIndex: 'SADJUST', width: 100,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
//                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                    return value;
//                                                },
//                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                    return '<b>' + Ext.util.Format.number(data.SADJUST_TOTAL, '0,000.00') + '<b>';
//                                                }
//                                            },
                                            {
                                                text: 'MSI',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate<br>Comm.', dataIndex: 'RATESFEE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accel.<br>Amount', dataIndex: 'ACCEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACCEAMOU, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Comm.', dataIndex: 'ACCEAMOUC', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT COMM<br>1 2', dataIndex: 'IVACOM12', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px';
                                                            return '<b>' + Ext.util.Format.number(data.totIVACOM12, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Commission Base',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Discount<br>Rate', dataIndex: 'DISCRATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                            if (data.TGROSAMOUN >= data.TGROSAMOUC - 0.5 && data.TGROSAMOUN <= data.TGROSAMOUC + 0.5) {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            } else {
                                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TGROSAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'MSI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate<br>Comm.', dataIndex: 'RATESFEEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (Ext.util.Format.number(data.RATESFEE, '0,000.00') !== Ext.util.Format.number(data.RATESFEEC, '0,000.00')) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.ACCEAMOUC >= data.SFEEAMOUC - 0.5 && data.ACCEAMOUC <= data.SFEEAMOUC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT COMM<br>1 2', dataIndex: 'VATCOMMSIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.IVACOM12 >= data.VATCOMMSIC - 0.5 && data.IVACOM12 <= data.VATCOMMSIC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.VATCOMMSIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Commission Base',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Discount<br>Rate Comm.', dataIndex: 'DISCRATEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (Ext.util.Format.number(data.DISCRATE, '0,000.00') !== Ext.util.Format.number(data.DISCRATEC, '0,000.00')) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.DISCAMOUN >= data.DISCAMOUNC - 0.5 && data.DISCAMOUN <= data.DISCAMOUNC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (Ext.util.Format.number(data.DISCRATEI, '0,000.00') !== Ext.util.Format.number(data.DISCRATEIC, '0,000.00')) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                                    if (data.DISCAMOUNI >= data.DISCAMOUIC - 0.5 && data.DISCAMOUNI <= data.DISCAMOUIC + 0.5) {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    } else {
                                                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'First Inst. <br> Amou.Conc', dataIndex: 'FINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Subseq.Ins. <br> Amou.Conc', dataIndex: 'SINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'GROSAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGROSAMOUN_CB, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUN_CB_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUN_CB, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Currency<br>Settlement', dataIndex: 'IN_PCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Calculated<br>Commission ', dataIndex: 'DISCAMOSC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOSC, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSummaryTransactionError',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1170,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridSummaryTransactionError',
                                    width: 1170,
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
                                                text: 'Processing',
                                                id: prototype.id + '-htPreDateErrorTransaction',
                                                hidden: false,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'PRDA', width: 90,
                                                        listeners: {
                                                            click: 'setGridDataFiltroPDATE'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Total General',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Match', dataIndex: 'TGM', width: 100,
                                                        listeners: {
                                                            click: 'setGridDataFiltroTGM'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.TGM_TOTAL, '0,000');
                                                        }
                                                    },
                                                    {text: 'Pending', dataIndex: 'TGP', width: 100,
                                                        listeners: {
                                                            click: 'setGridDataFiltroTGP'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.TGP_TOTAL, '0,000');
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'PENDING_PERCENTAGE', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.PENDING_PERCENTAGE_TOTAL, '0,000.00') + '%';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transaction - No Complement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Match', dataIndex: 'TNCM', width: 100,
                                                        listeners: {
                                                            click: 'setGridDataFiltroTNCM'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#9CD2FF;';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.TNCM_TOTAL, '0,000');
                                                        }
                                                    },
                                                    {text: 'Pending', dataIndex: 'TNCP', width: 100,
                                                        listeners: {
                                                            click: 'setGridDataFiltroTNCP'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#9CD2FF;';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.TNCP_TOTAL, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Complements',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Plusgrade',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Match', dataIndex: 'CPLM', width: 100,
                                                                listeners: {
                                                                    click: 'setGridDataFiltroCPLM'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.CPLM_TOTAL, '0,000');
                                                                }
                                                            },
                                                            {text: 'Pending', dataIndex: 'CPLP', width: 100,
                                                                listeners: {
                                                                    click: 'setGridDataFiltroCPLP'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.CPLP_TOTAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Tablet',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Match', dataIndex: 'CTAM', width: 100,
                                                                listeners: {
                                                                    click: 'setGridDataFiltroCTAM'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.CTAM_TOTAL, '0,000');
                                                                }
                                                            },
                                                            {text: 'Pending', dataIndex: 'CTAP', width: 100,
                                                                listeners: {
                                                                    click: 'setGridDataFiltroCTAP'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.CTAP_TOTAL, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Ligas',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Match', dataIndex: 'CLIM', width: 100,
                                                                listeners: {
                                                                    click: 'setGridDataFiltroCLIM'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.CLIM_TOTAL, '0,000');
                                                                }
                                                            },
                                                            {text: 'Pending', dataIndex: 'CLIP', width: 100,
                                                                listeners: {
                                                                    click: 'setGridDataFiltroCLIP'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.CLIP_TOTAL, '0,000');
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
                            id: prototype.id + '-boxMainErrorTransaction',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1865,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainErrorTransaction',
                                    width: 1865,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing',
                                                id: prototype.id + '-htDateErrorTransaction',
                                                hidden: false,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Zone', dataIndex: 'ZONA', width: 50,
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                                                            metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Document<br>Type', dataIndex: 'descTDOC', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            },
                                            {text: 'Void', dataIndex: 'descVOID', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'DES_SMERCHANT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Flag<br>Complement', dataIndex: 'descFCOMPL', width: 90, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 95,
                                                        listeners: {
                                                            click: 'onViewPNR'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                        listeners: {
                                                            click: 'onViewPNRbySPNR'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Indust.Speci. <br> Ref.Nbr<br>TKT', dataIndex: 'ISREFNBR', width: 100,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Seller ID', dataIndex: 'SELLERID', width: 80, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Installment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Plan', dataIndex: 'NBRINSTA', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Number', dataIndex: 'INSTANBR', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Card<br>Account Number', dataIndex: 'SCARDN', width: 115,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales<br>Date', dataIndex: 'BSUMDATE', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID', dataIndex: 'TRANSID', width: 130, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sub.Gros.<br>Amoun P.Cur', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#B2DAFA";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 90,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUN_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#B2DAFA";
                                                    return value;
                                                }
                                            },
                                            {text: 'MSI', hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate<br>Comm.', dataIndex: 'RATESFEE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.SFEEAMOU_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Accel.<br>Amount', dataIndex: 'ACCEAMOU', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOU_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Comm.', dataIndex: 'ACCEAMOUC', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Commission Base', hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Discount<br>Rate', dataIndex: 'DISCRATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUN_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Transaction', hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TGROSAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'MSI',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Rate<br>Comm.', dataIndex: 'RATESFEEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Commission Base',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Discount<br>Rate Comm.', dataIndex: 'DISCRATEC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'First Inst. <br> Amou.Conc', dataIndex: 'FINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Subseq.Ins. <br> Amou.Conc', dataIndex: 'SINSAMOUC', width: 100, hidden: true,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Flag <br> Complement', dataIndex: 'descFCOMPL', width: 100, hidden: true,
                                            },
                                            {
                                                text: 'Error',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CERROR', width: 45},
                                                    {
                                                        text: 'Description', dataIndex: 'DES_CERROR', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
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
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1062,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDay',
                                    width: 1062,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
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
                                                            click: 'onGridDetMerchant'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTSAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank without Payment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sale', dataIndex: 'lngQPAS48', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                            ,
                                                            {
                                                                text: 'Refund', dataIndex: 'QBANKRFND', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Payment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'without Bank', dataIndex: 'lngQPAID', width: 100, id: prototype.id + '-label_3',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTOTWS', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b5d0f9";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'Quantity of',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Transactions', dataIndex: 'lngQTEF', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                            ,
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQTYDOC', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary3',
                                    width: 1062,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 200, id: prototype.id + '-lblTotD_QMATCH'},
                                        {width: 100, id: prototype.id + '-lngTotD_QDIFF'},
                                        {width: 100, id: prototype.id + '-lblTotD_QTOTSAL'},
                                        {width: 100, id: prototype.id + '-lblTotD_QPAS48'},
                                        {width: 100, id: prototype.id + '-totQBANKRFND2'},
                                        {width: 100, id: prototype.id + '-lblTotD_QPAID'},
                                        {width: 120, id: prototype.id + '-lblTotD_QTOTWS'},
                                        {width: 120, id: prototype.id + '-lblTotD_QTEF'},
                                        {width: 120, id: prototype.id + '-lblTotD_QTYDOC'}
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetMerchant',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1212,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetMerchant',
                                    width: 1212,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Status', dataIndex: 'STVAL', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Bank Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'DATEF', width: 100},
                                                    {text: 'Merchant', dataIndex: 'MERCHN', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50},
                                                    {text: 'Amount', dataIndex: 'dblAMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Bank Statement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'BDATEP', width: 100},
                                                    {text: 'Merchant', dataIndex: 'MERCHNR', width: 120},
                                                    {text: 'Curr.', dataIndex: 'ACURRENCY', width: 50},
                                                    {text: 'Amount', dataIndex: 'dblAMOUNTR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }

                                                ]
                                            },
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Trans', dataIndex: 'lngQTEF', width: 80},
                                                    {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 80},
                                                ]
                                            },
                                            {text: 'Transaction', dataIndex: 'strDescTTRAN', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescTTRAN + '"';
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
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary4',
                                    width: 1210,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 520, id: prototype.id + '-lblTotAMOUNT', align: 'center'},
                                        {width: 370, id: prototype.id + '-lblTotAMOUNTR', align: 'center'},
                                        {width: 80, id: prototype.id + '-lblTotM_QTEF', align: 'center'},
                                        {width: 80, id: prototype.id + '-lblTotM_QTYDOC', align: 'center'},
                                        {width: 160},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetBankByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1132,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetBankByS',
                                    width: 1132,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
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
                                                        text: 'Code', dataIndex: 'CBANK', width: 70,
                                                        listeners: {
                                                            click: 'OnGridDetDayByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                    ,
                                                    {text: 'Description', dataIndex: 'strDescripcion', width: 130}
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 100, //flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 90,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                }
                                            },
                                            {
                                                text: 'Bank Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sales', dataIndex: 'AMOUNTS', width: 130,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Refund', dataIndex: 'AMOUNTR', width: 130,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Net', dataIndex: 'DAMOUNT', width: 130,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.DAMOUNT !== record.data.SVFOP) ? metaData.style = "text-align:right;color:#c22428" : metaData.style = "text-align:right;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ECF6CE;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Quantity of',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transactions', dataIndex: 'lngQTEF', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Tickets', dataIndex: 'lngQTYDOC', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary5',
                                    width: 1132,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 300, id: prototype.id + '-lblTot_BS_QACCB'},
                                        {width: 720, id: prototype.id + '-lblTot_BS_QTEF'},
                                        {width: 110, id: prototype.id + '-lblTot_BS_QTYDOC'},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainAdjustment',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1730,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainAdjustment',
                                    width: 1730,
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
                                                id: prototype.id + '-htDateMainAdjustment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                    return value;
                                                }
                                            },
                                            /*{text: 'Source', dataIndex: 'RECTYPE', width: 130,
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:center;background-color:#B2DAFA";
                                             return value;
                                             }
                                             },*/
                                            {text: 'Status', dataIndex: 'desCERROR', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                                    }
                                                    return value;
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
                                                    /*{text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120, },
                                                     {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                     listeners: {
                                                     click: 'viewTicket'
                                                     },
                                                     renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                     value = '<b>' + value + '</b>';
                                                     metaData.style = "text-align:center;background-color:#FCF6DC";
                                                     return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                     }
                                                     },*/
                                                    {text: 'Merchant', dataIndex: 'SMERCHID', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'BSUMDATE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'CHADJNBR', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Reason <br> Code', dataIndex: 'CHAADJCOD', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {text: 'Description', dataIndex: 'CHAADJDES', width: 300,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;background-color:#FCF6DC";
                                                    metaData.tdAttr = 'data-qtip="' + data.CHAADJDES + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Curr.', dataIndex: 'PCURRENCY', width: 60, },
                                            {
                                                text: 'GROSS', dataIndex: 'GROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Discount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUN', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'NET', dataIndex: 'NETAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
//                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Result <br> Reconciliation<br>Summary',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainAdjustment').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Accounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ID', dataIndex: 'IDCON', width: 100,
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'STCON', width: 100,
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 100,
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
                                                        handler: 'onEditClick_adjustment'
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
                            id: prototype.id + '-boxDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 962,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDayBys',
                                    width: 962,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
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
                                                        text: 'Date', dataIndex: 'SDATE', width: 100,
                                                        listeners: {
                                                            click: 'OnGridDetMerchantByS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Bank Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sale', dataIndex: 'AMOUNTS', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Refund', dataIndex: 'AMOUNTR', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Net', dataIndex: 'DAMOUNT', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.DAMOUNT !== record.data.SVFOP) ? metaData.style = "text-align:right;color:#c22428" : metaData.style = "text-align:right;color:#244066";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 120, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetMerchant'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Quantity of',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transactions', dataIndex: 'lngQTEF', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    }
                                                    ,
                                                    {
                                                        text: 'Tickets', dataIndex: 'lngQTYDOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary6',
                                    width: 962,
                                    align: 'left',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 200, id: prototype.id + '-lblTot_DS_QACCB'},
                                        {width: 660, id: prototype.id + '-lblTot_DS_QTEF'},
                                        {width: 100, id: prototype.id + '-lblTot_DS_QTYDOC'},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetMerchantByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1352,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetMerchantBys',
                                    width: 1352,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Bank Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'TDATE', width: 100},
                                                    {text: 'Merchant',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'MERCHN', width: 90,
                                                                listeners: {
                                                                    click: 'OnGridByMerchant'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;color:#057ECB";
                                                                    metaData.tdAttr = 'data-qtip="' + data.MERCHN + '"';
                                                                    value = '<b>' + value + '<b>';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                },
                                                            },
                                                            {text: 'Description.', dataIndex: 'strDescMerchn', width: 130,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:left;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50},
                                                    {text: 'Amount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sale', dataIndex: 'AMOUNTS', width: 100,
                                                                listeners: {
                                                                    click: 'OnGridByMerchant'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                            }
                                                            ,
                                                            {
                                                                text: 'Refund', dataIndex: 'AMOUNTR', width: 100,
                                                                listeners: {
                                                                    click: 'OnGridByMerchant'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#c22428";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#F80000;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Net', dataIndex: 'DAMOUNT', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            }
                                                        ]

                                                    },
                                                ]
                                            },
                                            {text: 'Bank Statement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Payment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'BDATEP', width: 80},
                                                        ]
                                                    },
                                                    {text: 'Merchant',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'MERCHNR', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescMerchnR + '"';
                                                                    return value;
                                                                }
                                                            }
                                                        ]

                                                    },
                                                    {text: 'Curr.', dataIndex: 'ACURRENCY', width: 50},
                                                    {text: 'Amount', dataIndex: 'dblAMOUNTR', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescripcion', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Quantity',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Trans', dataIndex: 'lngQTEF', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Transaction', dataIndex: 'strDescTTRAN', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescTTRAN + '"';
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
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary7',
                                    width: 1352,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 470, id: prototype.id + '-lblTot_MS_AMOUNT', align: 'center'},
                                        {width: 100, id: prototype.id + '-totAMTRFND_F', align: 'center'},
                                        {width: 100, id: prototype.id + '-totDIFF_SVFOP_F', align: 'center'},
                                        {width: 300, id: prototype.id + '-lblTot_MS_AMOUNTR', align: 'center'},
                                        {width: 180, id: prototype.id + '-lblTot_MS_QTEF', align: 'center'},
                                        {width: 60, id: prototype.id + '-lblTot_MS_QTYDOC', align: 'center'},
                                        {width: 140},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxByMerchant',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1134,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridByMerchant',
                                    width: 1134,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70, },
                                            {text: 'Bank Code', dataIndex: 'CODEBANK', width: 70},
                                            {text: 'DATEF', dataIndex: 'DATEF', width: 80},
                                            {text: 'TIPOTAR', dataIndex: 'TIPOTAR', width: 80},
                                            {text: 'Card Code', dataIndex: 'SCARCOD', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strADescCard + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                                            {text: 'SAUTHOC', dataIndex: 'SAUTHOC', width: 80},
                                            {text: 'Doc Type', dataIndex: 'TDOC', width: 80},
                                            {text: 'Status', dataIndex: 'STVAL', width: 80},
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 80},
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Qty', dataIndex: 'QTYDOC', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 80},
                                            {text: 'Source', dataIndex: 'FTE', width: 80},
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary8',
                                    width: 1134,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 920, id: prototype.id + '-totSVFOP', align: 'center'},
                                        {width: 50, id: prototype.id + '-totQTYDOC', align: 'center'},
                                        {width: 160},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainChangePayment',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1500,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainChangePayment',
                                    width: 1475,
                                    height: 600,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Business<br>Date', dataIndex: 'BSUMDATE', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Installment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Plan', dataIndex: 'NBRINSTA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Document<br>Type', dataIndex: 'descTDOC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status<br>Settlement vs Sales', dataIndex: 'descSTVAL', width: 160,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card', dataIndex: 'SCARDN', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'PCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transact<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;background-color:" + data.COLOR;
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:right;background-color:" + data.COLOR;
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Submission<br>Merchant ID', dataIndex: 'SMERCHID', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;background-color:" + data.COLOR;
                                                    return value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 100,
                                                text: 'MSI Tracking',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-update',
                                                        tooltip: 'Msi Tracking',
                                                        handler: 'onMsiTracking'
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


