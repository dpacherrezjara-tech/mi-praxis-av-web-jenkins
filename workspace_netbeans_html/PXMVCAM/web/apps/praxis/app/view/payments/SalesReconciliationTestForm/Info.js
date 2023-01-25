Ext.define('Ext.Praxis.view.payments.SalesReconciliationTestForm.Info', {
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
                                        // <editor-fold defaultstate="collapsed" desc="boxMainData">
//                                        {
//                                            xtype: 'panel',
//                                            id: prototype.id + '-boxMainData',
//                                            hidden: false,
//                                            width: '100%',
//                                            bodyStyle: 'background: transparent;',
//                                            border: false,
//                                            layout: {
//                                                type: 'vbox',
//                                                align: 'center'
//                                            },
//                                            defaults: {
//                                                border: false,
//                                                height: '100%'
//                                            },
//                                            items: [
                                        //                                                // <editor-fold defaultstate="collapsed" desc="gridData">
//                                                {
//                                                    xtype: 'grid',
//                                                    id: prototype.id + '-gridData',
//                                                    width: 780,
//                                                    columnLines: true,
//                                                    features: [{
//                                                            ftype: 'summary'
//                                                        }],
//                                                    columns: {
//                                                        defaults: {
//                                                            menuDisabled: true,
//                                                            sortable: false,
//                                                            align: 'center'
//                                                        },
//                                                        items: [
//                                                            {
//                                                                text: 'Sales', flex: 1,
//                                                                id: prototype.id + '-adgSalDate',
//                                                                defaults: {
//                                                                    menuDisabled: true,
//                                                                    sortable: false,
//                                                                    align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {
//                                                                        text: 'Date', dataIndex: 'strFormatDate', /*flex: 1,*/ width: 90,
//                                                                        listeners: {
//                                                                            click: 'gridDetCountry_clickHandler'
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
//                                                                            value = '<b>' + value + '</b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            },
//                                                            {
//                                                                text: 'Sales Reconciliation',
//                                                                id: prototype.id + '-label_1',
//                                                                defaults: {
//                                                                    menuDisabled: true,
//                                                                    sortable: false,
//                                                                    align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {
//                                                                        text: 'Match',
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: false,
//                                                                            align: 'center'
//                                                                        },
//                                                                        columns: [
//                                                                            {
//                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 70,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
//                                                                                }
//                                                                            },
//                                                                            {
//                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 70,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
//                                                                                }
//                                                                            },
//                                                                            {
//                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 70, hidden: true,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQDIFF, '0,000');
//                                                                                }
//                                                                            }
//                                                                        ]
//                                                                    },
//                                                                    {
//                                                                        text: 'Sales',
//                                                                        id: prototype.id + '-label_2',
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: false,
//                                                                            align: 'center'
//                                                                        },
//                                                                        columns: [
//                                                                            {
//                                                                                text: 'w/o Reconcili.', dataIndex: 'lngQSALES', width: 90,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;color:#057ECB;";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
//                                                                                }
//                                                                            }
//                                                                        ]
//                                                                    },
//                                                                    {
//                                                                        text: 'Reconcili.',
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: false,
//                                                                            align: 'center',
//                                                                            hidden: true,
//                                                                        },
//                                                                        columns: [
//                                                                            {
//                                                                                text: 'w/o Sales', dataIndex: 'lngQACCB', width: 90, id: prototype.id + '-label_3',
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQACCB, '0,000');
//                                                                                }
//                                                                            }
//                                                                        ]
//                                                                    },
//                                                                    {
//                                                                        text: 'Total',
//                                                                        defaults: {
//                                                                            menuDisabled: true,
//                                                                            sortable: false,
//                                                                            align: 'center'
//                                                                        },
//                                                                        columns: [
//                                                                            {
//                                                                                text: 'by Ticket', dataIndex: 'lngQTOTSAL', width: 70,
//                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
//                                                                                    return Ext.util.Format.number(value, '0,000');
//                                                                                },
//                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                                    metaData.style = "text-align:right;";
//                                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                                    return Ext.util.Format.number(data.lngTotQTOTSAL, '0,000');
//                                                                                }
//                                                                            }
//                                                                        ]
//                                                                    }
//                                                                ]
//                                                            },
//                                                            {
//                                                                text: 'Bank Settlement',
//                                                                hidden: true,
//                                                                defaults: {
//                                                                    menuDisabled: true,
//                                                                    sortable: false,
//                                                                    align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {
//                                                                        text: 'Accepted', dataIndex: 'lngQACEP', width: 70,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#e6f4ff;";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQACEP, '0,000');
//                                                                        }
//                                                                    },
//                                                                    {
//                                                                        text: 'Rejected', dataIndex: 'lngQRECH', width: 70,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#e6f4ff;";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQRECH, '0,000');
//                                                                        }
//                                                                    },
//                                                                    {
//                                                                        text: 'Suspect', dataIndex: 'lngQSOSP', width: 70,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB;background:#e6f4ff;";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQSOSP, '0,000');
//                                                                        }
//                                                                    },
//                                                                    {
//                                                                        text: 'Pending', dataIndex: 'lngQTOTWS', width: 100,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#e6f4ff;";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQTOTWS, '0,000');
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            },
//                                                            {
//                                                                text: 'Settlement',
//                                                                defaults: {
//                                                                    menuDisabled: true,
//                                                                    sortable: false,
//                                                                    align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {
//                                                                        text: 'Other', dataIndex: 'lngQTHTEF', width: 80,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQTHTEF, '0,000');
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            },
//                                                            {
//                                                                text: 'Total',
//                                                                defaults: {
//                                                                    menuDisabled: true,
//                                                                    sortable: false,
//                                                                    align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {
//                                                                        text: 'by Ticket', dataIndex: 'lngQTOTBK', width: 80, align: 'right',
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return value;
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQTOTBK, '0,000');
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            },
//                                                            {
//                                                                text: 'Bank',
//                                                                defaults: {
//                                                                    menuDisabled: true,
//                                                                    sortable: false,
//                                                                    align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {
//                                                                        text: 'Payment', dataIndex: 'lngQPAID', width: 70,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQPAID, '0,000');
//                                                                        }
//                                                                    },
//                                                                    {
//                                                                        text: 'Clarifications', dataIndex: 'lngQCLAR', width: 80,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#fbb1af;";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQCLAR, '0,000');
//                                                                        }
//                                                                    },
//                                                                    {
//                                                                        text: 'Chargeback', dataIndex: 'lngQCHRG', width: 80,
//                                                                        listeners: {
//                                                                            click: 'gridDetCardCode_Pay_clickHandler',
//                                                                        },
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:right;color:#057ECB;background-color:#fbb1af;";
//                                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                        },
//                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                            metaData.style = "text-align:right;";
//                                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                            return Ext.util.Format.number(data.lngTotQCHRG, '0,000');
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            }
//                                                        ]
//                                                    }
//                                                }
//                                                // </editor-fold>
//                                            ]
//                                        },
                                        // </editor-fold>
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxCopyMainData',
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
                                                // <editor-fold defaultstate="collapsed" desc="gridCopyData">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridCopyData',
                                                    width: 1440,
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
                                                                id: prototype.id + '-adgCopySalDate',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'strFormatDate', /*flex: 1,*/ width: 90,
                                                                        listeners: {
                                                                            click: 'gridDetCountry_clickHandlerCopy'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                                            value = '<b>' + value + '</b>';
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Sales Reconciliation',
                                                                id: prototype.id + '-label_1Copy',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'by Ticket', dataIndex: 'lngQSALES', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 70,
                                                                                listeners: {
                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 70,
                                                                                listeners: {
                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_2Copy',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Reconcili.', dataIndex: 'lngQPEND', width: 90,
                                                                                listeners: {
                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQCOMPS', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPS, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQCOMPM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQCOMPP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPP, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Plusgrade',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQPLUSS', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSS, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQPLUSM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPLUSP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSP, '0,000');
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
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQTABES', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABES, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQTABEM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABEM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQTABEP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABEP, '0,000');
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
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQLIGEA', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEA, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQLIGEM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQLIGEP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEP, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Total Void',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Sales', dataIndex: 'lngQVSALES', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Match', dataIndex: 'lngQVMATCH', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVMATCH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Pending', dataIndex: 'lngQVPEND', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridCopyData').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVPEND, '0,000');
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
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCountry',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1210,
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
                                                                text: 'Country', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', width: 50, dataIndex: 'SCOUNTRY',
                                                                        listeners: {
                                                                            click: 'gridDetCard_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Name', flex: 1, /*width: 200,*/ dataIndex: 'strDescCountry',
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
                                                                text: 'Sales Reconciliation',
                                                                id: prototype.id + '-ahDetCtry',
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
                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 70, hidden: true,
                                                                                listeners: {
                                                                                    click: 'gridDetDayMainS_clickHandler',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQDIFF, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_4',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Reconciliation', dataIndex: 'lngQSALES', width: 90,
                                                                                listeners: {
                                                                                    click: 'gridDetDayMainS_clickHandler',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center',
                                                                            hidden: true
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Sales', dataIndex: 'lngQACCB', width: 90, id: prototype.id + '-label_5',
                                                                                listeners: {
                                                                                    click: 'gridDetDayMainS_clickHandler',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQACCB, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTOTSAL', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTSAL, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Bank Settlement',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Accepted', dataIndex: 'lngQACEP', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQACEP, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rejected', dataIndex: 'lngQRECH', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQRECH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Suspect', dataIndex: 'lngQSOSP', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSOSP, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Pending', dataIndex: 'lngQTOTWS', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTWS, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTOTBK', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTBK, '0,000');
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
                                                                        text: 'Other', dataIndex: 'lngQTHTEF', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTHTEF, '0,000');
                                                                        }
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
                                                                        text: 'Payment', dataIndex: 'lngQPAID', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#9dc2f9;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountry').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQPAID, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCountryCopy',
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
                                                //<editor-fold defaultstate="collapsed" desc="gridDetCountryCopy">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDetCountryCopy',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1630,
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
                                                                text: 'Country', flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', width: 50, dataIndex: 'SCOUNTRY',
                                                                        listeners: {
                                                                            click: 'gridDetCard_clickHandlerCopy'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Name', flex: 1, /*width: 200,*/ dataIndex: 'strDescCountry',
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
                                                                text: 'Sales Reconciliation',
                                                                id: prototype.id + '-ahDetCtryCopy',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'by Ticket', dataIndex: 'lngQSALES', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 70,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    //metaData.style = "text-align:right;color:#057ECB";
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 70,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    //metaData.style = "text-align:right;color:#057ECB";
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    //return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_4Copy',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Reconcili.', dataIndex: 'lngQPEND', width: 90,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    //metaData.style = "text-align:right;color:#057ECB;";
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    //return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQCOMPS', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPS, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQCOMPM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQCOMPP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPP, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Plusgrade',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQPLUSS', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSS, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQPLUSM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPLUSP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSP, '0,000');
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
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQTABES', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABES, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQTABEM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABEM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQTABEP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABEP, '0,000');
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
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQLIGEA', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEA, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQLIGEM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQLIGEP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEP, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Total Void',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Sales', dataIndex: 'lngQVSALES', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Match', dataIndex: 'lngQVMATCH', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVMATCH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Pending', dataIndex: 'lngQVPEND', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountryCopy').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVPEND, '0,000');
                                                                        }
                                                                    }
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
                                                    width: 1285,
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
                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', dataIndex: 'SCARDN', width: 120,
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
                                                    width: 1210,
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
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Description', flex: 1, /*width: 200,*/ dataIndex: 'strDescCard',
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
                                                                text: 'Sales Reconciliation',
                                                                id: prototype.id + '-ahDetCard',
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
                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 70, hidden: true,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQDIFF, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_6',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Reconciliation', dataIndex: 'lngQSALES', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            hidden: true,
                                                                            align: 'center',
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Sales', dataIndex: 'lngQACCB', width: 90, id: prototype.id + '-label_7',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQACCB, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTOTSAL', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTSAL, '0,000');
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
                                                                        text: 'Accepted', dataIndex: 'lngQACEP', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQACEP, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rejected', dataIndex: 'lngQRECH', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQRECH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Suspect', dataIndex: 'lngQSOSP', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSOSP, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Pending', dataIndex: 'lngQTOTWS', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTWS, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTOTBK', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTBK, '0,000');
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
                                                                        text: 'Other', dataIndex: 'lngQTHTEF', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTHTEF, '0,000');
                                                                        }
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
                                                                        text: 'Payment', dataIndex: 'lngQPAID', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#9dc2f9;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQPAID, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetCardCopy',
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
                                                    id: prototype.id + '-gridDetCardCopy',
                                                    bodyStyle: 'background: transparent;',
                                                    width: 1630,
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
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Description', flex: 1, /*width: 200,*/ dataIndex: 'strDescCard',
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
                                                                text: 'Sales Reconciliation',
                                                                id: prototype.id + '-ahDetCardCopy',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'by Ticket', dataIndex: 'lngQSALES', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 70,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    //metaData.style = "text-align:right;color:#057ECB";
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 70,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandlerCopy'
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    //metaData.style = "text-align:right;color:#057ECB";
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    //return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                    return value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_6Copy',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'w/o Reconcili.', dataIndex: 'lngQPEND', width: 90,
//                                                                                listeners: {
//                                                                                    click: 'gridDetCountryS_clickHandler'
//                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    //metaData.style = "text-align:right;color:#057ECB;";
                                                                                    metaData.style = "text-align:right";
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    //return '<a href="#payments-sales-reconciliation-test-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                                                                                    return  value;
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPEND, '0,000');
                                                                                }
                                                                            }
                                                                        ]
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
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQCOMPS', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPS, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQCOMPM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQCOMPP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQCOMPP, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Plusgrade',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQPLUSS', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSS, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQPLUSM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQPLUSP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQPLUSP, '0,000');
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
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQTABES', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABES, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQTABEM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABEM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQTABEP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#ece2c6";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQTABEP, '0,000');
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
                                                                            {
                                                                                text: 'Sales', dataIndex: 'lngQLIGEA', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEA, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Match', dataIndex: 'lngQLIGEM', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEM, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Pending', dataIndex: 'lngQLIGEP', width: 70,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;background-color:#FFFFCC";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQLIGEP, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Total Void',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Sales', dataIndex: 'lngQVSALES', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVSALES, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Match', dataIndex: 'lngQVMATCH', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVMATCH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Pending', dataIndex: 'lngQVPEND', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#def7d5";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCardCopy').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVPEND, '0,000');
                                                                        }
                                                                    }
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
                                            width: 830,
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
                                                    width: 780,
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
                                                            //resizable: true,
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
                                                                        text: 'Day', /*flex: 1*/ width: 90, dataIndex: 'SDATE',
                                                                        listeners: {
                                                                            click: 'gridDetTicket_clickHandler',
                                                                            args: ['']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Sales Reconciliation',
                                                                id: prototype.id + '-ahDetDay',
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
                                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['1']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQMANUAL', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['5']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 80, hidden: true,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['4']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQDIFF, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_8',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Reconciliation', dataIndex: 'lngQSALES', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['2']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQSALES, '0,000');
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center',
                                                                            hidden: true,
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Sales', dataIndex: 'lngQACCB', width: 90, id: prototype.id + '-label_9',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQACCB, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTOTSAL', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTSAL, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Void',
                                                                //id: prototype.id + '-ahDetDayVoid',
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
                                                                                text: 'Automatic', dataIndex: 'lngQVOIDMATCH', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['V1']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#c3d8fa;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQVOIDMATCH, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Manual', dataIndex: 'lngQVOIDMANUAL', width: 80,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['V5']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#c3d8fa;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQMANUAL, '0,000');
                                                                                }
                                                                            },
                                                                            {
                                                                                text: 'Diff', dataIndex: 'lngQVOIDDIFF', width: 80, hidden: true,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['V4']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#c3d8fa;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQVOIDDIFF, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Sales',
                                                                        id: prototype.id + '-label_8Void',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Reconciliation', dataIndex: 'lngQVOIDSALES', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetTicket_clickHandler',
                                                                                    args: ['V2']
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#c3d8fa;';
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQVOIDSALES, '0,000');
                                                                                }
                                                                            },
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: false,
                                                                            align: 'center',
                                                                            hidden: true,
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                text: 'without Sales', dataIndex: 'lngQACCB', width: 90, id: prototype.id + '-label_9',
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    Ext.util.Format.number(value, '0,000');
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;";
                                                                                    var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                                    return Ext.util.Format.number(data.lngTotQACCB, '0,000');
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQVOID', width: 70,
                                                                        listeners: {
                                                                            click: 'gridDetTicket_clickHandler',
                                                                            args: ['V']
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            value = Ext.util.Format.number(value, '0,000');
                                                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#c3d8fa;';
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQVOID, '0,000');
                                                                        }
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center',
                                                                    hidden: true,
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Accepted', dataIndex: 'lngQACEP', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQACEP, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Rejected', dataIndex: 'lngQRECH', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQRECH, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Suspect', dataIndex: 'lngQSOSP', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQSOSP, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Pending', dataIndex: 'lngQTOTWS', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background-color:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTWS, '0,000');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Total', dataIndex: 'lngQTOTBK', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#c8c3d5;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTOTBK, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Settlement',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center',
                                                                    hidden: true,
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Other', dataIndex: 'lngQTHTEF', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQTHTEF, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Bank',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center',
                                                                    hidden: true,
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Payment', dataIndex: 'lngQPAID', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;background:#9dc2f9;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetDay').getStore().getData().items[0].data;
                                                                            return Ext.util.Format.number(data.lngTotQPAID, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            }
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
                                                    width: 1365,
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
                                                                text: 'Ticket', //flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', /*flex: 1*/ width: 120, dataIndex: 'strTicket',
                                                                        listeners: {
                                                                            click: 'gridData_act1_clickHandler'
                                                                        },
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;background-color:#d5f4d5;';
                                                                            metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            metaData.unselectableAttr = "unselectable='off'";
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                                                text: 'Status', dataIndex: 'STVAL', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center',
                                                                    hidden: true
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
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Number', width: 120, dataIndex: 'strSCARDN',
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
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Amount', dataIndex: 'SVFOP', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'Liquidation<br>Amount', dataIndex: 'AVFOP', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
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
                                                                        text: 'Code', dataIndex: 'TRNCU', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45, hidden: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'RFIC', dataIndex: 'RFIS1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Complement', dataIndex: 'strFCOMPL', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
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
                                                                    return '<a href="#payments-sales-reconciliation-test-form"><img src="' + src + '"></a>';
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
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
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
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                            id: prototype.id + '-boxDetCountrySCopy',
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
                                                            id: prototype.id + '-gridDetCountrySCopy',
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
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetCountrySCopy').getStore().getData().items[0].data;
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
                                                                        id: prototype.id + '-label_10Copy',
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
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                                    return win.formatDblNumber(value);
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Reconcili.',
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
                                                            id: prototype.id + '-gridDetCSECopy',
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
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                                    click: 'gridDetCountrySEr_clickHandlerCopy',
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:right;color:#057ECB;font-weight:bold;";
                                                                                    value = win.formatLngNumber(value);
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                                            width: 750,
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
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
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
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                                    //width: 800,
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
                                                            width: 500,
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
                                                                                text: 'Day', dataIndex: 'SDATE', width: 100,
                                                                                listeners: {
                                                                                    click: 'gridDetTicketS_clickHandler'
                                                                                },
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;color:#057ECB;font-weight:bold;background-color:#d5f4d5;";
                                                                                    return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Quantity', dataIndex: 'lngQACCB', width: 90,
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
                                                                                    metaData.style = "text-align:right;color:" + color + ";";
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
                                                    width: 1535,
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
                                                                text: 'Ticket', // flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', /* flex: 1, */width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
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
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                                                text: 'Status', dataIndex: 'STVAL', width: 160,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Error',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center',
                                                                    hidden: true
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
                                                                text: 'Src', dataIndex: 'FTE', width: 50,
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
                                                                        text: 'Code', dataIndex: 'SCOUNTRY', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCountry + '"';
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
                                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                            metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
                                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
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
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Amount', dataIndex: 'SVFOP', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'Liquidation<br>Amount', dataIndex: 'AVFOP', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
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
                                                                        text: 'Code', dataIndex: 'SAGENT', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                text: 'Transaction',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Code', dataIndex: 'TRNCU', width: 90
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Days', dataIndex: 'lngDays', width: 45, hidden: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = Number(data.lngDays) >= 4 ? '#c22428' : '#2BC224';
                                                                    metaData.style = "text-align:center;color:" + color + ";";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'RFIC', dataIndex: 'RFIS1', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Complement', dataIndex: 'strFCOMPL', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center" + color + ";background-color:#b2e1ff;";
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
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + (Number(data.lngQOBS) > 1 ? 'View' : 'View') + '"';
                                                                    var src = Number(data.lngQOBS) > 1 ? 'resources/img/botones/16x16/1326498593_018.png' : 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#payments-sales-reconciliation-test-form"><img src="' + src + '"></a>';
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
                                                    width: 1380,
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
                                                                text: 'Ticket', //flex: 1,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    resizable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Number', /*flex: 1,*/ width: 120, dataIndex: 'strTicket', //enableTextSelection :true,
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
                                                                            return '<a href="#payments-sales-reconciliation-test-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                                                                text: 'Complement', dataIndex: 'strFCOMPL', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:center;color:" + color + ";background-color:#b2e1ff;";
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
                                                                text: 'PNR', dataIndex: 'SPNR', width: 75,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'SVFOP', width: 95,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = data.strPEM === 'SALES' ? '#64418c' : '#244066';
                                                                    metaData.style = "text-align:right;color:" + color + ";background-color:#b2e1ff;";
                                                                    return win.formatDblNumber(value);
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetTktMatch').getStore().getData().items[0].data;
                                                                    return win.formatDblNumber(data.dblTotSVFOP);
                                                                }
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
                                                                        text: 'Amount', dataIndex: 'AVFOP', width: 95,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = Number(data.SVFOP) !== Number(data.AVFOP) ? "#c22428" : "#244066";
                                                                            metaData.style = "text-align:right;color:" + color + ";";
                                                                            return win.formatDblNumber(value);
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;";
                                                                            var data = Ext.getCmp(prototype.id + '-gridDetTktMatch').getStore().getData().items[0].data;
                                                                            return win.formatDblNumber(data.dblTotAVFOP);
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
                                                                text: 'Days', dataIndex: 'lngDays', width: 45, hidden: true,
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
                                                                    return '<a href="#payments-sales-reconciliation-test-form"><img src="' + src + '"></a>';
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
                                                {xtype: 'tbspacer', width: 100},
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

