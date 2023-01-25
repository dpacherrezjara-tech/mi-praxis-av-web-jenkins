prototype.TKT = {
    id: 'ScrTKTForm'
};
Ext.define('Ext.Praxis.view.screens.ScrTKTForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.ScrTKTForm',
    requires: [
        'Ext.Praxis.controller.screens.ScrTKTController'
    ],
    controller: 'ScrTKTController',
    title: 'Ticket Information',
    header: true,
    width: 1240,
    height: 740,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'tabpanel',
            id: prototype.TKT.id+'-tabMain',
            width: 1230,
            height: 690,
            activeTab: 0,
//            anchor: '100%',
//            margin: '1 1 1 1',
            autoScroll: true,
            bodyStyle: 'background: #E5ECEF',
            listeners: {
                tabchange: 'tab_clickHandler'
            },
            defaults: {
                height: 680,
                border: true,
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="Tab SaletInformation">
                {
                    xtype: 'panel',
                    bodyStyle: 'background: #E5ECEF',
                    id: prototype.TKT.id+'-tabSale',
                    title: '<label style="color:#0B333C;">SALE</label>',
                    layout: {
                        type: 'vbox'
                    },
//                    margin: '5 5 5 5',
                    defaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #E5ECEF',
                            layout: 'hbox',
                            margin: '1 1 1 1',
                            border: false,
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Panel 1 - Campos">

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    layout: 'hbox',
                                    margin: '1 1 1 1',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            defaults: {
                                                xtype: 'label',
                                                padding: '5px 3px 5px 3px',
                                                margin: '1 1 1 1',
                                                style: 'font-weight:bold;font-size:11px;',
                                                width: 100
                                            },
                                            items: [
                                                {
                                                    text: 'Ticket:'
                                                },
                                                {
                                                    text: 'Transaction:'
                                                },
                                                {
                                                    text: 'Conjuction:'
                                                },
                                                {
                                                    text: 'Transaction Nº:'
                                                },
                                                {
                                                    text: 'Iata Code:'
                                                },
                                                {
                                                    text: 'Tour Code:'
                                                },
                                                {
                                                    text: 'Fare:'
                                                },
                                                {
                                                    text: 'EQV Fare:'
                                                },
                                                {
                                                    text: 'Discount:'
                                                },
                                                {
                                                    text: 'Q:'
                                                },
                                                {
                                                    text: 'Exchange Rate:'
                                                },
                                                {
                                                    text: 'Local Cur:'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            bodyStyle: 'background: #E5ECEF',
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '1',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        fieldStyle: 'text-align:left;',
                                                        labelSeparator: ''
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.TKT.id+'-lblCia',
                                                            width: 30,
                                                            fieldLabel: ''
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            id: prototype.TKT.id+'-lblDocumento',
                                                            fieldLabel: '',
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: prototype.TKT.id+'-lblTransaction',
                                                    xtype: 'textfield',
                                                    margin: '1',
                                                    fieldStyle: 'text-align:left;',
                                                    labelSeparator: '',
                                                    fieldLabel: '',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '1',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        fieldStyle: 'text-align:left;',
                                                        labelSeparator: ''
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.TKT.id+'-lblConjuction',
                                                            width: 30,
                                                            fieldLabel: ''
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            id: prototype.TKT.id+'-lblBoleto',
                                                            fieldLabel: '',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            html: '<strong>/</strong>',
                                                            width: 10,
                                                            padding: '5px 0px 5px 0x'

                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotBoleto',
                                                            fieldLabel: '',
                                                            width: 30
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: prototype.TKT.id+'-lblTransactionNbr',
                                                    xtype: 'textfield',
    //                                                                    padding: '1',
                                                    margin: '2',
                                                    fieldStyle: 'text-align:left;',
                                                    labelSeparator: '',
                                                    fieldLabel: '',
                                                    width: 110
                                                },
                                                {
                                                    id: prototype.TKT.id+'-lblIata',
                                                    xtype: 'textfield',
    //                                                                    padding: '1',
                                                    margin: '2',
                                                    fieldStyle: 'text-align:left;',
                                                    labelSeparator: '',
                                                    fieldLabel: '',
                                                    width: 110
                                                },
                                                {
                                                    id: prototype.TKT.id+'-lblTourCode',
                                                    xtype: 'textfield',
    //                                                                    padding: '1',
                                                    margin: '2',
                                                    fieldStyle: 'text-align:left;',
                                                    labelSeparator: '',
                                                    fieldLabel: '',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '2',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        fieldStyle: 'text-align:left;',
                                                        labelSeparator: ''
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.TKT.id+'-lblFareCur',
                                                            width: 30,
                                                            fieldLabel: ''
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            id: prototype.TKT.id+'-lblFare',
                                                            fieldLabel: '',
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    margin: '2',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        fieldStyle: 'text-align:left;',
                                                        labelSeparator: ''
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.TKT.id+'-lblEQVCur',
                                                            width: 30,
                                                            fieldLabel: ''
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            id: prototype.TKT.id+'-lblEQV',
                                                            fieldLabel: '',
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
    //                                                                    padding: '0',
                                                    margin: '2',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        fieldStyle: 'text-align:left;',
                                                        labelSeparator: ''
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.TKT.id+'-lblDiscountCur',
                                                            width: 30,
                                                            fieldLabel: ''
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            id: prototype.TKT.id+'-lblDiscount',
                                                            fieldLabel: '',
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
    //                                                                    padding: '0',
                                                    margin: '2',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 0 0 0',
                                                        fieldStyle: 'text-align:left;',
                                                        labelSeparator: ''
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.TKT.id+'-lblQCur',
                                                            width: 30,
                                                            fieldLabel: ''
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            id: prototype.TKT.id+'-lblQ',
                                                            fieldLabel: '',
                                                            width: 70
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: prototype.TKT.id+'-lblExchangeRate',
                                                    xtype: 'textfield',
                                                    margin: '2',
                                                    fieldStyle: 'text-align:left;',
                                                    labelSeparator: '',
                                                    fieldLabel: '',
                                                    width: 110
                                                },
                                                {
                                                    id: prototype.TKT.id+'-lblLocalCur',
                                                    xtype: 'textfield',
                                                    margin: '2',
                                                    fieldStyle: 'text-align:left;',
                                                    labelSeparator: '',
                                                    fieldLabel: '',
                                                    width: 60
                                                }
    //                                                               

                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>

                                // <editor-fold defaultstate="collapsed" desc="Panel 2">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    layout: 'vbox',
                                    margin: '1 1 1 1',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        //PANEL 2_1 Campos_1
                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 Campos_1">

                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [//                                                                                
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    margin: '1 1 1 1',
                                                                    border: false,
                                                                    defaults: {
                                                                        labelStyle: 'font-weight:bold;font-size:11px;',
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.TKT.id+'-lblDigito',
                                                                            xtype: 'textfield',
                                                                            fieldLabel: 'D',
                                                                            margin: '1',
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            labelWidth: 50,
                                                                            width: 90
                                                                        },
                                                                        {
                                                                            id: prototype.TKT.id+'-lblDocType',
                                                                            xtype: 'textfield',
                                                                            margin: '1',
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            fieldLabel: 'Doc. T',
                                                                            labelWidth: 50,
                                                                            width: 90
                                                                        },
                                                                        {xtype: 'label', padding: '14px 3px 10px 3px'},
                                                                        {
                                                                            id: prototype.TKT.id+'-lblSeq',
                                                                            xtype: 'textfield',
                                                                            margin: '2',
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            fieldLabel: 'Seq',
                                                                            labelWidth: 50,
                                                                            width: 90
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        //PANEL 2_1 Campos_2
                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 Campos_2">
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'vbox',
                                                                    margin: '1 0 1 0',
                                                                    border: false,
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        padding: '5px 3px 5px 3px',
                                                                        margin: '1 1 1 1',
                                                                        style: 'font-weight:bold;font-size:11px;',
                                                                        width: 100
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Group:'
                                                                        },
                                                                        {
                                                                            text: 'Issue Date:'
                                                                        },
                                                                        {
                                                                            text: 'Pax:'
                                                                        },
                                                                        {
                                                                            text: 'Type Pax:'
                                                                        },
                                                                        {
                                                                            text: 'Reference:'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    margin: '1 1 1 1',
                                                                    border: false,
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            margin: '1',
                                                                            border: false,
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            defaults: {
                                                                                xtype: 'textfield',
                                                                                margin: '0 0 0 0',
                                                                                fieldStyle: 'text-align:left;',
                                                                                labelSeparator: ''
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    id: prototype.TKT.id+'-lblGroup',
                                                                                    width: 30,
                                                                                    fieldLabel: ''
                                                                                },
                                                                                {xtype: 'tbspacer', width: 10},
                                                                                {
                                                                                    id: prototype.TKT.id+'-lblSource',
                                                                                    fieldLabel: '',
                                                                                    width: 70
                                                                                },
                                                                                {xtype: 'tbspacer', width: 10},
                                                                                {
                                                                                    id: prototype.TKT.id+'-lblIdFile',
                                                                                    fieldLabel: '',
                                                                                    width: 70
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            id: prototype.TKT.id+'-lblIssueDate',
                                                                            xtype: 'textfield',
                                                                            margin: '1',
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            fieldLabel: '',
                                                                            width: 110
                                                                        },
                                                                        {
                                                                            id: prototype.TKT.id+'-lblPax',
                                                                            xtype: 'textfield',
                                                                            margin: '1',
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            fieldLabel: '',
                                                                            width: 110
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            margin: '1',
                                                                            border: false,
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            defaults: {
                                                                                xtype: 'textfield',
                                                                                margin: '0 0 0 0',
                                                                                fieldStyle: 'text-align:left;',
                                                                                labelSeparator: ''
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    id: prototype.TKT.id+'-lblType',
                                                                                    width: 40,
                                                                                    fieldLabel: ''
                                                                                },
                                                                                {xtype: 'tbspacer', width: 5},
                                                                                {
                                                                                    id: prototype.TKT.id+'-lblRelated',
                                                                                    fieldLabel: 'Related',
                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                    width: 120,
                                                                                    labelWidth: 50
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            id: prototype.TKT.id+'-lblReference',
                                                                            xtype: 'textfield',
                                                                            margin: '2',
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            fieldLabel: '',
                                                                            width: 165
                                                                        }

                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        //PANEL 2_1 GRID                                                              
                                                        // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 GRID">
                                                        {
                                                            xtype: 'panel',
                                                            id:prototype.TKT.id+'-panelGridEMD',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'vbox',
                                                            margin: '1 1 1 1',
                                                            width: 504,
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'left',
                                                                    html: '<strong>EMD INFORMATION</strong>',
                                                                    padding: '1px 5px 0px 10px'

                                                                },
                                                                {
                                                                    xtype: 'grid',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    padding: '5 0 0 0',
                                                                    id: prototype.TKT.id+'-gridEMD',
                                                                    height: 112,
                                                                    width: 502,
                                                                    columnLines: true,
                                                                    resizable: false,
                                                                    columns: {
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            resizable: false,
                                                                            align: 'center'
                                                                        },
                                                                        items: [
                                                                            {text: 'Cia', width: 60, dataIndex: 'A730CIA'},
                                                                            {text: 'Document', width: 100, dataIndex: 'DOCUMENTO'},
                                                                            {text: 'Coupons', width: 100, dataIndex: 'CUPON'},
                                                                            {text: 'CNJ', width: 80, dataIndex: 'CNJ'},
                                                                            {text: 'Curr', width: 60, dataIndex: 'A730MONREG'},
                                                                            {text: 'Value', width: 100, dataIndex: 'VALUE',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            }

                                                                        ]
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            border: false,
                                            items: [
                                                //PANEL 2_2 GRILLA
                                                // <editor-fold defaultstate="collapsed" desc="PANEL 2_2 GRILLA">
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'vbox',
                                                    margin: '1 1 1 1',
                                                    width: 1036,
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            padding: '5 0 0 0',
                                                            border: true,
                                                            id: prototype.TKT.id+'-gridDetCpn',
                                                            height: 170,
                                                            width: 1034,
                                                            columnLines: true,
                                                            resizable: false,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    resizable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Ticket', width: 100, dataIndex: 'TICKET'},
                                                                    {text: 'CPN', width: 40, dataIndex: 'CUPON'},
                                                                    {text: 'X/O', width: 35, dataIndex: 'CONEX'},
                                                                    {text: 'From', width: 50, dataIndex: 'ORIGEN'},
                                                                    {text: 'To', width: 40, dataIndex: 'DESTINO'},
                                                                    {text: 'Carrier', width: 60, dataIndex: 'CARRIER'},
                                                                    {text: 'Class', width: 45, dataIndex: 'CLASE'},
                                                                    {text: 'Flight<br>Number', width: 60, dataIndex: 'FLIGHT'},
                                                                    {text: 'Flight<br>Date', width: 75, dataIndex: 'DFLIGHT'},
                                                                    {text: 'Fare <br>Basis', width: 60, dataIndex: 'FAREBASIS'},
                                                                    {text: 'Prorate',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Fare<br> Curr', width: 55, dataIndex: 'CPNCUR'},
                                                                            {text: 'Fare<br> Amount', width: 55, dataIndex: 'CPN'},
                                                                            {text: 'Q <br>Curr', width: 55, dataIndex: 'CPQCURN'},
                                                                            {text: 'Q <br>Amount', width: 55, dataIndex: 'Q'},
                                                                            {text: 'YQ <br>Curr', width: 55, dataIndex: 'YQCUR'},
                                                                            {text: 'YQ <br>Amount', width: 55, dataIndex: 'YQ'},
                                                                            {text: 'Comm <br>Amount', width: 55, dataIndex: 'COMM_G'},
                                                                            {text: 'Over <br>Comm ', width: 55, dataIndex: 'SCOMM'}
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                },
                                                //TOTALES
                                                {
                                                    xtype: 'panel',
                                                    id:prototype.TKT.id+'-totales',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0',
                                                        width: 55,
                                                        fieldLabel: '',
                                                        labelwidth: 0,
                                                        readOnly: true
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', width: 300},
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.TKT.id+'-lblError',
                                                            text: '',
                                                            width: 200
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Totals',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalCpnCur'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalCpn'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalQCur'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalQ'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalYQCur'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalYQ'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalCOM'
                                                        },
                                                        {
                                                            id: prototype.TKT.id+'-lblTotalOVERCOM'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        //PANEL 3
                        // <editor-fold defaultstate="collapsed" desc="PANEL 3">

                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #E5ECEF',
                            layout: {
                                type: 'hbox'
                            },
                            margin: '1 1 1 1',
                            border: false,
                            items: [
                                 // PANEL 3_1 Form of Payment
                                {
                                    xtype: 'fieldset',
                                    title: '<b  style="font-size:12px">Form of Payment<b/>',
                                    bodyStyle: 'background: #E5ECEF',
                                    margin: '1 5 0 0',
                                    width: 300,
                                    height: 160,
                                    defaults: {
                                        border: false
                                    },
                                    //border: true,                                                    
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'font-weight:bold;',
                                                        width: 70,
                                                        margin: '1',
                                                        padding: '1px 2px 0px 2px'
                                                    },
                                                    items: [
                                                        {
                                                            text: ''

                                                        },
                                                        {
                                                            text: 'Curr',
                                                            width: 60
                                                        },
                                                        {
                                                            text: 'Amount',
                                                            width: 80
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'font-weight:bold',
                                                        width: 70
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Fop'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.TKT.id+'-lblFOPCur',
                                                            fieldLabel: '',
                                                            margin: '1',
                                                            width: 60,
                                                            labelwidth: 0
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.TKT.id+'-lblFOP',
                                                            fieldLabel: '',
                                                            margin: '1',
                                                            width: 80,
                                                            labelwidth: 0
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.TKT.id+'-btnSearch',
                                                            style: 'background:#E5ECEF',
                                                            iconCls: 'prx-icon-search',
                                                            border: false,
                                                            tooltip: 'Search',
                                                            width: 40,
                                                            listeners: {
                                                                click: 'onClickSearchFOP'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'font-weight:bold',
                                                        width: 70
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Remmit'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            readOnly:true,
                                                            id: prototype.TKT.id+'-lblRemmittanceCur',
                                                            fieldLabel: '',
                                                            margin: '1',
                                                            width: 60,
                                                            labelwidth: 0
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            readOnly:true,
                                                            id: prototype.TKT.id+'-lblRemmittance',
                                                            fieldLabel: '',
                                                            margin: '1',
                                                            width: 80,
                                                            labelwidth: 0
                                                        }

                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                },
                                // PANEL 3_2 Tax / Fee
                                {
                                    xtype: 'fieldset',
                                    title: '<b  style="font-size:12px">Tax / Fee<b/>',
                                    bodyStyle: 'background: #E5ECEF',
                                    margin: '1 5 0 5',
                                    width: 300,
                                    height: 160,
                                    defaults: {
                                        border: false
                                    },
                                    //border: true,                                                    
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'font-weight:bold;',
                                                        width: 70,
                                                        margin: '1',
                                                        padding: '1px 2px 0px 2px'
                                                    },
                                                    items: [
                                                        {
                                                            text: ''

                                                        },
                                                        {
                                                            text: 'Curr',
                                                            width: 60
                                                        },
                                                        {
                                                            text: 'Amount',
                                                            width: 80
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'hbox',
                                                    margin: '1 1 1 1',
                                                    defaults: {
                                                        xtype: 'label',
                                                        style: 'font-weight:bold',
                                                        width: 70
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Tax'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.TKT.id+'-lblTAXCur',
                                                            fieldLabel: '',
                                                            margin: '1',
                                                            width: 60,
                                                            labelwidth: 0
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.TKT.id+'-lblTAX',
                                                            fieldLabel: '',
                                                            margin: '1',
                                                            width: 80,
                                                            labelwidth: 0
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.TKT.id+'-btnSearch2',
                                                            style: 'background:#E5ECEF',
                                                            iconCls: 'prx-icon-search',
                                                            border: false,
                                                            tooltip: 'Search',
                                                            width: 40,
                                                            listeners: {
                                                                click: 'onClickSearch'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                },
                                // PANEL 3_3
                                {
                                    xtype: 'fieldset',
                                    title: '<b  style="font-size:12px">Commision<b/>',
                                    bodyStyle: 'background: #E5ECEF',
                                    margin: '1 5 0 5',
                                    width: 300,
                                    height: 160,
                                    defaults: {
                                        border: false
                                    },
                                    //border: true,                                                    
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'vbox', margin: '1 1 1 1',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold;',
                                                                width: 100,
                                                                margin: '1',
                                                                padding: '1px 2px 0px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    text: ''

                                                                },
                                                                {
                                                                    text: 'Curr',
                                                                    width: 60
                                                                },
                                                                {
                                                                    text: 'Amount',
                                                                    width: 80
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Commission'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblCOMMISIONCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblCOMMISION',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.TKT.id+'-btnSearch3_1',
                                                                    style: 'background:#E5ECEF',
                                                                    iconCls: 'prx-icon-search',
                                                                    border: false,
                                                                    tooltip: 'Search',
                                                                    width: 40,
                                                                    listeners: {
                                                                        click: 'onClickSearch'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Tax on Comm'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblTAXCOMMISSIONCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblTAXCOMMISSION',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.TKT.id+'-btnSearch3_2',
                                                                    style: 'background:#E5ECEF',
                                                                    iconCls: 'prx-icon-search',
                                                                    border: false,
                                                                    tooltip: 'Search',
                                                                    width: 40,
                                                                    listeners: {
                                                                        click: 'onClickSearch'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Original COMM'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblORIGINALCOMCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblORIGINALCOM',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Original O.CMM'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblORIGINALOVERCOMCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblORIGINALOVERCOM',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                },
                                // PANEL 3_4
                                {
                                    xtype: 'fieldset',
                                    title: '<b  style="font-size:12px">Other<b/>',
                                    bodyStyle: 'background: #E5ECEF',
                                    margin: '1 5 0 5',
                                    width: 280,
                                    height: 160,
                                    defaults: {
                                        border: false
                                    },
                                    //border: true,                                                    
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: #E5ECEF',
                                            layout: 'vbox',
                                            margin: '1 1 1 1',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: 'vbox', margin: '1 1 1 1',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold;',
                                                                width: 100,
                                                                margin: '1',
                                                                padding: '1px 2px 0px 2px'
                                                            },
                                                            items: [
                                                                {
                                                                    text: ''

                                                                },
                                                                {
                                                                    text: 'Curr',
                                                                    width: 60
                                                                },
                                                                {
                                                                    text: 'Amount',
                                                                    width: 80
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Fare'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblFARE2Cur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblFARE2',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Adc'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblADCCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblADC',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Original Fare'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblORIGINALCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblORIGINAL',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E5ECEF',
                                                            layout: 'hbox',
                                                            margin: '1 1 1 1',
                                                            defaults: {
                                                                xtype: 'label',
                                                                style: 'font-weight:bold',
                                                                width: 100
                                                            },
                                                            items: [
                                                                {
                                                                    text: 'Diff Pax'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblPAXDIFFCur',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 60,
                                                                    labelwidth: 0
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.TKT.id+'-lblPAXDIFF',
                                                                    fieldLabel: '',
                                                                    margin: '1',
                                                                    width: 80,
                                                                    labelwidth: 0
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

                        // </editor-fold>

                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '1 1 1 1',
                            defaults: {
                                scale: 'medium'
                            },
                            style: 'aling:center padding: 5px;',
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    text: '<strong style="color:white;">FareCalc<strong>',
                                    id: prototype.TKT.id+'-btnFareCalc',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnFareCalc_clickHandler'
                                    }
                                },
                                {
                                    text: '<strong style="color:white;">Facsimil<strong>',
                                    id: prototype.TKT.id+'-btnFacsimilTKT',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnFacsimil_clickHandler'
                                    }
                                },
                                {
                                    text: '<strong style="color:white;">Delivery<strong>',
                                    id: prototype.TKT.id+'-btnDeliveryTKT',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnDeliveryTKT_clickHandler'
                                    }
                                },
                                {
                                    text: '<strong style="color:white;">Balance<strong>',
                                    id: prototype.TKT.id+'-btnBalance',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    listeners: {
                                        click: 'btnBalance_clickHandler'
                                    }
                                },
                                {
                                    text: '<strong style="color:white;">Accouting<strong>',
                                    id: prototype.TKT.id+'-btnAccouting',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    hidden: true,
                                    listeners: {
                                        click: 'btnAccouting_clickHandler',
                                    }
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>

                // <editor-fold defaultstate="collapsed" desc="Tab Prorrateo">
                {
                    xtype: 'panel',
                    title: '<label style="color:#0B333C;">PRORRATION</label>',
                    id: prototype.TKT.id+'-boxProrrate',
                    items: [
                        {
                            region: 'center',
                            border: false,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.TKT.id+'-boxFilterControl',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.TKT.id+'-lblErrorProrrate',
                                                            fieldStyle: 'text-align:left;background-color:#F19D43;',
                                                            hidden: true,
                                                            readOnly: true,
                                                            value: '',
                                                            width: 840,
                                                            height: '100%'
                                                        },

                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            bodyStyle: 'background:#E6EFF5',
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.TKT.id+'-btnDelivery',
                                                                    margin: 7,
                                                                    style: 'background:#02507a',
                                                                    text: '<strong style="color:white;">Delivery<strong>',
                                                                    cls: 'x-btn-sent',
                                                                    overCls: 'x-btn-sent-over',
                                                                    listeners: {
                                                                        click: 'btnDelivery_clickHandler'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretchmax'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    width: 760,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'hbox',
                                                            bodyStyle: 'background:white',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 1.1,
                                                                    margin: 0,
                                                                    bodyStyle: 'background:#E6EFF5',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'column',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    margin: '1 2 1 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'ISSUED BY:'
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    id: prototype.TKT.id+'-lblNomAer',
                                                                                    margin: '1 2 1 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'AEROMEXICO'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'column',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    id: prototype.TKT.id+'-lblCnj',
                                                                                    margin: '5 2 5  2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'CONJUNTION TICKETS'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.TKT.id+'-txtConj',
                                                                                    style: 'font-size: 10px;',
                                                                                    width: 120,
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    border: false,
                                                                                    id: prototype.TKT.id+'-imgPrev',
                                                                                    icon: 'resources/img/botones/16x16/prev.png',
                                                                                    style: 'background:#E6EFF5',
                                                                                    height: 18,
                                                                                    margin: 2,
                                                                                    width: 18,
                                                                                    tooltip: 'Conj - Prev',
                                                                                    listeners: {
                                                                                        click: 'onBtnPrev'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    id: prototype.TKT.id+'-imgNext',
                                                                                    border: false,
                                                                                    icon: 'resources/img/botones/16x16/next.png',
                                                                                    style: 'background:#E6EFF5',
                                                                                    height: 18,
                                                                                    margin: 2,
                                                                                    width: 18,
                                                                                    tooltip: 'Conj - Next',
                                                                                    listeners: {
                                                                                        click: 'onBtnNext'
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    margin: '5 2 5 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'ENDORSEMENTS/RESTRICTIONS'
                                                                                },
                                                                                {
                                                                                    xtype: 'tbspacer',
                                                                                    width: 40
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    id: prototype.TKT.id+'-lblFuente',
                                                                                    margin: '5 2 5 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: ''
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    margin: '5 2 5 2',
                                                                                    hidden: true,
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: '/'
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    id: prototype.TKT.id+'-lblPais',
                                                                                    margin: '5 2 5 2',
                                                                                    hidden: true,
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: ''
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            id: prototype.TKT.id+'-celEndors',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-txtEndors',
                                                                                    margin: '0 2 0 2',
                                                                                    style: 'font-size: 10px;',
                                                                                    fieldStyle: 'font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 2,
                                                                                    margin: '1 2 1 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'PASSENGER NAME NOT TRANSFERABLE'
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    margin: '1 2 1 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                                                    text: 'DATE OF ISSUE'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            layout: {
                                                                                type: 'hbox',
                                                                                align: 'stretch'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    flex: 1.5,
                                                                                    id: prototype.TKT.id+'-txtPassenger',
                                                                                    style: 'font-size: 10px;',
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                },
                                                                                {
                                                                                    xtype: 'tbspacer',
                                                                                    flex: 0.6
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    flex: 0.7,
                                                                                    id: prototype.TKT.id+'-txtDateIssue',
                                                                                    style: 'font-size: 10px;text-align:center;',
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;text-align:center;'
                                                                                },
                                                                                {
                                                                                    xtype: 'tbspacer',
                                                                                    flex: 0.1
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 0.7,
                                                                    bodyStyle: 'background:#E6EFF5',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'column',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    margin: '1 2 1 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'PASSENGER TICKET AND BAGGAGE CHECKED'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'column',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    margin: '5 2 5  2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    width: 120,
                                                                                    text: 'ORIGIN/DESTINATION'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.TKT.id+'-txtOrigDest',
                                                                                    style: 'font-size: 10px;',
                                                                                    width: 110,
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    margins: '',
                                                                                    id: prototype.TKT.id+'-txtPNR',
                                                                                    margin: '0 2 0 2',
                                                                                    style: 'font-size: 10px;',
                                                                                    width: 230,
                                                                                    fieldLabel: 'PNR',
                                                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    labelWidth: 80,
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.TKT.id+'-txtTourC',
                                                                                    margin: '0 2 0 2',
                                                                                    style: 'font-size: 10px;',
                                                                                    width: 230,
                                                                                    fieldLabel: 'TOUR CODE',
                                                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    labelWidth: 80,
                                                                                    fieldStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1.3,
                                                                                    margin: '1 2 1 2',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    text: 'ISSUED IN EXCHANGE FOR'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            border: true,
                                                                            layout: 'hbox',
                                                                            bodyBorder: true,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-txtIssExc',
                                                                                    style: 'font-size: 10px;',
                                                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 0.4,
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            layout: 'vbox',
                                                                            bodyStyle: 'background:white',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-lblNomAgente',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                                                    width: '100%',
                                                                                    text: ''
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    html: '<br>',
                                                                                    id: prototype.TKT.id+'-lblDirAgente',
                                                                                    margin: '5 5 5 5',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 10px;text-align:center',
                                                                                    width: 120
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    html: '<br>',
                                                                                    id: prototype.TKT.id+'-lblAgente',
                                                                                    margin: '5 5 5 5',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 13px;text-align:center',
                                                                                    width: 120
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        //SEGUNDA PARTE - GRILLA
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            margin: '0 0 0 0',
                                                            layout: 'vbox',
                                                            bodyStyle: 'background:#CADAE4',
                                                            items: [
                                                                //<editor-fold defaultstate="collapsed" desc="gridDetFac">
                                                                {
                                                                    xtype: 'grid',
                                                                    width: 760,
                                                                    padding: '0 0 0 0',
                                                                    id: prototype.TKT.id+'-gridDetFac',
                                                                    bodyStyle: 'background:#E6EFF5',
                                                                    height: 130,
                                                                    columnLines: true,
                                                                    columns: {
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            style: 'font-size:8px '
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'STPO',
                                                                                text: '<b style="font-size:9px">X/O</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'ORAC',
                                                                                text: '<b style="font-size:9px">FROM</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                                                                    metaData.style = "font-size:9px !important;color:"+color;
                                                                                    metaData.tdAttr = 'data-qtip="'+record.data.strDescFrom+'"';
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'DSTC',
                                                                                text: '<b style="font-size:9px">TO</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                                                                    metaData.style = "font-size:9px !important;color:"+color;
                                                                                    metaData.tdAttr = 'data-qtip="'+record.data.strDescTo+'"';
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1.4,
                                                                                dataIndex: 'CARR',
                                                                                text: '<b style="font-size:9px">CARRIER</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var color = record.data.RESD1 === 'SURFACE' ? '#0D8231' : '#2b4d72';
                                                                                    metaData.style = "font-size:9px !important;color:"+color;
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1.4,
                                                                                dataIndex: 'FTNR',
                                                                                text: '<b style="font-size:9px">FLIGHT</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'RBKD',
                                                                                text: '<b style="font-size:9px">CL</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'FTDA',
                                                                                text: '<b style="font-size:9px">DATE</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'FTDT',
                                                                                text: '<b style="font-size:9px">TIME</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'FBST',
                                                                                text: '<b style="font-size:9px">ST</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1.8,
                                                                                dataIndex: 'FBTD',
                                                                                text: '<b style="font-size:9px">FARE BASIS</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1.5,
                                                                                dataIndex: 'NBDA',
                                                                                text: '<b style="font-size:9px">N. VALID B</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1.5,
                                                                                dataIndex: 'NADA',
                                                                                text: '<b style="font-size:9px">N.VALID A</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'strUso',
                                                                                text: '<b style="font-size:9px">USE</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important;background: #bcdcf8";
                                                                                    metaData.tdAttr = 'data-qtip="'+record.data.strDesUso+'"';
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'strFecUso',
                                                                                text: '<b style="font-size:9px">DATE</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important;background: #bcdcf8;text-align:right;";
                                                                                    return value;
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'dblMontoUso',
                                                                                text: '<b style="font-size:9px">VALUE</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "font-size:9px !important;background: #bcdcf8;text-align:right;";
                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                flex: 1,
                                                                                dataIndex: 'strLeg',
                                                                                text: '<b style="font-size:9px">LEG</b>',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "text-align:center;background: #bcdcf8;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;font-size:9px !important;";
                                                                                    metaData.tdAttr = 'data-qtip="View Leg"';
                                                                                    return '<a href="#screens-scr-prorrateo-new-form" style="color:#057ECB;text-decoration:none;">'+value+'</a>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                                //</editor-fold>
                                                            ]
                                                        },
                                                        //TERCERA PARTE - FARE
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            border: false,
                                                            bodyStyle: 'background:#E6EFF5',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    flex: 1,
                                                                    bodyStyle: 'background:#E6EFF5',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFare',
                                                                            margin: '0 2 1 2',
                                                                            fieldLabel: 'FARE',
                                                                            labelSeparator: ' ',
                                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                            labelWidth: 50,
                                                                            fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtEquivFa',
                                                                            margin: '0 2  1 2',
                                                                            fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right',
                                                                            fieldLabel: 'EQUIV',
                                                                            labelSeparator: ' ',
                                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                            labelWidth: 50
                                                                        },
                                                                        {
                                                                            xtype: 'textareafield',
                                                                            height: 50,
                                                                            id: prototype.TKT.id+'-txtTaxes',
                                                                            margin: '0 2 1 2',
                                                                            fieldLabel: 'TAXES',
                                                                            labelSeparator: ' ',
                                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                            labelWidth: 50,
                                                                            fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                        }
                                                                    ],
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            dock: 'bottom',
                                                                            id: prototype.TKT.id+'-txtTotal',
                                                                            margin: '5 2 2 2',
                                                                            fieldLabel: 'TOTAL',
                                                                            labelSeparator: ' ',
                                                                            labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                            labelWidth: 50,
                                                                            fieldStyle: 'color: #0B333C; font-size: 10px;text-align:right'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: false,
                                                                    flex: 3,
                                                                    bodyStyle: 'background:#E6EFF5',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            margins: '0 0 5 0',
                                                                            border: true,
                                                                            height: 50,
                                                                            maxHeight: 50,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            layout: {
                                                                                type: 'hbox',
                                                                                align: 'stretch',
                                                                                padding: '1 0 1 0'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textareafield',
                                                                                    flex: 1,
                                                                                    height: 50,
                                                                                    id: prototype.TKT.id+'-txtFareCal',
                                                                                    margin: '0 1 5 1',
                                                                                    maxHeight: 100,
                                                                                    fieldLabel: 'FARE CALC',
                                                                                    labelSeparator: ' ',
                                                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    labelWidth: 80,
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            flex: 1,
                                                                            margins: '1 0 1 0',
                                                                            border: true,
                                                                            height: 50,
                                                                            maxHeight: 50,
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            layout: {
                                                                                type: 'hbox',
                                                                                align: 'stretch',
                                                                                padding: '1 0 1 0'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textareafield',
                                                                                    flex: 1,
                                                                                    height: 50,
                                                                                    id: prototype.TKT.id+'-txtFormPay',
                                                                                    margin: '0 1 5 1',
                                                                                    maxHeight: 100,
                                                                                    padding: '2 0 2 0',
                                                                                    fieldLabel: 'FOP',
                                                                                    labelSeparator: ' ',
                                                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    labelWidth: 80,
                                                                                    fieldStyle: 'color: #0B333C; font-size: 10px;'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            margins: '0 2 5 2',
                                                                            dock: 'bottom',
                                                                            bodyStyle: 'background:#E6EFF5',
                                                                            layout: {
                                                                                type: 'hbox',
                                                                                align: 'middle'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-lblTicket',
                                                                                    margin: '5 5 5 5',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                                                    text: '.....',
                                                                                    width: 200
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    flex: 2,
                                                                                    id: prototype.TKT.id+'-txtORIN',
                                                                                    margin: '0 2 0 2',
                                                                                    fieldLabel: 'ORIGINAL ISSUE',
                                                                                    labelStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;',
                                                                                    fieldStyle: 'color: #0B333C;font-weight:bold; font-size: 10px;'
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-TicketPadre',
                                                                                    hidden: true,
                                                                                    margin: '5 5 5 5',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                                                    text: '.....'
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-EsConjunto',
                                                                                    hidden: true,
                                                                                    margin: '5 5 5 5',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center',
                                                                                    text: '.....'
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    flex: 1,
                                                                                    id: prototype.TKT.id+'-TicketCompanion',
                                                                                    hidden: true,
                                                                                    margin: '5 5 5 5',
                                                                                    style: 'color: #0B333C;font-weight:bold; font-size: 18px;text-align:center;',
                                                                                    text: '.....'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    width: 335,
                                                    bodyStyle: 'background:#E8F9E8',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.TKT.id+'-boxProrrateInformation',
                                                            width: 290,
                                                            border: false,
                                                            bodyStyle: 'background:#E8F9E8',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Group',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtGRUPO',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 75
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtORIG',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Cur. Reg',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtMONREG',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 40
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Method',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtMethod',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 75
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtPRO',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Cnj',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCNJ',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 40
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Sale City',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCIUVTA',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 43
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtPAIVTA',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Transaction',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFEXCH',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 40
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Issue',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCIUEMI',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 43
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtPAIEMI',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Sale Date',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFECVTA',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 70
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Lnk',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            hidden: true,
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtNRPRT',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            hidden: true,
                                                                            width: 100
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Initial Trip',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtINITRA',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 76
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Status',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtA1530STPRO',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 70
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'IT',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCODIT',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            flex: 1
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'FARE',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtTARIFA',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 75
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtMONEDA',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'NUC',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtTRFNUC',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 56
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'EQV.',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtTRFPAG',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 75
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtMDAPAG',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'ROE',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtROE',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 56
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'S.Over',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCSOVER',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 75
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtQSOVER',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Plus',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCPLUSS',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 56
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Comm.',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCOMMIS',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 75
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtMDACOM',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Dsct',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            autoEl: {
                                                                                tag: 'label',
                                                                                'data-qtip': 'Dsc Comm.'
                                                                            },
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtPORCOM',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 56
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Adjust',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtTAJUST',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 77
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'AdjustQ',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtTAJUSQ',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 80
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    hidden: true,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Fare Calc.',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFARECAL720',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 90
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtMDAFRC',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 40
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Local Ex/Rate',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtRATE',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 70
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Status',
                                                                            style: 'text-align:center;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtSTAT',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 55
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Fare',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFARECOBL',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 90
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtCURR',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 40
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
//                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'ADC',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtPAGO',
                                                                            fieldStyle: 'text-align:right;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 90
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtPGCURR',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 40
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
//                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Crt by',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtREGIST',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 130
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFREGIS',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 85
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    margin: '2 0',
                                                                    bodyStyle: 'background:#E8F9E8',
                                                                    border: false,
                                                                    layout: {
                                                                        type: 'hbox'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Upd by',
                                                                            style: 'text-align:left;font-weight:bold;color:#0B333C;font-size: 10px;',
                                                                            padding: '4 0',
                                                                            width: 80
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtREVISA',
                                                                            fieldStyle: 'text-align:left;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 130
                                                                        },
                                                                        {xtype: 'tbspacer', flex: 1},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.TKT.id+'-txtFREVIS',
                                                                            fieldStyle: 'text-align:center;color:#0B333C;background-color:white;font-size: 10px;',
                                                                            readOnly: true,
                                                                            width: 85
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15}
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.TKT.id+'-boxCpnInfo',
                                            hidden: false,
                                            width: 1080,
                                            height: 175,
                                            layout: 'fit',
                                            bodyStyle: 'background:#E8F9E8',
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="gridDetCpnProrrate">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.TKT.id+'-gridDetCpnProrrate',
                                                    margin: '5 0',
                                                    bodyStyle: 'background:#E6EFF5',
                                                    height: 170,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            style: 'font-size:9px'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 30,
                                                                dataIndex: 'A720CONEX',
                                                                text: '<b style="font-size:9px;text-align:center">O</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 45,
                                                                dataIndex: 'A720RUTAO',
                                                                text: '<b style="font-size:9px">From</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    if (record.data.strDescRutaO !== "") {
                                                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaO+'"';
                                                                    }
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720RUTAD',
                                                                text: '<b style="font-size:9px">To</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    if (record.data.strDescRutaD !== "") {
                                                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaD+'"';
                                                                    }
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720CARRA',
                                                                text: '<b style="font-size:9px">Cr</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 55,
                                                                dataIndex: 'A720NVLO',
                                                                text: '<b style="font-size:9px">Flt</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 65,
                                                                dataIndex: 'A720FVLO',
                                                                text: '<b style="font-size:9px">Date</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 25,
                                                                dataIndex: 'A720BOOKI',
                                                                text: '<b style="font-size:9px">R</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 25,
                                                                dataIndex: 'A720CLASE',
                                                                text: '<b style="font-size:9px">C</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720FBUSO',
                                                                text: '<b style="font-size:9px">F Basis.</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720FARE',
                                                                text: '<b style="font-size:9px">Fare</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720TFARE',
                                                                text: '<b style="font-size:9px">ST</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 75,
                                                                dataIndex: 'A720SS',
                                                                text: '<b style="font-size:9px">Q</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 75,
                                                                dataIndex: 'A720VALOR',
                                                                text: '<b style="font-size:9px">Value</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'numbercolumn',
                                                                width: 70,
                                                                dataIndex: 'A720QIN',
                                                                text: '<b style="font-size:9px">Q Surcharge</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'numbercolumn',
                                                                width: 70,
                                                                dataIndex: 'A720YQ',
                                                                text: '<b style="font-size:9px">YQ</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720VLSRP',
                                                                text: '<b style="font-size:9px">SRP</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? "#FBD705" : (record.data.A720INDPR === 'S' ? '#FBD705' : '#FFFFFF');
                                                                    metaData.style = "font-size:9px !important;text-align:right; background:"+color;
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720VLMPA',
                                                                text: '<b style="font-size:9px">MPA</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? (record.data.A720INDPR === 'M' ? '#FBD705' : '#FFFFFF') : "#FFFFFF";
                                                                    metaData.style = "font-size:9px !important;text-align:right; background:"+color;
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720ACUE',
                                                                text: '<b style="font-size:9px">SPA</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = parseFloat(record.data.A720VALOR) === parseFloat(record.data.A720VLSRP) ? (record.data.A720INDPR === 'A' ? '#FBD705' : '#FFFFFF') : "#FFFFFF";
                                                                    metaData.style = "font-size:9px !important;text-align:right; background:"+color;
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720ISC',
                                                                text: '<b style="font-size:9px">ISC</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720AJUST',
                                                                text: '<b style="font-size:9px">Adjust</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">SPA</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720ACUEO',
                                                                        text: '<b style="font-size:9px">Force</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Factor</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720FACT',
                                                                        text: '<b style="font-size:9px">Millas</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">%</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720PPRO',
                                                                        text: '<b style="font-size:9px">Proviso</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Base</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720PROV',
                                                                        text: '<b style="font-size:9px">Amt</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Proration</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720PRRCM',
                                                                        text: '<b style="font-size:9px">Commision</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720PRSCM',
                                                                        text: '<b style="font-size:9px">SCM Rev</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'PRORAT_LOCAL_CUR',
                                                                        text: '<b style="font-size:9px">Local Currency</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                        //                                                    value = data.A720VALOR / data.A720TCAMB;
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720LYQ',
                                                                        text: '<b style="font-size:9px">YQ</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720LIV',
                                                                        text: '<b style="font-size:9px">IVA</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
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
                                            id: prototype.TKT.id+'-boxCpnInfoCTS',
                                            hidden: true,
                                            width: 1080,
                                            height: 175,
                                            layout: 'fit',
                                            bodyStyle: 'background:#E8F9E8',
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="gridDetCpnCTS">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.TKT.id+'-gridDetCpnCTS',
                                                    margin: '5 0',
                                                    bodyStyle: 'background:#E6EFF5',
                                                    height: 170,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            style: 'font-size:9px'

                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 130,
                                                                dataIndex: 'TICKET',
                                                                text: '<b style="font-size:9px;text-align:center">Ticket</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 40,
                                                                dataIndex: 'CUPON',
                                                                text: '<b style="font-size:9px;text-align:center">Cpn</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 30,
                                                                dataIndex: 'A720CONEX',
                                                                text: '<b style="font-size:9px;text-align:center">O</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 45,
                                                                dataIndex: 'A720RUTAO',
                                                                text: '<b style="font-size:9px">From</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    if (record.data.strDescRutaO !== "") {
                                                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaO+'"';
                                                                    }
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720RUTAD',
                                                                text: '<b style="font-size:9px">To</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    if (record.data.strDescRutaD !== "") {
                                                                        metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaD+'"';
                                                                    }
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720CARRA',
                                                                text: '<b style="font-size:9px">Cr</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 42,
                                                                dataIndex: 'A720NVLO',
                                                                text: '<b style="font-size:9px">Flt</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 60,
                                                                dataIndex: 'A720FVLO',
                                                                text: '<b style="font-size:9px">Date</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720BOOKI',
                                                                text: '<b style="font-size:9px">R</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720CLASE',
                                                                text: '<b style="font-size:9px">C</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720FBUSO',
                                                                text: '<b style="font-size:9px">F. Basis</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720FARE',
                                                                text: '<b style="font-size:9px">Fare</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 35,
                                                                dataIndex: 'A720TFARE',
                                                                text: '<b style="font-size:9px">ST</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720SS',
                                                                text: '<b style="font-size:9px">Q</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 70,
                                                                dataIndex: 'A720VLSRP',
                                                                text: '<b style="font-size:9px">SRP</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                width: 55,
                                                                dataIndex: 'A720VALOR',
                                                                text: '<b style="font-size:9px">Value</b>',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Q</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720QIN',
                                                                        text: '<b style="font-size:9px">Surcharge</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        width: 70,
                                                                        dataIndex: 'A720Q',
                                                                        text: '<b style="font-size:9px">Final</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Factor</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720FACT',
                                                                        text: '<b style="font-size:9px">Millas</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">% Proration</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720PPRO',
                                                                        text: '<b style="font-size:9px">Commision</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Proration</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 80,
                                                                        dataIndex: 'A720PRRCM',
                                                                        text: '<b style="font-size:9px">Commision</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">% Standard</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720ISC',
                                                                        text: '<b style="font-size:9px">Commision</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Amt Standard</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 80,
                                                                        dataIndex: 'A720VLISC',
                                                                        text: '<b style="font-size:9px">Commision</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">% Comm.</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 70,
                                                                        dataIndex: 'A720GSA',
                                                                        text: '<b style="font-size:9px">Upfront</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Amt Comm.</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 80,
                                                                        dataIndex: 'A720VLGSA',
                                                                        text: '<b style="font-size:9px">Upfront</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">% Total</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 80,
                                                                        dataIndex: 'dblISCGSA',
                                                                        text: '<b style="font-size:9px">Stand+Upfront</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:center";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Amt Total</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 100,
                                                                        dataIndex: 'dblVLISCVLGSA',
                                                                        text: '<b style="font-size:9px">Stand+Upfront</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:center";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">% Diff</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 60,
                                                                        dataIndex: 'dblISCGSAPPRO',
                                                                        text: '<b style="font-size:9px">Comm.</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Amt Diff</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 80,
                                                                        dataIndex: 'dblVLISCVLGSAPRRCM',
                                                                        text: '<b style="font-size:9px">Comm</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">% Comm.</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 40,
                                                                        dataIndex: '',
                                                                        text: '<b style="font-size:9px">Backend</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '<b style="font-size:9px">Amt Comm.</b>',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    style: 'font-size:9px'
                                                                },
                                                                columns: [
                                                                    {
                                                                        width: 40,
                                                                        dataIndex: '',
                                                                        text: '<b style="font-size:9px">Backend</b>',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "font-size:9px !important;text-align:right";
                                                                            return Ext.util.Format.number(value, '0,000.00');
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
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems:[
//        {
//            xtype: 'toolbar',
//            dock: 'bottom',
//            ui: 'footer',
//            margin: '4',
//            layout: {
//                type: 'hbox',
//                pack: 'end'
//            },
//            fieldStyle: 'text-align:center',
//            defaults:{
//                scale: 'medium'
//            },
//            items:[
//                {
//                    xtype: 'button',
//                    id: prototype.TKT.id+'-btnClose',
//                    style: 'background:#02507a',
//                    text: '<b style="color:white">Close</b>',
//                    tooltip: '\{ESC\}',
//                    listeners: {
//                        click: 'btnClose_clickHandler'
//                    }
//                }
//            ]
//        }
    ]
});