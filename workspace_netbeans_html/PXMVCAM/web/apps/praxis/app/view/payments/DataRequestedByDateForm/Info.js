valor = '0';
Ext.define('Ext.Praxis.view.payments.DataRequestedByDateForm.Info', {
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
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            width: 1690,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1690,
                                    height: 530,
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
                                                text: '',
                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 85,
                                                        /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                         metaData.style = "color:#057ECB;";
                                                         value = '<b>' + value + '</b>';
                                                         return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                         }*/
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sending Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Bank to AM', dataIndex: 'SENTDATE', width: 90}
                                                ]
                                            },
                                            {
                                                text: 'IATA', dataIndex: 'AGENTE', width: 90,
                                            },
                                            {
                                                text: 'Sending Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'to IATA', dataIndex: 'IATADATE', width: 90}
                                                ]
                                            },
                                            {
                                                text: 'Link',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'LINKDATE', width: 75},
                                                    {text: 'Time', dataIndex: 'LINKHORA', width: 75}
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
                                                        text: 'Sending', dataIndex: 'DATES', width: 80
                                                    },
                                                    {
                                                        text: 'Notification', dataIndex: 'DATEN', width: 80,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'TICKET', width: 120
                                            },
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 90,
                                            },
                                            {
                                                text: 'Indicator',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cpns Sales', dataIndex: 'INDCPN', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Uses', dataIndex: 'STUSO', width: 90,
                                            },
                                            {
                                                text: 'Uses',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Last', dataIndex: 'STUSOS', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Used Cpn',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sabre First', dataIndex: 'INDCPNS', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Date Upd.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'First Sabre', dataIndex: 'DATSABF', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Used Cpn',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sabre Last', dataIndex: 'INDCPNSL', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Date Upd.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Last Sabre', dataIndex: 'DATSABL', width: 80
                                                    },
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
                                                        text: 'ID', dataIndex: 'IDCON', width: 80
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Rule',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Policy', dataIndex: 'strDescCRULE', width: 80
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
                            id: prototype.id + '-panelGridStatusSabre',
                            hidden: true,
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
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataStatusSabre',
                                    width: 1750,
                                    height: 530,
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
                                                text: 'Reception',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'A3676FRECE', width: 80,
                                                        /*renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                         metaData.style = "color:#057ECB;";
                                                         value = '<b>' + value + '</b>';
                                                         return '<a href="#payments-data-requested-by-date-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                         }*/
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'TICKET', width: 100,
                                            },
                                            {
                                                text: 'Coupon', dataIndex: 'A3676CUPON', width: 60,
                                            },
                                            {
                                                text: 'Seq', dataIndex: 'A3676SEQ', width: 50,
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Concili. Cpn', dataIndex: 'A3676STCON', width: 90,
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Robot',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Status', dataIndex: 'A3676STROB', width: 55,
                                                    },
                                                    {
                                                        text: 'Coupon', dataIndex: 'A3676CPNRB', width: 60,
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'A3676CURRB', width: 55,
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'A3676MONRB', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Reference', dataIndex: 'A3676REFRB', width: 300,
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'A3676CUR', width: 55,
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'A3676MONTO', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background:";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status Coupon',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Start', dataIndex: 'A3676STINI', width: 90,
                                                    },
                                                    {
                                                        text: 'End', dataIndex: 'A3676STFIN', width: 90,
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Description', dataIndex: 'A3676DESCR', width: 90,
                                            },
                                            {
                                                text: 'Result', dataIndex: 'A3676RESUL', width: 120,
                                            },
                                            {
                                                text: 'Reference', dataIndex: 'A3676REFER', width: 300,
                                            },
                                                    /*{
                                                     text: 'Link',
                                                     defaults: {
                                                     menuDisabled: true,
                                                     sortable: false,
                                                     align: 'center'
                                                     },
                                                     columns: [
                                                     {text: 'Date', dataIndex: 'LINKDATE', width: 75},
                                                     {text: 'Time', dataIndex: 'LINKHORA', width: 75}
                                                     ]
                                                     }, */
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


