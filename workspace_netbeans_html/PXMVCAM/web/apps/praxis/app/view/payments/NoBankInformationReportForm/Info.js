//valor = '0';
Ext.define('Ext.Praxis.view.payments.NoBankInformationReportForm.Info', {
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
                    padding: '0px 250px 0px 0px',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 852,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 852,
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
                                                text: 'Sales',
                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
//                                                        listeners: {
//                                                            click: 'OnGridDetDay'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-no-bank-information-report-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement Reconciliation',
//                                                id: prototype.id+'-label_1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Match', dataIndex: 'lngQMATCH', width: 90,
//                                                        listeners: {
//                                                            click: 'OnGridDetDay'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-no-bank-information-report-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        }
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
                                                                text: 'without Paying', dataIndex: 'lngQSTWPY', width: 110,
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
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
                                                                text: 'Settlement', dataIndex: 'lngQPYWST', width: 110, 
//                                                                id: prototype.id + '-label_3',
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngTOTSET', width: 90,
//                                                            listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                            },
//                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                metaData.style = "text-align:right;background-color:#b5d0f9";
//                                                                value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                            }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Accepted',
//                                                        id: prototype.id+'-totTotal',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQACCEP', width: 90,
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB;";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Rejected',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQREJEC', width: 90, 
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Suspect',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQSUSPE', width: 90, 
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                }
                                                            }
                                                        ]
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
                                                                text: 'Tickets', dataIndex: 'lngTOTBNK', width: 90, 
//                                                                listeners: {
//                                                                    click: 'OnGridDetCardS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;color:#057ECB";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
//                                                                    return '<a href="#payments-no-bank-information-report-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
//                                                                }
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
                                    id: prototype.id + '-panelDataSummary',
                                    width: 852,
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

                                        {width: 180, id: prototype.id + '-lblTotQMATCH'},
                                        {width: 110, id: prototype.id + '-lblTotQSTWPY'},
                                        {width: 110, id: prototype.id + '-lblTotQPYWST'},
                                        {width: 90, id: prototype.id + '-lblTotTOTSET'},
                                        {width: 90, id: prototype.id + '-lblTotQACCEP'},
                                        {width: 90, id: prototype.id + '-lblTotQREJEC'},
                                        {width: 90, id: prototype.id + '-lblTotQSUSPE'},
                                        {width: 90, id: prototype.id + '-lblTotTOTBNK'}
                                    ]
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
                            width: 852,
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
                                    width: 852,
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


