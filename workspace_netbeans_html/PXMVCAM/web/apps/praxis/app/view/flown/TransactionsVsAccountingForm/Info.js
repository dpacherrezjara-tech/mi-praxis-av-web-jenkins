//valor = '0';
Ext.define('Ext.Praxis.view.flown.TransactionsVsAccountingForm.Info', {
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1442,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1442,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Nbr', dataIndex: 'RN', width: 40},
                                            {text: 'Ticket', dataIndex: 'TKTASO', width: 150},
                                            {text: 'Flight Date', dataIndex: 'DFLIGHT', width: 75},
                                            {text: 'Flight Nbr', dataIndex: 'NFLIGHT', width: 75},
                                            {text: 'VCR Date', dataIndex: 'fecha', width: 75},
                                            {text: 'Carrier', dataIndex: 'CARR', width: 60},
                                            {text: 'From', dataIndex: 'CDEPART', width: 45},
                                            {text: 'To', dataIndex: 'CARRIVA', width: 45},
                                            {text: 'Zone', dataIndex: 'ZONA', width: 50},
                                            {text: 'Sale Date', dataIndex: 'FVTA', width: 80},
                                            {text: 'Ticket Status', dataIndex: 'STVAL', width: 130},
                                            {text: 'Flight Status', dataIndex: 'strDescSTVAL', width: 130},
                                            {text: 'Flag Valuation', dataIndex: 'FVAL', width: 110},
                                            {
                                                text: 'Accounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'FCONT', width: 100}
                                                ]
                                            },
                                            {text: 'Tabulated', dataIndex: 'STCON', width: 80},
                                            {text: 'Accounting ID', dataIndex: 'IDCON', width: 200},
                                            {text: 'Mode', dataIndex: 'STORG', width: 65},
                                            {
                                                text: 'GL/AP',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'AR', dataIndex: 'FBASE', width: 60}
                                                ]
                                            },
                                            {text: 'Channel', dataIndex: 'strFuente', width: 70},
                                            {text: 'Currency', dataIndex: 'MDACP', width: 70},
                                            {text: 'Cpn Value', dataIndex: 'VCPN', width: 110},
                                            {text: 'Commission', dataIndex: 'COMISI', width: 110},
                                            {text: 'Tax', dataIndex: 'VTAX', width: 110},
                                            {
                                                text: 'Valuation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'FECVAL', width: 90}
                                                ]
                                            },
                                            {
                                                text: 'Document',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'strDescSTNEW', width: 100}
                                                ]
                                            },
                                            {text: 'Debit', dataIndex: 'A1692DEBTOTAL', width: 90},
                                            {text: 'Credit', dataIndex: 'A1692CREDTOTAL', width: 120}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary',
                                    width: 1442,
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
                                        {width: 610},
                                        {width: 90, id: prototype.id + '-TOTdblAmount'},
                                        {width: 740}
                                    ]
                                },             
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxTKT',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1442,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridTKT',
                                    width: 1442,
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
                                                text: 'Issue',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFecha', width: 105}
                                                ]
                                            },
                                            {text: 'Period', dataIndex: 'PERIOD', width: 65},
                                            {
                                                text: 'Transacction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'strDescrip2', width: 90}
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
                                                    {text: 'Code', dataIndex: 'ENTITY', width: 60},
                                                    {text: 'Number', dataIndex: 'CREDITCARD', width: 130}
                                                ]
                                            },
                                            {
                                                text: 'Exp.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'EXPDATE', width: 80}
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'CURRENC', width: 80},
                                            {text: 'AMOUNT', dataIndex: 'AMOUNT', width: 90},
                                            {text: 'Ticket', dataIndex: 'DOCNUM', width: 120},
                                            {
                                                text: 'Check',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Digit', dataIndex: 'DOCIND', width: 60}
                                                ]
                                            },
                                            {text: 'Agente', dataIndex: 'AGENTE', width: 90},
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'IND', dataIndex: 'strDescrip', width: 200}
                                                ]
                                            },
                                            {
                                                text: 'Aproved',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'APPROVCOD', width: 90}
                                                ]
                                            },
                                            {
                                                text: 'Customer File',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Reference', dataIndex: 'CUSTFILE', width: 90}
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
                                                    {text: 'Transaction', dataIndex: 'RN', width: 90}
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary2',
                                    width: 1442,
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
                                        {width: 610},
                                        {width: 90},
                                        {width: 740}
                                    ]
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
                            width: 1442,
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
                                    width: 1442,
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


