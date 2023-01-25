valor = '0';
Ext.define('Ext.Praxis.view.payments.SalesComplementAmexForm.Info', {
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
                width: 1830,
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
                        //Panel Principal - Plusgrade
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1830,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1830,
                                    //height: 600,
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
                                                text: 'Plusgrade ID', dataIndex: 'PLUSGRAID', width: 90
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHID', width: 90
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
                                                        text: 'Date', dataIndex: 'PRDA', width: 90
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
                                                            if (value > 15) {
                                                                metaData.style = "color:#de2828";
                                                            }
                                                            return value;
                                                        },
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
                                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                                    },
                                                    {
                                                        text: 'VS Sales', dataIndex: 'descSTVAL', width: 80
                                                    },
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
                                                        text: 'Country', dataIndex: 'COUNTRY', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
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
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Qty<br>Pax', dataIndex: 'NBROFPAX', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#8ac6eb";

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                            },
                                            {
                                                text: 'Currency',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Partner', dataIndex: 'CURRPARTN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#8ac6eb";
                                                            return value;
                                                        },
                                                    },
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
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#8ac6eb";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total <br> Amount Off', dataIndex: 'AMOUNTOFF', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#8ac6eb";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
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
                                                        text: 'Amount', dataIndex: 'SVFOPS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                    {
                                                        text: 'Difference', dataIndex: 'DIFF_AMOUNT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value != 0) {
                                                                metaData.style = "text-align:right;background-color:#f57373";
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }

                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                    {
                                                        text: 'Country', dataIndex: 'SCOUNTRY', width: 70
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'SDATES', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value;
                                                        },
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
                                                        return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    }
                                                }
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
                                                        text: 'VS Chargeback', dataIndex: 'descFAMEXCHG', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'EMDNUMBER', width: 100,
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;";
                                                            return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Accounting',
                                                id: prototype.id + '-plusAccounting',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'ID Sales FLEX', dataIndex: 'IDCONFLE', width: 250
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 100
                                                    },
                                                    {
                                                        text: 'ID', dataIndex: 'IDCON', width: 250
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Error',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CERROR', width: 70},
                                                    {
                                                        text: 'Description', dataIndex: 'DES_CERROR', width: 270,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Add Pax',
                                                id: prototype.id + '-plusAddPax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'EMD Number', dataIndex: 'ADDPAXEMD', width: 280
                                                    },
                                                    {
                                                        text: 'Ticket Number', dataIndex: 'ADDPAXTKT', width: 280
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Token', dataIndex: 'PAYTOKEN', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Panel detalle plusgrade por tkt
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDetPGTkt',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1700,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataPGTkt',
                                    width: 1350,
                                    //height: 600,
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
                                                text: 'Plusgrade ID', dataIndex: 'IN_PLUSGRADE', width: 100
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'SPNR', width: 80
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
                                                        text: 'Date', dataIndex: 'SDATE', width: 80
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'TVENTA', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Ticket', dataIndex: 'TKT', width: 120,
                                                listeners: {
                                                    click: 'gridData_DetVIEWTKT_clickHandler'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Country', dataIndex: 'SCOUNTRY', width: 80
                                            },
                                            {
                                                text: 'Cod Trans',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Used', dataIndex: 'TRNCU', width: 80
                                                    },
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
                                                    {
                                                        text: 'Type', dataIndex: 'TDOC', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 80
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
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 80
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 120
                                                    },
                                                    {
                                                        text: 'Auth', dataIndex: 'SAUTHOC', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Cur.', dataIndex: 'SCURRENCY', width: 60
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataPGTkt').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.SVFOP_TOT, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'RFIC', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Reason',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sub Code', dataIndex: 'RFIS1', width: 80
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Panel Ligas de Pago
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataLiga',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1600,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainLiga',
                                    width: 1520,
                                    //height: 600,
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
                                                text: 'Operation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'OPERATNBR', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHID', width: 90
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
                                                        text: 'Date', dataIndex: 'PRDA', width: 100
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
                                                            if (value > 15) {
                                                                metaData.style = "color:#de2828";
                                                            }
                                                            return value;
                                                        },
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
                                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                                    },
                                                    {
                                                        text: 'VS Sales', dataIndex: 'descSTVAL', width: 80, hidden: true
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-adgTitFechaTablet',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 90
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'STIME', width: 90
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
                                                        text: 'Name', dataIndex: 'NAMECARD', width: 90
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 100
                                                    },
                                                    {
                                                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 100
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
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Issuing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Bank', dataIndex: 'BANCOEMI', width: 140
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Accounting',
                                                id: prototype.id + '-LigaAccounting',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 100
                                                    },
                                                    {
                                                        text: 'ID', dataIndex: 'IDCON', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Tickets',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '1', dataIndex: 'TICKET1', width: 100
                                                    },
                                                    {
                                                        text: '2', dataIndex: 'TICKET2', width: 100
                                                    },
                                                    {
                                                        text: '3', dataIndex: 'TICKET3', width: 100
                                                    },
                                                    {
                                                        text: '4', dataIndex: 'TICKET4', width: 100
                                                    },
                                                    {
                                                        text: '5', dataIndex: 'TICKET5', width: 100
                                                    },
                                                    {
                                                        text: '6', dataIndex: 'TICKET6', width: 100
                                                    },
                                                    {
                                                        text: '7', dataIndex: 'TICKET7', width: 100
                                                    },
                                                    {
                                                        text: '8', dataIndex: 'TICKET8', width: 100
                                                    },
                                                    {
                                                        text: '9', dataIndex: 'TICKET9', width: 100
                                                    },
                                                    {
                                                        text: '10', dataIndex: 'TICKET10', width: 100
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Panel Tablet
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataTablet',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1600,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMainTablet',
                                    width: 1520,
                                    //height: 600,
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
                                                text: 'Operation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'OPERATNBR', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Merchant', dataIndex: 'MERCHID', width: 90
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
                                                        text: 'Date', dataIndex: 'PRDA', width: 100
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
                                                            if (value > 15) {
                                                                metaData.style = "color:#de2828";
                                                            }
                                                            return value;
                                                        },
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
                                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                                    },
                                                    {
                                                        text: 'VS Sales', dataIndex: 'descSTVAL', width: 80, hidden: true
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-adgTitFechaLiga',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 90
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'STIME', width: 90
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
                                                        text: 'Name', dataIndex: 'NAMECARD', width: 90
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 100
                                                    },
                                                    {
                                                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 100
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
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Issuing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Bank', dataIndex: 'BANCOEMI', width: 140
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;";
                                                    return '<a href="#payments-sales-complement-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {
                                                text: 'Accounting',
                                                id: prototype.id + '-TabletAccounting',
                                                hidden: true,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 100
                                                    },
                                                    {
                                                        text: 'ID', dataIndex: 'IDCON', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Tickets',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '1', dataIndex: 'TICKET1', width: 100
                                                    },
                                                    {
                                                        text: '2', dataIndex: 'TICKET2', width: 100
                                                    },
                                                    {
                                                        text: '3', dataIndex: 'TICKET3', width: 100
                                                    },
                                                    {
                                                        text: '4', dataIndex: 'TICKET4', width: 100
                                                    },
                                                    {
                                                        text: '5', dataIndex: 'TICKET5', width: 100
                                                    },
                                                    {
                                                        text: '6', dataIndex: 'TICKET6', width: 100
                                                    },
                                                    {
                                                        text: '7', dataIndex: 'TICKET7', width: 100
                                                    },
                                                    {
                                                        text: '8', dataIndex: 'TICKET8', width: 100
                                                    },
                                                    {
                                                        text: '9', dataIndex: 'TICKET9', width: 100
                                                    },
                                                    {
                                                        text: '10', dataIndex: 'TICKET10', width: 100
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        //Pie
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
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



