
//prototype.id1 = 'DataEntryDetail';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 800;//768

Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetail',

    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailSalesAuditAcceptedController'
    ],

    controller: 'DataEntryDetailSalesAuditAcceptedController',

    id: prototype.id1 + '-Contenedor',

    width: prototype.widthContenedor,
    height: prototype.heightContenedor,

    resizable: false,
    modal: true,
    layout: {
        type: 'fit'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.id1 + '-form',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: 1000,
                            defaults: {
                                border: false,
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    defaults: {
                                        border: true,
                                        style: 'margin: 1px;',
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                defaults: {
                                                    xtype: 'textfield',
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    readOnly: true
                                                },
                                                xtype: 'panel',
                                                layout: 'hbox',
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Issued By',
                                                            id: prototype.id1 + '-txtIssuedBy',
                                                            width: 150,
                                                            labelWidth: 60
                                                        },
                                                        {
                                                            fieldLabel: 'SRC',
                                                            width: 90,
                                                            id: prototype.id1 + '-txtSRC',
                                                            labelWidth: 40,
                                                            labelAlign: 'right'
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Endorsements Restrictions',
                                                            id: prototype.id1 + '-txtEndors',
                                                            flex: 1,
                                                            labelWidth: 155
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Name of Passenger',
                                                            id: prototype.id1 + '-txtPassenger',
                                                            flex: 1,
                                                            labelWidth: 155
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'label', border: false,
                                                            text: 'Issued in Exchange: ',
                                                            style: 'font-weight: bold; font-size: 11px;',
                                                            //margin: '0 0 0 10'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id1 + '-txtIssExc', border: false,
                                                            width: 100,
                                                            style: 'font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;',
                                                            margin: '0 0 0 10',
                                                            listeners: {
                                                                render: function (c) {
                                                                    c.getEl().on('click', function () {
                                                                        Ext.getCmp(prototype.id1 + '-Contenedor').getController().onIssExcClick('1');
                                                                    }, c);
                                                                }
                                                            }

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id1 + '-txtIssExc2', border: false,
                                                            width: 100,
                                                            style: 'font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;',
                                                            margin: '0 0 0 10',
                                                            listeners: {
                                                                render: function (c) {
                                                                    c.getEl().on('click', function () {
                                                                        Ext.getCmp(prototype.id1 + '-Contenedor').getController().onIssExcClick('2');
                                                                    }, c);
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id1 + '-txtIssExc3', border: false,
                                                            width: 100,
                                                            style: 'font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;',
                                                            margin: '0 0 0 10',
                                                            listeners: {
                                                                render: function (c) {
                                                                    c.getEl().on('click', function () {
                                                                        Ext.getCmp(prototype.id1 + '-Contenedor').getController().onIssExcClick('3');
                                                                    }, c);
                                                                }
                                                            }
                                                        }
                                                        /*{
                                                         fieldLabel: 'Issued in Exchange',
                                                         labelWidth: 115,
                                                         id: prototype.id1 + '-txtIssExc',
                                                         style: 'font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;',
                                                         width: 210
                                                         //flex: 1
                                                         },
                                                         {
                                                         hideLabel: true,
                                                         width: 90,
                                                         id: prototype.id1 + '-txtIssExc2',
                                                         style: 'font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;'
                                                         },
                                                         {
                                                         hideLabel: true,
                                                         width: 90,
                                                         id: prototype.id1 + '-txtIssExc3',
                                                         style: 'font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;'
                                                         }*/
                                                    ]
                                                }



                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 250,
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                defaults: {
                                                    xtype: 'textfield',
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    readOnly: true
                                                },
                                                xtype: 'panel',
                                                layout: 'hbox',
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Pax Tkt - Baggage',
                                                            labelWidth: 115,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Tour Code',
                                                            id: prototype.id1 + '-txtTourC',
                                                            labelWidth: 115,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Reservation Date',
                                                            labelWidth: 115,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Conjunction Tickets',
                                                            id: prototype.id1 + '-txtEsConjunto',
                                                            labelWidth: 115,
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 200,
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                defaults: {
                                                    xtype: 'textfield',
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    readOnly: true
                                                },
                                                xtype: 'panel',
                                                layout: 'hbox',
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Origin/Destination',
                                                            labelAlign: 'top',
                                                            id: prototype.id1 + '-txtOriginDesti',
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Booking',
                                                            labelWidth: 60,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Original Issue',
                                                            flex: 1,
                                                            labelWidth: 155,
                                                            id: prototype.id1 + '-txtORIN'
                                                        }

                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            width: 150,
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                defaults: {
                                                    xtype: 'textfield',
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    readOnly: true
                                                },
                                                xtype: 'panel',
                                                layout: 'hbox',
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Date/Place of Issue',
                                                            labelAlign: 'top',
                                                            id: prototype.id1 + '-txtDatePlace',
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Agent',
                                                            id: prototype.id1 + '-txtAgentF',
                                                            labelWidth: 40,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'PNR',
                                                            id: prototype.id1 + '-txtPNR',
                                                            labelWidth: 40,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    defaults: {
                                        style: 'margin: 1px;'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id1 + '-gridComponent3',
                                            flex: 1,
                                            height: 70,
                                            columns: {
                                                items: [
                                                    {text: 'Cpn', dataIndex: 'CDGT', flex: 1},
                                                    {text: 'X/O', dataIndex: 'STPO', flex: 1},
                                                    {text: 'From', dataIndex: 'ORAC', flex: 1},
                                                    {text: 'To', dataIndex: 'DSTC', flex: 1},
                                                    {text: 'CR', dataIndex: 'CARR', flex: 1},
                                                    {text: 'Flight', dataIndex: 'FTNR', flex: 1},
                                                    {text: 'Class', dataIndex: 'RBKD', flex: 1},
                                                    {text: 'Date', dataIndex: 'FTDA', flex: 1},
                                                    {text: 'Time', dataIndex: 'FTDT', flex: 1},
                                                    {text: 'F.Basis', dataIndex: 'FBTD', flex: 1},
                                                    {text: 'NVB', dataIndex: 'NBDA', flex: 1},
                                                    {text: 'ACC.Date', dataIndex: 'NADA', flex: 1},
                                                    {text: 'Used', dataIndex: 'strUso', flex: 1}
                                                ],
                                                defaults: {
                                                    menuDisabled: true,
                                                    align: 'center'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    defaults: {
                                        border: true,
                                        style: 'margin: 1px;'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                defaults: {
                                                    xtype: 'textfield',
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    readOnly: true
                                                },
                                                xtype: 'panel',
                                                layout: 'hbox',
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Fare',
                                                            labelWidth: 70,
                                                            id: prototype.id1 + '-txtFareC',
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Eqv. Fare',
                                                            id: prototype.id1 + '-txtEquivFa',
                                                            labelWidth: 70,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'textarea',
                                                            fieldLabel: 'Taxes',
                                                            id: prototype.id1 + '-txtTaxes',
                                                            labelWidth: 70,
                                                            flex: 1,
                                                            grow: true,
                                                            height: 50
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Total',
                                                            labelWidth: 70,
                                                            id: prototype.id1 + '-txtTotal',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                defaults: {
                                                    xtype: 'textfield',
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    readOnly: true
                                                },
                                                xtype: 'panel',
                                                layout: 'hbox',
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'textarea',
                                                            labelAlign: 'top',
                                                            fieldLabel: 'Fare Calculation',
                                                            id: prototype.id1 + '-txtFareCal',
                                                            labelWidth: 70,
                                                            flex: 1,
                                                            grow: true,
                                                            height: 74
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            fieldLabel: 'Form of Payment',
                                                            id: prototype.id1 + '-txtFormPay',
                                                            labelWidth: 120,
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id1 + '-txtNUMBERTKT', border: false,
                                                            text: '111 - 1111111111',
                                                            style: 'color: #C46600; fontWeight:bold; '
                                                                    //margin: '0 0 0 10'
                                                        },
                                                        /*{
                                                         hideLabel: true,
                                                         id: prototype.id1 + '-txtNUMBERTKT',
                                                         style: 'background-color: #C46600;',
                                                         width: 150
                                                         },*/
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            xtype: 'button',
                                                            width: 80,
                                                            id: prototype.id1 + '-txtupdateTKTOri',
                                                            hidden: true,
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over',
                                                            text: '<span style="color: white; font-weight: bold;">Return</span>',
                                                            listeners: {
                                                                click: 'onTKTOrigiClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 80,
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over',
                                                            text: '<span style="color: white; font-weight: bold;">PDI</span>',
                                                            listeners: {
                                                                click: 'onPDIClick'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 80,
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over',
                                                            text: '<span style="color: white; font-weight: bold;">Close</span>',
                                                            listeners: {
                                                                click: 'onCloseClick'
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
                                    layout: 'hbox',
                                    defaults: {
                                        border: false,
                                        style: 'margin: 1px;'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            defaults: {
                                                border: false,
                                                style: 'margin: 2px;',
                                                xtype: 'textfield',
                                                labelStyle: 'font-weight: bold; font-size: 11px;',
                                                readOnly: true
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Assigned to',
                                                    id: prototype.id1 + '-txtAssignedto',
                                                    labelWidth: 80,
                                                    width: 200
                                                },
                                                {
                                                    fieldLabel: 'Date',
                                                    id: prototype.id1 + '-txtAssignedDate',
                                                    labelWidth: 40,
                                                    width: 120
                                                },
                                                {
                                                    fieldLabel: 'Audited by',
                                                    id: prototype.id1 + '-txtAuditedby',
                                                    labelWidth: 80,
                                                    width: 200
                                                },
                                                {
                                                    fieldLabel: 'Date',
                                                    id: prototype.id1 + '-txtAuditedDate',
                                                    labelWidth: 40,
                                                    width: 120
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
                            flex: true,
                            style: 'margin: 1px;',
                            defaults: {
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    defaults: {
                                        border: true,
                                        style: 'margin: 2px;',
                                        xtype: 'button',
                                        width: 80,
                                        cls: 'x-btn-sent',
                                        overCls: 'x-btn-sent-over'
                                    },
                                    items: [
                                        {
                                            text: '<span style="color: white; font-weight: bold;">Delivery</span>',
                                            listeners: {
                                                click: 'onDeliveryBtnClick'
                                            }
                                        },
                                        {
                                            text: '<span style="color: white; font-weight: bold;">TKT Reasons</span>',
                                            listeners: {
                                                click: 'onTicketReasonsBtnClick'
                                            }
                                        },
                                        {
                                            text: '<span style="color: white; font-weight: bold;">FOP</span>',
                                            listeners: {
                                                click: 'ontFOPBtnClick'
                                            }
                                        },
                                        {
                                            text: '<span style="color: white; font-weight: bold;">Historial</span>',
                                            listeners: {
                                                click: 'onHistorialBtnClick'
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    title: 'CALCULATION BOX',
                                    id: prototype.id1 + '-gridComponent',
                                    flex: 1,
                                    height: 300,
                                    columns: {
                                        items: [
                                            {text: '', dataIndex: 'VP_OPTION', flex: 1},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Detail',
                                                        handler: 'onDetailBoxClick'
                                                    }
                                                ]
                                            },
                                            {text: 'Our<br/>Calculation', dataIndex: 'A1672FMORI', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Agent<br/>Calculation', dataIndex: 'A1672FAORI', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Difference', dataIndex: 'A1672FADIF', flex: 1, renderer: 'onColumnAmountRenderer'}
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: true,
                    style: 'margin: 1px;',
                    defaults: {
                        border: false,
                        style: 'margin: 1px;',
                        defaults: {
                            xtype: 'textfield',
                            // labelStyle: 'font-weight: bold; font-size: 11px;',
                            labelStyle: 'font-size: 11px;',
                            readOnly: true
                        },
                        xtype: 'panel',
                        layout: 'hbox',
                    },
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Ticket',
                                    id: prototype.id1 + '-txtTicket',
                                    labelWidth: 45,
                                    width: 140
                                },
                                {
                                    fieldLabel: 'Seq.',
                                    id: prototype.id1 + '-txtSeq',
                                    labelWidth: 35,
                                    labelAlign: 'right',
                                    width: 80
                                },
                                {
                                    fieldLabel: 'Coupons',
                                    id: prototype.id1 + '-txtCoupons',
                                    labelWidth: 55,
                                    labelAlign: 'right',
                                    width: 100
                                },
                                {
                                    fieldLabel: 'Group',
                                    id: prototype.id1 + '-txtGroup',
                                    labelWidth: 45,
                                    labelAlign: 'right',
                                    width: 110,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                },
                                {
                                    fieldLabel: 'Trnx.',
                                    labelWidth: 35,
                                    id: prototype.id1 + '-txtTrnx',
                                    labelAlign: 'right',
                                    width: 90
                                },
                                {
                                    fieldLabel: 'Agency',
                                    id: prototype.id1 + '-txtAgency',
                                    labelWidth: 50,
                                    labelAlign: 'right',
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Sale Date',
                                    id: prototype.id1 + '-txtSaleDate',
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Sale City',
                                    id: prototype.id1 + '-txtSaleCity',
                                    labelWidth: 55,
                                    labelAlign: 'right',
                                    width: 95
                                },
                                {
                                    hideLabel: true,
                                    width: 35,
                                    id: prototype.id1 + '-txtPaiVta',
                                    style: 'margin-left: 1px'
                                },
                                {
                                    fieldLabel: 'Issue City',
                                    id: prototype.id1 + '-txtIssueCity',
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    width: 95,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                },
                                {
                                    hideLabel: true,
                                    id: prototype.id1 + '-txtPaiUso',
                                    width: 35,
                                    style: 'margin-left: 1px'
                                },
                                {
                                    fieldLabel: 'Pax City',
                                    id: prototype.id1 + '-txtPaxCity',
                                    labelWidth: 55,
                                    labelAlign: 'right',
                                    width: 100,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                },
                                {
                                    fieldLabel: 'Waiver',
                                    labelWidth: 45,
                                    id: prototype.id1 + '-txtWaiver2',
                                    labelAlign: 'right',
                                    width: 100,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                },
                                {
                                    fieldLabel: 'Rever. date',
                                    id: prototype.id1 + '-txtReverdate',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 125,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'FARE',
                                    labelWidth: 45,
                                    width: 115,
                                    id: prototype.id1 + '-txtFARE',
                                },
                                {
                                    hideLabel: true,
                                    width: 35,
                                    id: prototype.id1 + '-txtCur',
                                    style: 'margin-left: 1px'
                                },
                                {
                                    fieldLabel: 'NUC',
                                    labelWidth: 35,
                                    id: prototype.id1 + '-txtNUC',
                                    labelAlign: 'right',
                                    width: 85
                                },
                                {
                                    fieldLabel: 'ROE',
                                    labelWidth: 35,
                                    id: prototype.id1 + '-txtROE',
                                    labelAlign: 'right',
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Plus',
                                    id: prototype.id1 + '-txtPlus',
                                    labelWidth: 35,
                                    labelAlign: 'right',
                                    width: 85
                                },
                                {
                                    fieldLabel: 'S.Over',
                                    id: prototype.id1 + '-txtSOver',
                                    labelWidth: 40,
                                    labelAlign: 'right',
                                    width: 85
                                },
                                {
                                    hideLabel: true,
                                    width: 35,
                                    id: prototype.id1 + '-txtSOver2',
                                    style: 'margin-left: 1px'
                                },
                                {
                                    fieldLabel: 'Exch.Rate to Rev',
                                    labelWidth: 105,
                                    id: prototype.id1 + '-txtRate',
                                    labelAlign: 'right',
                                    width: 180
                                },
                                {
                                    fieldLabel: 'IT',
                                    id: prototype.id1 + '-txtIT',
                                    labelWidth: 25,
                                    labelAlign: 'right',
                                    width: 130
                                },
                                {
                                    fieldLabel: 'Doc.Type',
                                    id: prototype.id1 + '-txtDocType',
                                    labelWidth: 55,
                                    labelAlign: 'right',
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Source',
                                    id: prototype.id1 + '-txtSource',
                                    labelWidth: 50,
                                    labelAlign: 'right',
                                    width: 100
                                },
                                {
                                    fieldLabel: 'EMD Real',
                                    labelWidth: 60,
                                    id: prototype.id1 + '-txtEMDReal',
                                    labelAlign: 'right',
                                    width: 150
                                },
                                {
                                    fieldLabel: 'Channel',
                                    labelWidth: 55,
                                    id: prototype.id1 + '-txtChannel',
                                    labelAlign: 'right',
                                    width: 115
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Equiv.',
                                    id: prototype.id1 + '-txtEquiv',
                                    labelWidth: 45,
                                    width: 115
                                },
                                {
                                    hideLabel: true,
                                    width: 35,
                                    id: prototype.id1 + '-txtEquivCur',
                                    style: 'margin-left: 1px'
                                },
                                {
                                    fieldLabel: 'FCMI',
                                    id: prototype.id1 + '-txtFCMI',
                                    labelWidth: 35,
                                    labelAlign: 'right',
                                    width: 65
                                },
                                {
                                    fieldLabel: 'Fare Type',
                                    labelWidth: 70,
                                    id: prototype.id1 + '-txtFareType',
                                    labelAlign: 'right',
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Refund Type',
                                    labelWidth: 40,
                                    id: prototype.id1 + '-txtRefundType',
                                    labelAlign: 'right',
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Exch Type',
                                    labelWidth: 40,
                                    id: prototype.id1 + '-txtExchType',
                                    labelAlign: 'right',
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Comm.AM',
                                    labelWidth: 65,
                                    id: prototype.id1 + '-txtComment',
                                    labelAlign: 'right',
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Comm',
                                    labelWidth: 40,
                                    id: prototype.id1 + '-txtCommentMIA',
                                    labelAlign: 'right',
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Involuntary',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 100
                                },
                                {
                                    fieldLabel: 'BSR',
                                    labelWidth: 35,
                                    id: prototype.id1 + '-txtBSR',
                                    labelAlign: 'right',
                                    width: 80,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                },
                                {
                                    fieldLabel: 'Error',
                                    id: prototype.id1 + '-txtError',
                                    labelWidth: 45,
                                    labelAlign: 'right',
                                    width: 150,
                                    labelStyle: 'font-weight: bold; font-size: 11px;'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'ADC.',
                                    labelWidth: 45,
                                    width: 115,
                                    id: prototype.id1 + '-txtADC'
                                },
                                {
                                    hideLabel: true,
                                    width: 35,
                                    style: 'margin-left: 1px'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Original Issue',
                                    style: 'font-weight: bold; font-size: 11px; margin-top: 3px;',
                                    width: 80
                                },
                                {
                                    fieldLabel: 'Ticket',
                                    labelWidth: 35,
                                    id: prototype.id1 + '-txtTktOrig',
                                    labelAlign: 'right',
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Agency',
                                    labelWidth: 45,
                                    id: prototype.id1 + '-txtAgentOrig',
                                    labelAlign: 'right',
                                    width: 100
                                },
                                {
                                    fieldLabel: 'Issue Date',
                                    id: prototype.id1 + '-txtFecUsoOrig',
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    width: 130
                                },
                                {
                                    fieldLabel: 'Place',
                                    labelWidth: 40,
                                    id: prototype.id1 + '-txtPlace',
                                    labelAlign: 'right',
                                    width: 90
                                },
                                {
                                    fieldLabel: 'Qty',
                                    labelWidth: 30,
                                    id: prototype.id1 + '-txtQty',
                                    labelAlign: 'right',
                                    width: 90
                                },
                                {
                                    fieldLabel: 'Orig. Trnx',
                                    id: prototype.id1 + '-lblOrigTrnx',
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    flex: 1
                                },
                                {
                                    fieldLabel: 'Orig. Date',
                                    labelWidth: 60,
                                    id: prototype.id1 + '-txtOrigDate',
                                    labelAlign: 'right',
                                    flex: 1
                                },
                                {
                                    fieldLabel: 'Orig. Agency',
                                    id: prototype.id1 + '-txtOrigAgency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    flex: 1
                                },
                                {
                                    fieldLabel: 'Orig. Source',
                                    id: prototype.id1 + '-txtOrigSource',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    // layout: 'hbox',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'ITINERARY AGENT',
                                    style: 'font-weight: bold; font-size: 11px; margin-top: 3px;',
                                    flex: 1
                                },
                                {
                                    xtype: 'label',
                                    text: 'FARE COMPONENT AGENT',
                                    style: 'font-weight: bold; font-size: 11px; margin-top: 3px;',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridComponent2',
                                    flex: 1,
                                    height: 85,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Ticket</span>', dataIndex: 'VP_FRMSRIE', width: 105},
                                            {text: '<span style="font-size: 10px;">Cpn</span>', dataIndex: 'A1672CUPON', flex: 1},
                                            {text: '<span style="font-size: 10px;">Cnx</span>', dataIndex: 'A1672CONEX', flex: 1},
                                            {text: '<span style="font-size: 10px;">From</span>', dataIndex: 'ORIGEN', flex: 1},
                                            {text: '<span style="font-size: 10px;">To</span>', dataIndex: 'DESTINO', flex: 1},
                                            {text: '<span style="font-size: 10px;">Carrier</span>', dataIndex: 'A1672CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Flight<br/>Num</span>', dataIndex: 'A1672NVLO', flex: 1, renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">Flight<br/>Date</span>', dataIndex: 'A1672FVLO', width: 70},
                                            {text: '<span style="font-size: 10px;">Cabin</span>', dataIndex: 'A1672CABIN', flex: 1},
                                            {text: '<span style="font-size: 10px;">Class</span>', dataIndex: 'A1672CLASE', flex: 1},
                                            {text: '<span style="font-size: 10px;">F.Basis</span>', dataIndex: 'A1672FBASI', flex: 1, renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">Usage</span>', dataIndex: 'A1672CPNS', flex: 1}
                                        ],
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridComp',
                                    flex: 1,
                                    height: 85,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Corrl.</span>', dataIndex: 'A1580CORRL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Component</span>', dataIndex: 'A1580FROM', width: 80},
                                            {text: '<span style="font-size: 10px;">Carrier</span>', dataIndex: 'A1580CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Fare<br/>Basis</span>', dataIndex: 'A1580FBASI', renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">NUC/<br/>Cur</span>', dataIndex: 'A1580MDA', flex: 1},
                                            {text: '<span style="font-size: 10px;">Fare</span>', dataIndex: 'A1580FARE', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Q</span>', dataIndex: 'A1580Q', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Cur<br/>Agent</span>', dataIndex: 'A1580MORIG', flex: 1},
                                            {text: '<span style="font-size: 10px;">Fare<br/>Agent</span>', dataIndex: 'A1580FAORI', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Q<br/>Agent</span>', dataIndex: 'A1580QORIG', flex: 1, renderer: 'onColumnAmountRenderer'}
                                        ],
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    tabPosition: 'left',
                    height: 235,
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            iconCls: 'prx-icon-image-file',
                            tooltip: 'FARE COMPONENT AIRLINE',
                            defaults: {
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    defaults: {
                                        style: 'margin: 2px;',
                                        xtype: 'textfield',
                                        labelStyle: 'font-size: 11px;',
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'FARE COMPONENT AIRLINE',
                                            style: 'font-weight: bold; font-size: 11px; margin-top: 3px;',
                                            width: 100
                                        },
                                        {
                                            fieldLabel: 'Local Curr.',
                                            labelWidth: 70,
                                            id: prototype.id1 + '-txtCURAIR',
                                            labelAlign: 'right',
                                            width: 120
                                        },
                                        {
                                            fieldLabel: 'Fare',
                                            id: prototype.id1 + '-txtFareAIR',
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 120
                                        },
                                        {
                                            hideLabel: true,
                                            margin: '2 2 2 -1',
                                            id: prototype.id1 + '-txtCurAIR',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'Equiv.',
                                            labelWidth: 40,
                                            id: prototype.id1 + '-txtEquivAIR',
                                            labelAlign: 'right',
                                            width: 120
                                        },
                                        {
                                            hideLabel: true,
                                            id: prototype.id1 + '-txtEquivCurAIR',
                                            margin: '2 2 2 -1',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'YQ PAY.',
                                            labelWidth: 50,
                                            id: prototype.id1 + '-txtYQPAY1',
                                            labelAlign: 'right',
                                            width: 130
                                        },
                                        {
                                            hideLabel: true,
                                            margin: '2 2 2 -1',
                                            id: prototype.id1 + '-txtYQPAY2',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'YR PAY.',
                                            labelWidth: 50,
                                            id: prototype.id1 + '-txtYRPAY1',
                                            labelAlign: 'right',
                                            width: 130
                                        },
                                        {
                                            hideLabel: true,
                                            margin: '2 2 2 -1',
                                            id: prototype.id1 + '-txtYRPAY2',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'S/Charge.',
                                            id: prototype.id1 + '-txtCharge1',
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            width: 130
                                        },
                                        {
                                            hideLabel: true,
                                            id: prototype.id1 + '-txtCharge2',
                                            margin: '2 2 2 -1',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'Penal. PAY',
                                            id: prototype.id1 + '-txtPenalty1',
                                            labelWidth: 60,
                                            labelAlign: 'right',
                                            width: 130
                                        },
                                        {
                                            hideLabel: true,
                                            id: prototype.id1 + '-txtPenalty2',
                                            margin: '2 2 2 -1',
                                            width: 40
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridComponentOldSALES',
                                    border: true,
                                    flex: 1,
                                    height: 150,
                                    columnLines: true,
                                    autoScroll: true,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Corrl.</span>', dataIndex: 'A1580CORRL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Component</span>', dataIndex: 'A1580FROM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Carr</span>', dataIndex: 'A1580CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Class</span>', dataIndex: 'A1580CLASE', flex: 1},
                                            {text: '<span style="font-size: 10px;">FBasis</span>', dataIndex: 'A1580FBASI', flex: 1},
                                            {text: '<span style="font-size: 10px;">Cur<br/>ATPCO</span>', dataIndex: 'A1580MDAAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ROE</span>', dataIndex: 'A1580ROEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">FARE<br/>ATPCO</span>', dataIndex: 'A1580FARAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q.<br/>ATPCO</span>', dataIndex: 'A1580QATPC', flex: 1},
                                            {text: '<span style="font-size: 10px;">SOVER<br/>ATPCO</span>', dataIndex: 'A1580SOATP', flex: 1},
                                            {text: '<span style="font-size: 10px;">YQ<br/>ATPCO</span>', dataIndex: 'A1580YQATP', flex: 1},
                                            {text: '<span style="font-size: 10px;">YR<br/>ATPCO</span>', dataIndex: 'A1580YRATP', flex: 1},
                                            {text: '<span style="font-size: 10px;">CUR<br/>AIRLINE</span>', dataIndex: 'A1580MDA', flex: 1},
                                            {text: '<span style="font-size: 10px;">FARE<br/>AIRLINE</span>', dataIndex: 'A1580FMIOR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q<br/>AIRLINE</span>', dataIndex: 'A1580QMIOR', flex: 1},
                                            {text: '<span style="font-size: 10px;">SOVER<br/>AIRLINE</span>', dataIndex: 'A1580SOMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">YQ<br/>AIRLINE</span>', dataIndex: 'A1580YQMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">YR<br/>AIRLINE</span>', dataIndex: 'A1580YRMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">FARE<br/>Diff.</span>', dataIndex: 'A1580FADIF', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q.Diff.</span>', dataIndex: 'A1580QDIF', flex: 1},
                                            {text: '<span style="font-size: 10px;">Status</span>', dataIndex: 'A1580STAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ADM</span>', dataIndex: 'A1580FLADM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Error</span>', dataIndex: 'A1580ERROR', flex: 1}
                                        ]
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridComponentOldRFND',
                                    border: true, hidden: true,
                                    flex: 1,
                                    height: 150,
                                    columnLines: true,
                            autoScroll: true,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Corrl.</span>', dataIndex: 'A1580CORRL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Component</span>', dataIndex: 'A1580FROM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Carr</span>', dataIndex: 'A1580CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Class</span>', dataIndex: 'A1580CLASE', flex: 1},
                                            {text: '<span style="font-size: 10px;">FBasis</span>', dataIndex: 'A1580FBASI', flex: 1},
                                            {text: '<span style="font-size: 10px;">Cur<br/>ATPCO</span>', dataIndex: 'A1580MDAAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ROE</span>', dataIndex: 'A1580ROEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">PnltyFee<br/>Atpco</span>', dataIndex: 'A1580FEEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">Nuc/<br/>Cur</span>', dataIndex: 'A1580MORIG', flex: 1},

                                            {text: '<span style="font-size: 10px;">FARE</span>', dataIndex: 'A1580FARE', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q</span>', dataIndex: 'A1580QORIG', flex: 1},
                                            {text: '<span style="font-size: 10px;">StOver</span>', dataIndex: 'A1580SOVER', flex: 1},
                                            {text: '<span style="font-size: 10px;">Cur<br/>Airline</span>', dataIndex: 'A1580MDA', flex: 1},
                                            {text: '<span style="font-size: 10px;">Fare<br/>Airline</span>', dataIndex: 'A1580FAORI', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q<br/>Airline</span>', dataIndex: 'A1580QMIOR', flex: 1},
                                            {text: '<span style="font-size: 10px;">StOver<br/>Airline</span>', dataIndex: 'A1580SOMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">PnltyFee<br/>Airline</span>', dataIndex: 'A1580PENAL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Apply<br/>RFND</span>', dataIndex: 'A1580APPLY', flex: 1},
                                            {text: '<span style="font-size: 10px;">Incl<br/>Cpn</span>', dataIndex: 'A1580INCCP', flex: 1},
                                            {text: '<span style="font-size: 10px;">Excl<br/>Pnlty<br/>Fee</span>', dataIndex: 'A1580EXCLU', flex: 1},
                                            {text: '<span style="font-size: 10px;">Status</span>', dataIndex: 'A1580STAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ADM</span>', dataIndex: 'A1580FLADM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Error</span>', dataIndex: 'A1580ERROR', flex: 1}
                                        ]
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                },
                                {
                                    xtype: 'panel', id: prototype.id1 + '-priciComponentOLD',
                                    layout: 'hbox', hidden: true,
                                    defaults: {
                                        style: 'margin: 2px;',
                                        xtype: 'textfield',
                                        labelStyle: 'font-size: 11px;',
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'OLD FARE COMPONENT',
                                            style: 'font-weight: bold; font-size: 11px; margin-top: 3px;',
                                            width: 300
                                        },
                                        {
                                            fieldLabel: 'PENALTY PAY',
                                            labelWidth: 90,
                                            id: prototype.id1 + '-txtFarePENAL2',
                                            labelAlign: 'right',
                                            width: 130
                                        },
                                        {
                                            hideLabel: true,
                                            id: prototype.id1 + '-txtCURAPENAL2',
                                            margin: '2 2 2 -1',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'IVA',
                                            labelWidth: 50,
                                            id: prototype.id1 + '-txtFareIVA2',
                                            labelAlign: 'right',
                                            width: 130
                                        },
                                        {
                                            hideLabel: true,
                                            margin: '2 2 2 -1',
                                            id: prototype.id1 + '-txtFarePOR2',
                                            width: 40
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid', hidden: true,
                                    id: prototype.id1 + '-gridComponentOLD',
                                    border: true,
                                    flex: 1,
                                    columnLines: true,
                            autoScroll: true,
                                    height: 85,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Corrl<br/>Tkt</span>', dataIndex: 'A1580CORRL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Old<br/>Tkt</span>', dataIndex: 'A2837CIANW', width: 110},
                                            {text: '<span style="font-size: 10px;">New<br/>Tkt</span>', dataIndex: 'A2837CIAPA', width: 110},
                                            {text: '<span style="font-size: 10px;">Corrl<br/>Comp</span>', dataIndex: 'A2837CCORR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Component</span>', dataIndex: 'A1580FROM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Carr</span>', dataIndex: 'A1580CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Class</span>', dataIndex: 'A1580CLASE', flex: 1},
                                            {text: '<span style="font-size: 10px;">FBasis</span>', dataIndex: 'A1580FBASI', flex: 1, renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">Cur<br/>ATPCO</span>', dataIndex: 'A1580MDAAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ROE</span>', dataIndex: 'A1580ROEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">Pnlty<br/>Fee<br/>ATPCO</span>', dataIndex: 'A1580FEEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">NUC/<br/>Curr</span>', dataIndex: 'A1580MDA', flex: 1},
                                            {text: '<span style="font-size: 10px;">FARE</span>', dataIndex: 'A1580FARE', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Q</span>', dataIndex: 'A1580Q', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Pnlty<br/>Fee<br/>Airline</span>', dataIndex: 'A2837FEEMI', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Apply<br/>RFND</span>', dataIndex: 'A1580APPLY', flex: 1},
                                            {text: '<span style="font-size: 10px;">BSR</span>', dataIndex: 'A2837BSR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Orig<br/>Date</span>', dataIndex: 'A2837FEMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">Orig<br/>Trnx</span>', dataIndex: 'A2837TRNCO', flex: 1},
                                            {text: '<span style="font-size: 10px;">Error</span>', dataIndex: 'A1580ERROR', flex: 1}
                                        ]
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                }
                            ]
                        },
                        {
                            iconCls: 'prx-icon-104-ticket',
                            tooltip: 'OLD FARE COMPONENT',
                            //iconCls: 'prx-icon-image-file',
                            id: prototype.id1 + '-Principal_FARECOMPONENTUSED',
                            defaults: {
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'panel', hidden: true,
                                    layout: 'hbox',
                                    defaults: {
                                        style: 'margin: 2px;',
                                        xtype: 'textfield',
                                        labelStyle: 'font-size: 11px;',
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Local Curr.',
                                            id: prototype.id1 + '-txtLocalCurr',
                                            labelWidth: 70,
                                            labelAlign: 'right',
                                            width: 120
                                        },
                                        {
                                            fieldLabel: 'Fare',
                                            labelWidth: 40,
                                            // id: prototype.id1 + '-txtFareAIR',
                                            labelAlign: 'right',
                                            width: 120
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid', hidden: true,
                                    border: true,
                                    id: prototype.id1 + '-gridFCRfndUsed',
                                    flex: 1,
                                    height: 120,
                                    columnLines: true,
                            autoScroll: true,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Corrl.</span>', dataIndex: 'A1580CORRL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Component</span>', dataIndex: 'A1580FROM', flex: 1, renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">Carrier</span>', dataIndex: 'A1580CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Class</span>', dataIndex: 'A1580CLASE', flex: 1},
                                            {text: '<span style="font-size: 10px;">Fare<br/>Basis</span>', dataIndex: 'A1580FBASI', flex: 1, renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">Cur<br/>ATPCO</span>', dataIndex: 'A1580MDAAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ROE</span>', dataIndex: 'A1580ROEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">Pnlty<br/>Fee<br/>ATPCO</span>', dataIndex: 'A1580FEEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">NUC/<br/>Curr</span>', dataIndex: 'A1580NUC', flex: 1},
                                            {text: '<span style="font-size: 10px;">FARE</span>', dataIndex: 'A1580FARE', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q</span>', dataIndex: 'A1580Q', flex: 1},
                                            {text: '<span style="font-size: 10px;">SOver</span>', dataIndex: 'A1580SOVER', flex: 1},
                                            {text: '<span style="font-size: 10px;">Cur<br/>Airline</span>', dataIndex: 'A1580MMORI', flex: 1},
                                            {text: '<span style="font-size: 10px;">Fare<br/>Airline</span>', dataIndex: 'A1580FMIOR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Q<br/>Airline</span>', dataIndex: 'A1580QMIOR', flex: 1},
                                            {text: '<span style="font-size: 10px;">SOVER<br/>Airline</span>', dataIndex: 'A1580SOMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">Pnlty Fee<br/>Airline</span>', dataIndex: 'A1580PENAL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Apply<br/>RFND</span>', dataIndex: 'A1580APPLY', flex: 1},
                                            {text: '<span style="font-size: 10px;">Incl<br/>CPN</span>', dataIndex: 'A1580INCCP', flex: 1},
                                            {text: '<span style="font-size: 10px;">Excl <br/>Pnlty <br/>Fee</span>', dataIndex: 'A1580EXCLU', flex: 1},
                                            {text: '<span style="font-size: 10px;">Status</span>', dataIndex: 'A1580STAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ADM</span>', dataIndex: 'A1580FLADM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Error</span>', dataIndex: 'A1580ERROR', flex: 1}
                                        ]
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    defaults: {
                                        style: 'margin: 2px;',
                                        xtype: 'textfield',
                                        labelStyle: 'font-size: 11px;',
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'OLD FARE COMPONENT',
                                            style: 'font-weight: bold; font-size: 11px; margin-top: 3px;',
                                            width: 300
                                        },
                                        {
                                            fieldLabel: 'PENALTY PAY',
                                            labelWidth: 90,
                                            id: prototype.id1 + '-txtFarePENAL',
                                            labelAlign: 'right',
                                            width: 160
                                        },
                                        {
                                            hideLabel: true,
                                            id: prototype.id1 + '-txtCURAPENAL',
                                            margin: '2 2 2 -1',
                                            width: 40
                                        },
                                        {
                                            fieldLabel: 'IVA',
                                            labelWidth: 50,
                                            id: prototype.id1 + '-txtFareIVA',
                                            labelAlign: 'right',
                                            width: 160
                                        },
                                        {
                                            hideLabel: true,
                                            margin: '2 2 2 -1',
                                            id: prototype.id1 + '-txtFarePOR',
                                            width: 40
                                        }
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridComponentOLD2',
                                    border: true,
                                    flex: 1,
                                    height: 150,
                                    columnLines: true,
                            autoScroll: true,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">Corrl<br/>Tkt</span>', dataIndex: 'A1580CORRL', flex: 1},
                                            {text: '<span style="font-size: 10px;">Old<br/>Tkt</span>', dataIndex: 'A2837CIANW', width: 110},
                                            {text: '<span style="font-size: 10px;">New<br/>Tkt</span>', dataIndex: 'A2837CIAPA', width: 110},
                                            {text: '<span style="font-size: 10px;">Corrl<br/>Comp</span>', dataIndex: 'A2837CCORR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Component</span>', dataIndex: 'A1580FROM', flex: 1},
                                            {text: '<span style="font-size: 10px;">Carr</span>', dataIndex: 'A1580CARR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Class</span>', dataIndex: 'A1580CLASE', flex: 1},
                                            {text: '<span style="font-size: 10px;">FBasis</span>', dataIndex: 'A1580FBASI', flex: 1, renderer: 'onRendererColumnAttr'},
                                            {text: '<span style="font-size: 10px;">Cur<br/>ATPCO</span>', dataIndex: 'A1580MDAAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">ROE</span>', dataIndex: 'A1580ROEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">Pnlty<br/>Fee<br/>ATPCO</span>', dataIndex: 'A1580FEEAT', flex: 1},
                                            {text: '<span style="font-size: 10px;">NUC/<br/>Curr</span>', dataIndex: 'A1580MDA', flex: 1},
                                            {text: '<span style="font-size: 10px;">FARE</span>', dataIndex: 'A1580FARE', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Q</span>', dataIndex: 'A1580Q', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Pnlty<br/>Fee<br/>Airline</span>', dataIndex: 'A2837FEEMI', flex: 1, renderer: 'onColumnAmountRenderer'},
                                            {text: '<span style="font-size: 10px;">Apply<br/>RFND</span>', dataIndex: 'A1580APPLY', flex: 1},
                                            {text: '<span style="font-size: 10px;">BSR</span>', dataIndex: 'A2837BSR', flex: 1},
                                            {text: '<span style="font-size: 10px;">Orig<br/>Date</span>', dataIndex: 'A2837FEMIO', flex: 1},
                                            {text: '<span style="font-size: 10px;">Orig<br/>Trnx</span>', dataIndex: 'A2837TRNCO', flex: 1},
                                            {text: '<span style="font-size: 10px;">Error</span>', dataIndex: 'A1580ERROR', flex: 1}
                                        ]
                                    }, viewConfig: {
                                        //trackOver: false,
                                        stripeRows: true,
                                        enableTextSelection: true
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

