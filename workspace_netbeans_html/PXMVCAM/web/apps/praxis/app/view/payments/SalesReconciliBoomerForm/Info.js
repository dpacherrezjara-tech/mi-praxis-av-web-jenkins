valor = '0';
Ext.define('Ext.Praxis.view.payments.SalesReconciliBoomerForm.Info', {
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
                            width: 572,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    width: 572,
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
                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'OnGridDetDay'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match', dataIndex: 'QMATCH', width: 80,
//                                                        listeners: {
//                                                            click: 'OnGridDetCardS'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return value;
//                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQMATCH, '0,000') + '<b>';
                                                        }
                                                    },
//                                                    {
//                                                        text: 'Settlement Reconciliation Boomer',
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        columns: [
                                                    {
                                                        text: 'Match Diff', dataIndex: 'QMATCH_DIFF', width: 90,
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                            return value;
//                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQMATCH_DIFF, '0,000') + '<b>';
                                                        }
                                                    },
//                                                        ]
//                                                    },
                                                    {
                                                        text: 'Payment SB',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'w/o Sales', dataIndex: 'QPAYMENT_WO', width: 100,
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return value;
//                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQPAYMENT_WO, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales w/o',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Payment SB', dataIndex: 'QSALES_WO', width: 100,
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return value;
//                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQSALES_WO, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'QTOTSAL', width: 100,
//                                                        id: prototype.id+'-lblTotQTOTWS',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAirport').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTOTSAL, '0,000') + '<b>';
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
                            id: prototype.id + '-panelDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1610,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetail',
                                    width: 1610,
                                    height: 630,
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
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-adgSalDate2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
//                                                        listeners: {
//                                                            click: 'OnGridDetDay'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'desSTVAL', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value !== 'Match') {
                                                        metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:left;";
                                                    }

                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Reference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'REFNBR', width: 90,
                                                        listeners: {
                                                            click: 'OnGridDetByRefNbr'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
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
                                                    {
                                                        text: 'Settlement', dataIndex: 'SVFOPS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'TOTCOMISI', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOTCOMISI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'IVA', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totIVA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Discount', dataIndex: 'TOT_DESC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOT_DESC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Net<br>Amount', dataIndex: 'NET', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNET, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sale', dataIndex: 'SVFOP', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Import', dataIndex: 'IMPORT', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, /*summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totIMPORT, '0,000.00') + '<b>';
                                                         }*/
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sett vs<br>Sales Diff.', dataIndex: 'difSVFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                    if (value < 0) {
                                                        metaData.style = "text-align:right;background-color:#FF6F6F";
                                                    } else {
                                                        metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    }
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totdifSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Import vs<br>Sales Diff.', dataIndex: 'difIMPORT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                    if (value < 0) {
                                                        metaData.style = "text-align:right;background-color:#FF6F6F";
                                                    } else {
                                                        metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    }
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, /*summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totdifIMPORT, '0,000.00') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'ADM', dataIndex: 'REVCON', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Import <br> Oracle', dataIndex: 'SVFOPOL', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPOL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
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
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', dataIndex: 'SCARDN', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            return value;
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
                            id: prototype.id + '-panelDetailByPNR',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1585,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetailByPNR',
                                    width: 1585,
                                    height: 630,
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
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
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
//                                                            click: 'OnGridDetDay'
//                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'desSTVAL', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value !== 'Match') {
                                                        metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:left;";
                                                    }

                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Reference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'REFNBR', width: 90,
                                                        listeners: {
                                                            click: 'OnGridDetByRefNbr'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
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
                                                    {
                                                        text: 'Settlement', dataIndex: 'SVFOPS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'TOTCOMISI', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOTCOMISI, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'IVA', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totIVA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Discount', dataIndex: 'TOT_DESC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTOT_DESC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Net<br>Amount', dataIndex: 'NET', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNET, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sale', dataIndex: 'SVFOP', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Import', dataIndex: 'IMPORT', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        }, /*summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                         var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                         metaData.style = 'text-align:right; margin-right:3px ';
                                                         return '<b>' + Ext.util.Format.number(data.totIMPORT, '0,000.00') + '<b>';
                                                         }*/
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sett vs<br>Sales Diff.', dataIndex: 'difSVFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                    if (value < 0) {
                                                        metaData.style = "text-align:right;background-color:#FF6F6F";
                                                    } else {
                                                        metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    }
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totdifSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Import vs<br>Sales Diff.', dataIndex: 'difIMPORT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                                    if (value < 0) {
                                                        metaData.style = "text-align:right;background-color:#FF6F6F";
                                                    } else {
                                                        metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    }
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, /*summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDetailByPNR').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totdifIMPORT, '0,000.00') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'ADM', dataIndex: 'REVCON', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Import <br> Oracle', dataIndex: 'SVFOPOL', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                }, 
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
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
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Card Number', dataIndex: 'SCARDN', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.', dataIndex: 'SAUTHOC', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                                                            return value;
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
                            bodyStyle: 'background-color: #E3EAEF;',
                            id: prototype.id + '-panelGridDataByRefNbr',
                            border: true,
//                            height: 'auto',
                            width: 1500,
                            height: 800,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelSettBoomer',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
//                            height: 'auto',
                                    width: 1488,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataSettlement',
                                            width: 734,
                                            height: 250,
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
                                                        text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'SRC', dataIndex: 'descTDOCA', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FFFFFF";
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
                                                                        text: 'Cod', dataIndex: 'SCARCODA', width: 40,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#FFFFFF";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Number', dataIndex: 'SCARDNA', width: 140,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#FFFFFF";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOCA', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#FFFFFF;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Bank', dataIndex: 'BANKA', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#FFFFFF";
                                                                            return value;
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cur', dataIndex: 'SCURRENCYA', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#FFFFFF";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Sales', dataIndex: 'SVFOPA', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFFFFF";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                    return value;
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPA, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total<br>Net', dataIndex: 'SVFOPN', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFFFFF";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                    return value;
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Payments',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#B2DAFA";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Amount', dataIndex: 'SVFOPAB', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPAB, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Comissions',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'General<br>Comission Pay', dataIndex: 'GENCOMIPAY', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totGENCOMIPAY, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Comission<br>Provision', dataIndex: 'COMISIPROV', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCOMISIPROV, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Cost Count<br>Verification', dataIndex: 'COSTVERIFI', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCOSTVERIFI, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Value<br>Collection', dataIndex: 'VALCOLLECT', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totVALCOLLECT, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total<br>Comission', dataIndex: 'TOTCOMISI', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totTOTCOMISI, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'IVA<br>Comission', dataIndex: 'IVA', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                            return value;
                                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridDataSettlement').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totIVA, '0,000.00') + '<b>';
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                            /*{
                                                             text: 'Payment <br> Type', dataIndex: 'TPAYA', width: 90,
                                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                             metaData.style = "text-align:center;background-color:#B2DAFA";
                                                             return value;
                                                             }
                                                             },
                                                             {
                                                             text: 'ABCD', dataIndex: 'ABCDA', width: 60,
                                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                             metaData.style = "text-align:center;background-color:#B2DAFA";
                                                             return value;
                                                             }
                                                             },
                                                             {
                                                             text: 'Filler MD', dataIndex: 'SCURRENCYA', width: 80,
                                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                             metaData.style = "text-align:center;background-color:#B2DAFA";
                                                             return value;
                                                             }
                                                             },*/
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataBoomer',
                                            width: 754,
                                            height: 250,
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
                                                        text: 'Boomer',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Credit Card',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'SCARCODB', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#B2FAC6";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Card Number', dataIndex: 'SCARDNB', width: 120,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#B2FAC6";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Author.', dataIndex: 'SAUTHOCB', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Bank', dataIndex: 'CHANNELID', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#B2FAC6";
                                                                            return value;
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Difference', dataIndex: '', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                    return value;
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataBoomer').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.difSVFOP, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Cur', dataIndex: 'SCURRENCYB', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#B2FAC6";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOPB', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                                    return value;
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataBoomer').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totSVFOPB, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            /*{
                                                             text: 'Transaction <br> Type', dataIndex: 'TDOCB', width: 90,
                                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                             metaData.style = "text-align:center;background-color:#B2FAC6";
                                                             return value;
                                                             }
                                                             },                                                    
                                                             {
                                                             text: 'Document <br> Type', dataIndex: 'DOCTYPEB', width: 70,
                                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                             metaData.style = "text-align:center;background-color:#B2FAC6";
                                                             return value;
                                                             }
                                                             },*/
                                                            {
                                                                text: 'Ticket', dataIndex: 'TKT', width: 100,
                                                                listeners: {
                                                                    click: 'showTicket'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;background-color:#B2FAC6";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'PNR', dataIndex: 'SPNRB', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#B2FAC6";
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
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                    ]
                                },
                                {xtype: 'tbspacer', height: 25},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelPNR',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    //hidden: true,
//                            height: 'auto',
                                    width: 540,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataPNRInHeader',
                                            width: 594,
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
                                                    /*{
                                                     text: 'Passenger Name', dataIndex: 'A720PAX',  width: 280,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:left;";
                                                     return value;
                                                     },
                                                     },*/
                                                    {
                                                        text: 'Ticket Number', dataIndex: 'TICKET', width: 150,
                                                        listeners: {
                                                            click: 'showTicket_2'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#B2FAC6";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'CC Number', dataIndex: 'A1531NREF', width: 180
                                                    },
                                                    /*{
                                                     text: 'Issue<br/>Orig.', dataIndex: 'A720CIUVTA', width: 60
                                                     },
                                                     {
                                                     text: 'Issue Date', dataIndex: 'A720FECVTA', width: 80
                                                     },*/
                                                    {
                                                        text: 'IATA', dataIndex: 'A720AGENTE', width: 80
                                                    },
                                                    /*{
                                                     text: 'Fare', dataIndex: 'A720TARIFA', width: 120,
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;";
                                                     return value;
                                                     }
                                                     },*/
                                                    {
                                                        text: 'Amount', dataIndex: 'A1531VFOP', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataPNRInHeader').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totA1531VFOP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                            /*{
                                                             text: 'Cur', dataIndex: 'A720MONEDA', width: 40
                                                             },
                                                             {
                                                             text: 'PNR', dataIndex: 'A720PNR', width: 80, editor: {xtype: 'textfield', editable: false}
                                                             },*/
                                                ]
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelAccounting',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: true,
                                    hidden: true,
                                    height: 'auto',
                                    width: 1500,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataAccounting',
                                            width: 1500,
                                            height: 350,
                                            //layout: 'fit',
                                            //overflowY: 'scroll',
                                            resizable: {
                                                handles: 's'
                                            },
                                            border: true,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'MODE', dataIndex: 'A1716MODO', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = 'text-align:right;';

                                                            var rtn = '';
                                                            switch (data.A1716MODO.trim()) {
                                                                case 'S':
                                                                    rtn = 'SALE';
                                                                    break;
                                                                case 'M':
                                                                    rtn = 'MEMO';
                                                                    break;
                                                                case 'J':
                                                                    rtn = 'EXCH';
                                                                    break;
                                                                case 'I':
                                                                    rtn = 'TAXC';
                                                                    break;
                                                                case 'R':
                                                                    rtn = 'RFND';
                                                                    break;
                                                                case 'F':
                                                                    rtn = 'FLWN';
                                                                    break;
                                                                case 'C':
                                                                    rtn = 'EXPI';
                                                                    break;
                                                                case 'L':
                                                                    rtn = 'IPAY';
                                                                    break;
                                                                default:
                                                                    rtn = data.A1716MODO.trim();
                                                            }

                                                            return rtn;
                                                        }
                                                    },
                                                    {
                                                        text: 'TICKET', dataIndex: 'TICKET', width: 100
                                                    },
                                                    {
                                                        text: 'SRC', dataIndex: 'A1716FUENT', width: 40
                                                    },
                                                    {
                                                        text: 'SUB<br>SRC', dataIndex: 'A1716SUBFU', width: 40
                                                    },
                                                    {
                                                        text: 'FOP', dataIndex: 'A1716FP', width: 40
                                                    },
                                                    {
                                                        text: 'CPN', dataIndex: 'A1716CUPON', width: 40
                                                    },
                                                    {
                                                        text: 'SEQ', dataIndex: 'A1716SEQ', width: 40
                                                    },
                                                    {
                                                        text: 'ACCOUNTING',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'DATE', dataIndex: 'A1716FPRO', width: 70
                                                            },
                                                            {
                                                                text: 'PERIOD', dataIndex: 'A1716FCONT', width: 70
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'ACCOUNT NUMBER', dataIndex: 'A1716CUENT', width: 277, /*flex: 1,*/
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'font-family:"Courier New";';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'LOCAL AMOUNT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'CURR', dataIndex: 'A1716CUR', width: 50
                                                            },
                                                            {
                                                                text: 'DEBIT', dataIndex: 'A1716ACTIV', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = 'text-align:right;';
                                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1716ACTIV, '0,000.00') : '';
                                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'CREDIT', dataIndex: 'A1716PASIV', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = 'text-align:right;';
                                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1716PASIV, '0,000.00') : '';
                                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'REVENUE AMOUNT',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'CURR', dataIndex: 'A1716CURRV', width: 50
                                                            },
                                                            {
                                                                text: 'DEBIT', dataIndex: 'A1716ACTRV', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = 'text-align:right;';
                                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'CREDIT', dataIndex: 'A1716PASRV', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = 'text-align:right;';
                                                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                                                    return value; // Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'CONCEPT', dataIndex: 'A1716TITU', width: 245,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'CLIENT', dataIndex: 'A1716COPE', width: 80
                                                    },
                                                    /*{
                                                     text: 'PROVIDER', dataIndex: 'A1716PROV', width: 80
                                                     },*/
                                                    {
                                                        text: 'JOURNAL<br>ENTRY', dataIndex: 'A1716IDCON', width: 80
                                                    },
                                                    {
                                                        text: 'EXCHANGE<br>RATE', dataIndex: 'A720ROE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1530TCAMB, '0,000.000000') : '';
                                                            return Ext.util.Format.number(value, '0,000.000000');
                                                        }
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
                            id: prototype.id + '-boxDetDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 472,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDay',
                                    width: 472,
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
                                                id: prototype.id + '-adghFechaDay',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Day', dataIndex: 'SDATE', width: 100,
                                                        listeners: {
                                                            click: 'OnGridDetCardNbr'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
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
                                                                text: 'Auto', dataIndex: 'lngQMATCH', width: 80,
                                                                listeners: {
                                                                    click: 'OnGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 90,
                                                                listeners: {
                                                                    click: 'OnGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQMANUAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Settlement',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'without Paying', dataIndex: 'lngQTEF', width: 100,
                                                                listeners: {
                                                                    click: 'OnGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQTEF, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Paying without',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Settlement', dataIndex: 'lngQPAS48', width: 100,
                                                                listeners: {
                                                                    click: 'OnGridDetCardS'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB;background-color:#d5f4d5";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.lngTotQPAS48, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary2',
//                                    width: 474,
//                                    align: 'left',
//                                    margin: '0 0 0 0 ',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '' + '&nbsp',
//                                        height: 25,
//                                        padding: '5 5 5 0',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//
//                                        {width: 180, id: prototype.id + '-lblTotDD_QMATCH'},
//                                        {width: 90, id: prototype.id + '-lblTotDD_QMANUAL'},
//                                        {width: 100, id: prototype.id + '-lblTotDD_QTEF'},
//                                        {width: 100, id: prototype.id + '-lblTotDD_QPAS48'},
//                                    ]
//                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCardNbr',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1122,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCardNbr',
                                    width: 1122,
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
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 180,
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 100},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SCARCOD', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'SCARDN', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Author.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SAUTHOC', width: 100}
                                                ]
                                            },
                                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 80},
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 130,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardNbr').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Reference',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Number', dataIndex: 'REFBOOMER', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.REFBOOMER + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 50,
                                                text: 'View',
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
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary3',
//                                    width: 1122,
//                                    align: 'left',
//                                    margin: '0 0 0 0 ',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '' + '&nbsp',
//                                        height: 25,
//                                        padding: '5 5 5 0',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//
//                                        {width: 950, id: prototype.id + '-lblTotSVFOP', align: 'center'},
//                                        {width: 170},
//                                    ]
//                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCardByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 572,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCardByS',
                                    width: 572,
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
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        listeners: {
                                                            click: 'OnGridDetDayS'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + Ext.util.Format.number(value) + '<b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescCard', width: 220,
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
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 90},
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary4',
//                                    width: 574,
//                                    align: 'left',
//                                    margin: '0 0 0 0 ',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '' + '&nbsp',
//                                        height: 25,
//                                        padding: '5 5 5 0',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//
//                                        {width: 360, id: prototype.id + '-lblTotC_SCant'},
//                                        {width: 210, id: prototype.id + '-lblTotC_SVFOP'},
//                                    ]
//                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDayByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 572,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDayByS',
                                    width: 572,
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
                                                text: 'Day', dataIndex: 'SDATE', width: 150,
                                                listeners: {
                                                    click: 'OnGridDetCardNbrS'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;background-color:#d5f4d5;";
                                                    value = '<b>' + Ext.util.Format.number(value) + '<b>';
                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQACCB, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 130},
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 170,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetDayByS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotSVFOP, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary5',
//                                    width: 454,
//                                    align: 'left',
//                                    margin: '0 0 0 0 ',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '' + '&nbsp',
//                                        height: 25,
//                                        padding: '5 5 5 0',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//
//                                        {width: 200, id: prototype.id + '-lblTotD_SCant'},
//                                        {width: 250, id: prototype.id + '-lblTotD_SVFOP'},
//                                    ]
//                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCardNbrBySMatch',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1272,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCardNbrBySMatch',
                                    width: 1272,
                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 150, //flex: 1
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                    return value;
                                                }
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
                                                        text: 'Number', dataIndex: 'MERCHN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Author.',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'SAUTHOC', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                            return value;
                                                                        },
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'BCARCOD', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Number', dataIndex: 'BCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'BCURRENCY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'DAMOUNT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Reference',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                        },
                                                        columns: [
                                                            {text: 'Number', dataIndex: 'REFBOOMER', width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.REFBOOMER + '"';
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
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
                                    id: prototype.id + '-panelDataSummary6',
                                    width: 1274,
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
                                        {width: 800},
                                        {width: 290},
                                        {width: 180},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCardNbrByS',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1272,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCardNbrByS',
                                    width: 1272,
                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 150,
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
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
                                                    {text: 'Code', dataIndex: 'strDescripcion', width: 160,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Author.',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'SAUTHOC', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                            return value;
                                                                        },
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'BCARCOD', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Number', dataIndex: 'BCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'BCURRENCY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'DAMOUNT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Reference',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                        },
                                                        columns: [
                                                            {text: 'Number', dataIndex: 'REFBOOMER', width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.REFBOOMER + '"';
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
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
                                    id: prototype.id + '-panelDataSummary9',
                                    width: 1274,
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
                                        {width: 800},
                                        {width: 290},
                                        {width: 180},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1207,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTicket',
                                    width: 1207,
                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 130,
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 110,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
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
                                                    {text: 'Code', dataIndex: 'CBANK', width: 80}
                                                ]
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 80},
                                            {text: 'Card Number', dataIndex: 'ACARDN', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.ACARDN + '"';
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
                                                    {text: 'Code', dataIndex: 'SAUTHOC', width: 70}
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
                                                    {text: 'Number', dataIndex: 'MERCHN', width: 80}
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
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 55},
                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Currency', dataIndex: 'BCURRENCY', width: 55},
                                                    {text: 'Amount', dataIndex: 'AVFOP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Currency', dataIndex: 'ACURRENCY', width: 55},
                                                    {text: 'Amount', dataIndex: 'DAMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
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
                                                    {text: 'Date', dataIndex: 'BDATEP', width: 90}
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary15',
                                    width: 1207,
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
                                        {width: 815},
                                        {width: 145},
                                        {width: 155},
                                        {width: 90}
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
                            width: 1283,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetByPNR',
                                    width: 1283,
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
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 150, //flex: 1
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Author.',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Code', dataIndex: 'SAUTHOC', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                                            return value;
                                                                        },
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Credit Card',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Code', dataIndex: 'BCARCOD', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Number', dataIndex: 'BCARDN', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Curr.', dataIndex: 'BCURRENCY', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'DAMOUNT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#D7F1FB;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Reference',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                        },
                                                        columns: [
                                                            {text: 'Number', dataIndex: 'REFBOOMER', width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;background-color:#D7F1FB;";
                                                                    metaData.tdAttr = 'data-qtip="' + data.REFBOOMER + '"';
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
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
                            id: prototype.id + '-panelGridDataHeader',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1525,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataHeader',
                                    height: 600,
                                    width: 1525,
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
                                                text: 'Settlement <br> Date', dataIndex: 'strFormatDate', width: 80, //flex: 1
                                                listeners: {
                                                    click: 'OnGridDetHeader'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Period', dataIndex: 'WEEKMO', width: 50,
                                                listeners: {
                                                    click: 'OnGridDetHeaderByPeriod'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Initial <br> Date', dataIndex: 'DATSFROM', width: 80, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Final <br> Date', dataIndex: 'DATSTO', width: 80, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status', dataIndex: 'descSTVAL', width: 70, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.STVAL === '') {
                                                        metaData.style = "text-align:left;background-color:#F7BD56;";
                                                    } else if (record.data.STVAL === '1') {
                                                        metaData.style = "text-align:left;background-color:#C6E5B1;";
                                                    } else if (record.data.STVAL === '2') {
                                                        metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            /*{
                                             text: 'Type', dataIndex: 'descTREG', width: 120, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:left;background-color:#D7F1FB;";
                                             return value;
                                             }
                                             },*/
                                            {text: 'Settlement Header',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commissions', dataIndex: 'AMTCOM', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'AMTIVA', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount to <br> be settled', dataIndex: 'AMTSET', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Settlement Conciliation Header vs Detail',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commissions', dataIndex: 'AMTCOMC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'AMTIVAC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount to <br> be settled', dataIndex: 'AMTSETC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Settlement vs Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'descSTVALC', width: 70, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.STVAL === '') {
                                                                metaData.style = "text-align:left;background-color:#F7BD56;";
                                                            } else if (record.data.STVALC === '1') {
                                                                metaData.style = "text-align:left;background-color:#C6E5B1;";
                                                            } else if (record.data.STVALC === '2') {
                                                                metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPB', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Autom.', dataIndex: 'QTYMATCH', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'QTYMATMAN', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'diff.', dataIndex: 'QTYMATDIF', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value > 0) {
                                                                        metaData.style = "text-align:right;color:#e61212";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Payment SB <br> w/o Sales', dataIndex: 'QTYSETSAL', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value > 0) {
                                                                metaData.style = "text-align:right;color:#e61212";
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                                    /*{
                                                     text: 'Account to <br> deposit', dataIndex: 'ACCNBR', width: 140, //flex: 1
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
                            id: prototype.id + '-panelGridDataHeaderDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1320,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataHeaderDetail',
                                    width: 1320,
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
                                                text: 'Sale <br> Date', dataIndex: 'SDATE', width: 90, //flex: 1
                                                listeners: {
                                                    click: 'OnGridDetDayFromHeader'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "color:#057ECB;";
                                                    //value = '<b>' + value + '</b>';
                                                    //return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    if (record.data.TREG === 'SG') {
                                                        return "TOTAL";
                                                    } else {
                                                        metaData.style = "color:#057ECB;";
                                                        value = '<b>' + value + '</b>';
                                                        return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    }
                                                }
                                            },
                                            /*{
                                             text: 'Period', dataIndex: 'WEEKMO', width: 100, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },*/
                                            {
                                                text: 'Status', dataIndex: 'descSTVAL', width: 70, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.STVAL === '') {
                                                        metaData.style = "text-align:left;background-color:#F7BD56;";
                                                    } else if (record.data.STVAL === '1') {
                                                        metaData.style = "text-align:left;background-color:#C6E5B1;";
                                                    } else if (record.data.STVAL === '2') {
                                                        metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            /*{
                                             text: 'Initial <br> Date', dataIndex: 'DATSFROM', width: 100, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },
                                             {
                                             text: 'Final <br> Date', dataIndex: 'DATSTO', width: 100, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },*/
                                            /*{
                                             text: 'Type', dataIndex: 'descTREG', width: 120, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:left;background-color:#D7F1FB;";
                                             return value;
                                             }
                                             },*/
                                            {text: 'Settlement Header',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commissions', dataIndex: 'AMTCOM', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'AMTIVA', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount to <br> be settled', dataIndex: 'AMTSET', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Settlement Conciliation Header vs Detail',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commissions', dataIndex: 'AMTCOMC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'AMTIVAC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount to <br> be settled', dataIndex: 'AMTSETC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Settlement vs Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'descSTVALC', width: 70, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.STVALC === '') {
                                                                metaData.style = "text-align:left;background-color:#F7BD56;";
                                                            } else if (record.data.STVALC === '1') {
                                                                metaData.style = "text-align:left;background-color:#C6E5B1;";
                                                            } else if (record.data.STVALC === '2') {
                                                                metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPB', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Autom.', dataIndex: 'QTYMATCH', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'QTYMATMAN', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'diff.', dataIndex: 'QTYMATDIF', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value > 0) {
                                                                        metaData.style = "text-align:right;color:#e61212";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Payment SB <br> w/o Sales', dataIndex: 'QTYSETSAL', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value > 0) {
                                                                metaData.style = "text-align:right;color:#e61212";
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                                    /*{
                                                     text: 'Account to <br> deposit', dataIndex: 'ACCNBR', width: 140, //flex: 1
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     return value;
                                                     }
                                                     },*/
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', height: 50},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataHeaderDetailTotal',
                                    width: 1320,
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
                                            /*{
                                             text: 'Sale <br> Date', dataIndex: 'SDATE', width: 90, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             //metaData.style = "color:#057ECB;";
                                             //value = '<b>' + value + '</b>';
                                             //return '<a href="#payments-sales-reconcili-boomer-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                             return value
                                             }
                                             },*/
                                            /*{
                                             text: 'Period', dataIndex: 'WEEKMO', width: 100, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },*/

                                            /*{
                                             text: 'Initial <br> Date', dataIndex: 'DATSFROM', width: 100, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },
                                             {
                                             text: 'Final <br> Date', dataIndex: 'DATSTO', width: 100, //flex: 1
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             return value;
                                             }
                                             },*/
                                            {
                                                text: 'Type', dataIndex: 'descTREG', width: 90, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;background-color:#D7F1FB;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status', dataIndex: 'descSTVAL', width: 70, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.STVAL === '') {
                                                        metaData.style = "text-align:left;background-color:#F7BD56;";
                                                    } else if (record.data.STVAL === '1') {
                                                        metaData.style = "text-align:left;background-color:#C6E5B1;";
                                                    } else if (record.data.STVAL === '2') {
                                                        metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commissions', dataIndex: 'AMTCOM', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'AMTIVA', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount to <br> be settled', dataIndex: 'AMTSET', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Settlement Conciliation Header vs Detail',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPB', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commissions', dataIndex: 'AMTCOMC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'AMTIVAC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount to <br> be settled', dataIndex: 'AMTSETC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Settlement vs Boomer',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'descSTVALC', width: 70, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.STVALC === '') {
                                                                metaData.style = "text-align:left;background-color:#F7BD56;";
                                                            } else if (record.data.STVALC === '1') {
                                                                metaData.style = "text-align:left;background-color:#C6E5B1;";
                                                            } else if (record.data.STVALC === '2') {
                                                                metaData.style = "text-align:left;background-color:#FF6F6F;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOPC', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center',
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Autom.', dataIndex: 'QTYMATCH', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Manual', dataIndex: 'QTYMATMAN', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'diff.', dataIndex: 'QTYMATDIF', width: 60, //flex: 1
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if (value > 0) {
                                                                        metaData.style = "text-align:right;color:#e61212";
                                                                    } else {
                                                                        metaData.style = "text-align:right;";
                                                                    }
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Payment SB <br> w/o Sales', dataIndex: 'QTYSETSAL', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value > 0) {
                                                                metaData.style = "text-align:right;color:#e61212";
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                                    /*{
                                                     text: 'Account to <br> deposit', dataIndex: 'ACCNBR', width: 140, //flex: 1
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
                            id: prototype.id + '-panelGridDataHeaderDetailByPeriod',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1750,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbLayout',
                                    fieldStyle: 'text-align:left;',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code', displayField: 'name',
                                    value: "first",
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["first", "First Layout"], ["second", "Second Layout"],
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 120,
                                    anchor: '100%',
                                    margin: '10 0 0 0',
                                    listeners: {
                                        change: 'cmbLayout_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', height: 15},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataHeaderDetailByPeriod',
                                    width: 824,
                                    height: 630,
                                    hidden: false,
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
                                            {text: 'Account', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                        return "*123456"
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                        return "*8221"
                                                    }
                                                    ;
                                                }
                                            },
                                            {text: 'Client <br> Number', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "2103";
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Document <br> Type', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "F";
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:right;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:right;";
                                                    }
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Exchange <br> Rate', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                            {text: 'Value <br> Type', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                            {text: 'Date', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                            {text: 'Description', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                            {text: 'Reference', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataHeaderDetailByPeriod2nd',
                                    hidden: true,
                                    width: 1500,
                                    height: 630,
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
                                                text: 'Control',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: '', width: 60, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }

                                                            return "";
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Operative',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Unit', dataIndex: '', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            return "02_AEROVIAS";
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Origin Transaction', width: 130,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    metaData.style = "text-align:center";

                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                        return "*123456";
                                                    } else {
                                                        return "*212477-85900389722";
                                                    }

                                                }
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Available', dataIndex: 'totSVFOP', width: 90, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            metaData.style = "text-align:center";
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                                value = data.totSVFOP_COMPLEMENTO;
                                                            } else {
                                                                value = data.totSVFOP;
                                                            }
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'TRX',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Currency', dataIndex: '', width: 70, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            value = "MXN";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Type', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    metaData.style = "text-align:center";

                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                        return "NC";
                                                    } else {
                                                        return "R";
                                                    }
                                                }
                                            },
                                            {text: 'Status', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "N/A";
                                                }
                                            },
                                            {text: 'Account', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "*8221";
                                                }
                                            },
                                            {
                                                text: 'Client',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: '', width: 60, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            return "2103";
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Destination<br>Transaction', dataIndex: 'SPNR', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Document',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Type', dataIndex: '', width: 70, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            return "F";
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: '', width: 70, //flex: 1
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "MXN";
                                                }
                                            },
                                            {
                                                text: 'Client',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: '', width: 60, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            return "2103";
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount to',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Apply', dataIndex: 'SVFOP', width: 80, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:right;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            return value;
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Aggregate', dataIndex: 'SVFOP_ACUMULADO', width: 80, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:right;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Exchange',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate', dataIndex: '', width: 70, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            return "";
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center',
                                                },
                                                columns: [
                                                    {
                                                        text: 'Value', dataIndex: '', width: 60, //flex: 1
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                            if (data.FCOMPLEMENTO === '1') {
                                                                metaData.style = "text-align:center;background-color:#FD7355";
                                                            } else {
                                                                metaData.style = "text-align:center;";
                                                            }
                                                            return "";
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Date', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                            {text: 'Description', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
                                                }
                                            },
                                            {text: 'Reference', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataHeaderDetailByPeriod2nd').getStore().getData().items[rowIndex].data;
                                                    if (data.FCOMPLEMENTO === '1') {
                                                        metaData.style = "text-align:center;background-color:#FD7355";
                                                    } else {
                                                        metaData.style = "text-align:center;";
                                                    }
                                                    return "";
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


