Ext.define('Ext.Praxis.view.salesaudit.SalesAuditReportForm.DataEntryDetail',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailSalesAuditReportForm',
    requires:[
        'Ext.Praxis.controller.salesaudit.SalesAuditReport.DataEntryDetailSalesAuditReportController'
    ],
    controller: 'DataEntryDetailSalesAuditReportController',
    title:"",
    header:false,
    height:970,
    width:1598,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    width: '100%',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            border: false,
                            layout: 'hbox',
                            width: '100%',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    border: false,
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Panel 1">
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: transparent;"',
                                            layout: 'hbox',
                                            border: false,
                                            width: 1020,
                                            defaults: {
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    border: true,
                                                    width: 405,
                                                    height: '100%',
                                                    defaults: {
                                                        border: true,
                                                        height: 20
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', height: 5},
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 400,
                                                            defaults: {
                                                                padding: '1 0 0 2'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Issued By',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-IssuedBy',
                                                                    width: 159
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'SRC',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtSRC',
                                                                    width: 78
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 400,
                                                            defaults: {
                                                                padding: '1 0 0 2'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Endorsements Restrictions',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtEndors',
                                                                    width: 213
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 400,
                                                            defaults: {
                                                                padding: '1 0 0 2'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Name of Passenger',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtPassenger',
                                                                    width: 260
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 400,
                                                            defaults: {
                                                                padding: '1 0 0 2'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Original Issue',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtORIN',
                                                                    width: 298
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    width: 207,
                                                    height: '100%',
                                                    defaults: {
                                                        border: false,
                                                        height: 22,
                                                        padding: '2'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Pax Tkt - Baggage',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-Baggage',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Tour Code',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtTourC',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Reservation Date',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-lblTicket21',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Conjunction Tickets',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-EsConjunto',
                                                                    hidden: true
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-EsConjunto',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    width: 200,
                                                    defaults: {
                                                        border: false,
                                                        height: 18,
                                                        padding: '0 0 0 2'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Origin/Destination',
                                                                    style: 'font-weight:bold;'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-OriginDestination',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Booking',
                                                                    style: 'font-weight:bold;'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Issued in Exchange',
                                                                    style: 'font-weight:bold;'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id+'-1-txtIssExc',
                                                                    style: 'font-weight:bold;background:transparent;',
                                                                    html: '<strong style="background:transparent;color:#057ECB;">139 5955484133</strong>',
                                                                    border: false,
                                                                    scale: 'small',
                                                                    width: 181,
                                                                    listeners: {
                                                                        click: 'searchInfoREPRO',
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    width: 200,
                                                    defaults: {
                                                        border: false,
                                                        height: 18,
                                                        padding: '0 0 0 2'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Date/Place of Issue',
                                                                    style: 'font-weight:bold;'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-DatePlace',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Agent',
                                                                    style: 'font-weight:bold;'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtAgentF',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'PNR',
                                                                    style: 'font-weight:bold;'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 198,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-txtPNR',
                                                                    width: '99%'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Panel 2">
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: transparent;"',
                                            layout: 'hbox',
                                            border: false,
                                            width: 1004,
                                            defaults: {
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridComponent3">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id+'-1-gridComponent3',
                                                    bodyStyle: 'background: transparent;"',
                                                    width: 1000,
                                                    height: 72,
                                                    border: true,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            { text: 'Cpn', dataIndex: '', width: 45 },
                                                            { text: 'X/O', dataIndex: 'STPO', width: 45 },
                                                            { text: 'From', dataIndex: 'ORAC', width: 120 },
                                                            { text: 'To', dataIndex: 'DSTC', width: 120 },
                                                            { text: 'CR', dataIndex: 'CARR', width: 55 },
                                                            { text: 'Flight', dataIndex: 'FTNR', width: 70 },
                                                            { text: 'Class', dataIndex: 'RBKD', width: 55 },
                                                            { text: 'Date', dataIndex: 'FTDA', width: 90 },
                                                            { text: 'Time', dataIndex: 'FTDT', width: 90 },
                                                            { text: 'F.Basis', dataIndex: 'FBTD', flex: 1/*width: 130*/ },
                                                            { text: 'NVB', dataIndex: 'NBDA', width: 55 },
                                                            { text: 'ACC.Date', dataIndex: 'NADA', width: 90 },
                                                            { text: 'Used', dataIndex: 'strUso', width: 55 }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 4},
                                        //<editor-fold defaultstate="collapsed" desc="Panel 3">
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: transparent;"',
                                            layout: 'hbox',
                                            border: false,
                                            width: 1004,
                                            defaults: {
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    border: true,
                                                    width: 402,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', height: 2},
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 398,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Fare',
                                                                    style: 'font-weight:bold;',
                                                                    padding: '2 0 0 0',
                                                                    width: 64
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id+'-1-txtFareC',
                                                                    fieldStyle: 'text-align:left;background-color:white;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    maskRe: /[0-9]/,
                                                                    width: 332,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 398,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Eqv. Fare',
                                                                    style: 'font-weight:bold;',
                                                                    padding: '2 0 0 0',
                                                                    width: 64
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id+'-1-txtEquivFa',
                                                                    fieldStyle: 'text-align:left;background-color:white;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    maskRe: /[0-9]/,
                                                                    width: 332,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 398,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Taxes',
                                                                    style: 'font-weight:bold;',
                                                                    padding: '18 0 0 0',
                                                                    width: 64
                                                                },
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.id+'-1-txtTaxes',
                                                                    value: '',
                                                                    fieldStyle: 'font-family:"Courier New";text-align:left;',
                                                                    width: 145
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 398,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Total',
                                                                    style: 'font-weight:bold;',
                                                                    padding: '2 0 0 0',
                                                                    width: 64
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id+'-1-txtTotal',
                                                                    fieldStyle: 'text-align:left;background-color:white;',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 3,
                                                                    maskRe: /[0-9]/,
                                                                    width: 332,
                                                                    readOnly: true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    border: true,
                                                    width: 600,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Calculation',
                                                            style: 'font-weight:bold;',
                                                            padding: '0 0 0 2'
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            id: prototype.id+'-1-txtFareCal',
                                                            value: '',
                                                            width: 590,
                                                            grow: true,
                                                            growMin: 30,
                                                            growMax: 30
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            value: '',
                                                            width: 590,
                                                            grow: true,
                                                            growMin: 25,
                                                            growMax: 25
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {xtype: 'tbspacer', width: 2},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Form of Payment',
                                                                    style: 'font-weight:bold;',
                                                                    padding: '4 0 0 0'
                                                                },
                                                                {xtype: 'tbspacer', width: 6},
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.id+'-1-txtFormPay',
                                                                    value: '',
                                                                    width: 478,
                                                                    grow: true,
                                                                    growMin: 24,
                                                                    growMax: 24
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            border: false,
                                                            items: [
                                                                {xtype: 'tbspacer', width: 52},
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.id+'-1-NUMBERTKT',
                                                                    text: '139 - 1111111111',
                                                                    style: 'font-weight:bold;color:#C46600;',
                                                                    width: 200,
                                                                    padding: '9 0 0 0'
                                                                },
                                                                {xtype: 'tbspacer', width: 1},
                                                                {
                                                                    xtype: 'button',
                                                                    id:prototype.id+'-1-btnPDI',
                                                                    html: '<strong style="font-size:13px;">PDI</strong>',
                                                                    icon: 'resources/img/botones/24x24/Airline_Ticket-24.png',
                                                                    scale: 'medium',
                                                                    width: 75,
                                                                    listeners:{
                                                                        click: 'btnclick_PDI',
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 7},
                                                                {
                                                                    xtype: 'button',
                                                                    id:prototype.id+'-1-btnReview',
                                                                    html: '<strong style="font-size:11px;">Review ADM</strong>',
                                                                    icon: 'resources/img/botones/24x24/check-24.png',
                                                                    scale: 'medium',
                                                                    width: 134,
                                                                    listeners:{
                                                                        click: 'btn_clickReviewADM',
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 7},
                                                                {
                                                                    xtype: 'button',
                                                                    id:prototype.id+'-1-btnCloseS',
                                                                    html: '<strong style="font-size:12px;">Close</strong>',
                                                                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                                                                    scale: 'medium',
                                                                    listeners:{
                                                                        click: 'btnCancel_clickHandler'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 1},
                                        //<editor-fold defaultstate="collapsed" desc="Panel 4">
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: transparent;"',
                                            layout: 'hbox',
                                            border: false,
                                            width: 1004,
                                            defaults: {
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    width: 210,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Assigned to',
                                                            style: 'font-weight:bold;',
                                                            padding: '2 0 0 2',
                                                            width: 92
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtUser',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 116,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    width: 202,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Date',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            padding: '2 0 0 0',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtUDate',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 70,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    width: 196,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Audited by',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            padding: '2 0 0 0',
                                                            width: 85
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtUserAudit',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 89,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: true,
                                                    width: 133,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Date',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            padding: '2 0 0 0',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtFRevis',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 75,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 208},
                                                {
                                                    xtype: 'image',
                                                    id: prototype.id+'-1-imgTicket',
                                                    src: 'resources/img/icon/48x48/ticket-previous.png',
                                                    border: true,
                                                    height: 27,
                                                    padding: '0 0 4 0',
                                                    mode : 'image',
                                                    hidden: true,
                                                    listeners: {
                                                        afterrender: function(c) {
                                                            Ext.create('Ext.tip.ToolTip', {
                                                                target: c.getEl(),
                                                                html: 'Previous Ticket'
                                                            });
                                                        },
                                                        el: {
                                                            click: 'btnImgPreviosTICKET_clickHandler',
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'panel',
                                    width: 500,
                                    height: 350,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'left'
                                            },
                                            border: true,
                                            width: 489,
                                            height: 342,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'left'
                                                    },
                                                    border: true,
                                                    width: 479,
                                                    height: 35,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: transparent;"',
                                                            layout: 'hbox',
                                                            width: 470,
                                                            defaults: {
                                                                margin: '0 7 4 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    html: '<strong style="font-size:13px;">Delivery</strong>',
                                                                    icon: 'resources/img/botones/24x24/Small_parcel-24.png',
                                                                    scale: 'medium',
//                                                                    width: 75,
                                                                    listeners:{
                                                                        click: 'btnDeliveryTKT_clickHandler',
                                                                    }
                                                                },
//                                                                {xtype: 'tbspacer', width: 7},
                                                                {
                                                                    xtype: 'button',
                                                                    html: '<strong style="font-size:11px;">TKT Reasons</strong>',
                                                                    icon: 'resources/img/botones/24x24/note-24.png',
                                                                    scale: 'medium',
                                                                    width: 136,
                                                                    listeners:{
                                                                        click: 'btnReasons_clickHandler',
                                                                    }
                                                                },
//                                                                {xtype: 'tbspacer', width: 7},
                                                                {
                                                                    xtype: 'button',
                                                                    html: '<strong style="font-size:12px;">FOP</strong>',
                                                                    icon: 'resources/img/botones/24x24/Finance_payment_method-24.png',
                                                                    scale: 'medium',
                                                                    listeners:{
                                                                        click: 'btnFOP_clickHandler',
                                                                    }
                                                                },
//                                                                {xtype: 'tbspacer', width: 7},
                                                                {
                                                                    xtype: 'button',
                                                                    html: '<strong style="font-size:12px;">Historial</strong>',
                                                                    icon: 'resources/img/botones/24x24/historical_ticket.png',
                                                                    scale: 'medium',
                                                                    listeners:{
                                                                        click: 'btn_clickHistorialTKT',
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'CALCULATION BOX',
                                                    style: 'font-weight:bold;',
                                                    width: 360,
                                                    height: 16
                                                },
                                                // <editor-fold defaultstate="collapsed" desc="gridComponent">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id+'-1-gridComponent',
                                                    border: true,
                                                    width: 402,
                                                    height: 240,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: '', dataIndex: 'Concepto', width: 95, hidden: false,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;font-weight:bold;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: '', dataIndex: 'Concepto', width: 30,
                                                                listeners: {
                                                                    click: 'INFRESUMEN',
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var src = data.Concepto==='Fare'? '' :data.Concepto==='Q' ? '' : data.Concepto==='Net' ? '' : 'resources/img/botones/16x16/1326498593_018.png';
                                                                    return '<a href="#salesaudit-salesAudit-accepted-form"><img src="'+src+'"></a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Our<br>Calculation', dataIndex: 'Airline', width: 95, hidden: false, align: 'right',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'Agent<br>Calculation', dataIndex: 'Agent', width: 95, hidden: false, align: 'right',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'Difference', dataIndex: 'Difference', width: 85, hidden: false,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtCcust',
                                    width: 140,
                                    hidden: true
                                },
                                {
                                    xtype: 'label',
                                    padding: '4 0 4 2',
                                    text: 'Ticket:',
                                    width: 51
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtFrmaSerie',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 116,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Seq.:',
                                    width: 38
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtSeq',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 28,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Coupons:',
                                    width: 66
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtCupon',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 45,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'Group:',
                                    width: 53
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtGrupo',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 87,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Trnx.:',
                                    width: 43
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtTRNCU',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 38,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Agency:',
                                    width: 56
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtAgent',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 57,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Sale Date:',
                                    width: 72
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtFecVta',
                                    fieldStyle: 'text-align:center;',
                                    width: 72,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Sale City:',
                                    width: 65
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtCiuVta',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 36,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtPaiVta',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 29,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'Issue City:',
                                    width: 87
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtCiuUso',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 38,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtPaiUso',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 28,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'Pax Type:',
                                    width: 72
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtTPax',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 31,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-1-txtWaiver2',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'Waiver:',
                                    width: 67
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtWaiver',
                                    fieldStyle: 'text-align:right;color:#113DDF;text-decoration:underline;',
                                    enableKeyEvents: true,
                                    value: '',
                                    maskRe: /[0-9]/,
                                    width: 50,
                                    readOnly: true,
                                    handleMouseEvents: true,
                                    listeners: {
                                        'render': function(cmp) {
                                            cmp.getEl().on('click',
                                                'lnkDownload_clickHandler'
                                            );
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-1-lblReverdate',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'Rever. date:',
                                    width: 87
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtReverdate',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 70,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtTicket',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtFuente',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtAgent2',
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '4 0 4 2',
                                    text: 'FARE:',
                                    width: 51
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtFare',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 80,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtCur',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 28,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'NUC:',
                                    width: 37
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtNUC',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 53,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'ROE:',
                                    width: 42
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtROE',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 82,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Plus:',
                                    width: 37
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtPlus',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 53,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'S.Over:',
                                    width: 56
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtSOver',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 61,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtSOver2',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 29,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Exch. Rate to Rev:',
                                    width: 122
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtRate',
                                    fieldStyle: 'text-align:center;',
                                    width: 105,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'IT:',
                                    width: 24
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtIT',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 117,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Doc. Type:',
                                    width: 72
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtTIDoc',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 43,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Source:',
                                    width: 64
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtSOURCE',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 33,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'EMD Real:',
                                    width: 73
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtEMDReal',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 133,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Channel:',
                                    width: 73
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtChannel',
                                    fieldStyle: 'text-align:center;',
//                                    enforceMaxLength: true,
//                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 33,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '4 0 4 2',
                                    text: 'Equiv.:',
                                    width: 51
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtEquiv',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 81,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtEquivCur',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 28,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'FCMI:',
                                    width: 42
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtFCMI',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 26,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Fare Type:',
                                    width: 72
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtFareType',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 27,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-1-lblRType',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Refund Type:',
                                    width: 90
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtRType',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 26,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-1-lblEType',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Exch Type:',
                                    width: 77
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtEType',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 26,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'CommAM:',
                                    width: 70
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtComment',
                                    fieldStyle: 'text-align:center;',
                                    width: 220,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Comm:',
                                    width: 49
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtCommentMIA',
                                    fieldStyle: 'text-align:center;',
                                    width: 220,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-1-lblInvol',
                                    style: 'text-align:center;',
                                    padding: '4 0',
                                    text: 'Involuntary:',
                                    width: 82
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtInvol',
                                    fieldStyle: 'text-align:center;',
                                    width: 25,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'BSR:',
                                    width: 40
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtBSR',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 50,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'ERROR',
                                    width: 56
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtERROR',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 174,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '4 0 4 2',
                                    text: 'ADC:',
                                    width: 51
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtADC',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 81,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtADC2',
                                    fieldStyle: 'text-align:center;',
                                    maskRe: /[0-9]/,
                                    width: 28,
                                    readOnly: true
                                },
                                {
                                    xtype: 'label',
                                    style: 'text-align:center;font-weight:bold;',
                                    padding: '4 0',
                                    text: 'Original Issue',
                                    width: 107
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent;"',
                                    layout: 'hbox',
                                    flex: 1,
//                                    width: 1561,
                                    items: [
                                        {
                                            xtype: 'label',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Ticket:',
                                            width: 47
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtTktOrig',
                                            fieldStyle: 'text-align:center;',
//                                            enforceMaxLength: true,
//                                            maxLength: 1,
                                            maskRe: /[0-9]/,
                                            width: 76,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Agency:',
                                            width: 62
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtAgentOrig',
                                            fieldStyle: 'text-align:center;',
                                            maskRe: /[0-9]/,
                                            width: 52,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Issue Date:',
                                            width: 79
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtFecUsoOrig',
                                            fieldStyle: 'text-align:center;',
                                            width: 80,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Place:',
                                            width: 43
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtPlace',
                                            fieldStyle: 'text-align:center;',
                                            maskRe: /[0-9]/,
                                            width: 43,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblQty',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Qty:',
                                            width: 32
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtQty',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            maskRe: /[0-9]/,
                                            width: 49,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblReservDate',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Reserv.Date:',
                                            hidden: true,
                                            width: 90
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtReservDate',
                                            fieldStyle: 'text-align:center;',
                                            width: 75,
                                            hidden: true,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblEMDRel',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'EMD Rel:',
                                            hidden: true,
                                            width: 79
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtEMDRel',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                            hidden: true,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblOrigTrnx',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Orig. Trnx:',
                                            width: 79
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtOrigTrnx',
                                            fieldStyle: 'text-align:center;',
                                            width: 40,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblOrigDate',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Orig. Date:',
                                            width: 79
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtOrigDate',
                                            fieldStyle: 'text-align:center;',
                                            width: 75,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblOrigAgency',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Orig. Agency:',
                                            width: 90
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtOrigAgency',
                                            fieldStyle: 'text-align:center;',
                                            width: 70,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-lblOrigSource',
                                            style: 'text-align:center;',
                                            padding: '4 0',
                                            text: 'Orig. Source:',
                                            width: 90
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtOrigSource',
                                            fieldStyle: 'text-align:center;',
                                            width: 59,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtRUTAF',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtNAMEF',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-1-txtA1672FPROC',
                                            hidden: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            layout: 'hbox',
                            border: false,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent;"',
                                    layout: 'vbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'ITINERARY AGENT',
                                            style: 'font-weight:bold;',
                                            width: 169
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="gridComponent2">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id+'-1-gridComponent2',
                                            width: 676,
                                            height: 95,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    { text: 'Ticket', dataIndex: 'VP_FRMSRIE', flex: 1 },
                                                    { text: 'Cpn', dataIndex: 'A1672CUPON', width: 40 },
                                                    { text: 'Cnx', dataIndex: 'A1672CONEX', width: 40 },
                                                    { text: 'From', dataIndex: 'ORIGEN', width: 50 },
                                                    { text: 'To', dataIndex: 'DESTINO', width: 45 },
                                                    { text: 'Carrier', dataIndex: 'A1672CARR', width: 53 },
                                                    { text: 'Flight<br>Num', dataIndex: 'A1672NVLO', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="'+data.A1672NVLO+'"';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Flight Date', dataIndex: 'A1672FVLO', width: 73 },
                                                    { text: 'Cabin', dataIndex: 'A1672CABIN', width: 45 },
                                                    { text: 'Class', dataIndex: 'A1672CLASE', width: 45 },
                                                    { text: 'F.Basis', dataIndex: 'A1672FBASI', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="'+data.A1672FBASI+'"';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Usage', dataIndex: 'A1672CPNS', width: 75, id: prototype.id+'-1-txtUsage' }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-1-Component0',
                                    bodyStyle: 'background: transparent;"',
                                    layout: 'vbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-1-Component1',
                                            text: 'FARE COMPONENT AGENT',
                                            style: 'font-weight:bold;',
                                            width: 234
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-1-Component2',
                                            bodyStyle: 'background: transparent;"',
                                            layout: 'hbox',
                                            border: false,
                                            width: 710,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-1-lblCURBalance',
                                                    style: 'text-align:center;',
                                                    padding: '4 0',
                                                    text: 'CUR',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtCurBalance',
                                                    fieldStyle: 'text-align:center;',
//                                                    enforceMaxLength: true,
//                                                    maxLength: 1,
                                                    width: 28,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-1-lblFareBalance',
                                                    style: 'text-align:center;',
                                                    padding: '4 0',
                                                    text: 'FARE NEW',
                                                    width: 73
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtFareBalance',
                                                    fieldStyle: 'text-align:center;',
                                                    maskRe: /[0-9]/,
                                                    width: 53,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-1-lblFareOldBalance',
                                                    style: 'text-align:center;',
                                                    padding: '4 0',
                                                    text: 'FARE OLD',
                                                    width: 68
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtFareOldBalance',
                                                    fieldStyle: 'text-align:center;',
                                                    maskRe: /[0-9]/,
                                                    width: 53,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id+'-1-lblADCBalance',
                                                    style: 'text-align:center;',
                                                    padding: '4 0',
                                                    text: 'ADC',
                                                    width: 35
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtADCBalance',
                                                    fieldStyle: 'text-align:center;',
                                                    maskRe: /[0-9]/,
                                                    width: 53,
                                                    readOnly: true
                                                }
                                            ]
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="gridComp">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id+'-1-gridComp',
                                            width: 703,
                                            height: 88,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    { text: 'Corrl.', dataIndex: 'A1580CORRL', width: 47 },
                                                    { text: 'Component', dataIndex: 'A1580FROM', flex: 1,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="'+data.A1580FROM+'"';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Carrier', dataIndex: 'A1580CARR', width: 55 },
                                                    { text: 'Fare Basis', dataIndex: 'A1580FBASI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="'+data.A1580FBASI+'"';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'NUC/Cur', dataIndex: 'A1580MDA', width: 68 },
                                                    { text: 'Fare', dataIndex: 'A1580FARE', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Q', dataIndex: 'A1580Q', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Cur<br>Agent', dataIndex: 'A1580MORIG', width: 50 },
                                                    { text: 'Fare Agent', dataIndex: 'A1580FAORI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Q Agent', dataIndex: 'A1580QORIG', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent;"',
                            layout: 'hbox',
                            border: true,
                            width: '100%',
                            height: 205,
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: prototype.id+'-1-tnvMain',
                                    width: '100%',
                                    height: 203,
                                    activeTab: 0,
                                    defaults: {
                                        height: 196,
                                        autoScroll: true
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: '<label style="color:#0B333C;">FARE COMPONENT AIRLINE</label>',
                                            id: prototype.id+'-1-boxComponent',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-1-IRLINECOMPONE',
                                                    width: 1400,
                                                    height: 24,
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 782},
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblCURAIRLE',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'CUR',
                                                            width: 40
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtCURAIRLE',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblFareAIRLE',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'FARE NEW',
                                                            width: 73
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtFareAIRLE',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 53,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblFareOldAIRLE',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'FARE OLD',
                                                            width: 68
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtFareOldAIRLE',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 53,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblADCAIRLE',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'ADC',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtADCAIRLE',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 53,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    width: 1500,
                                                    height: 24,
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'FARE COMPONENT AIRLINE',
                                                            style: 'font-weight:bold;',
                                                            width: 234
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'Local Curr.',
                                                            width: 74
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtCURAIR',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'FARE:',
                                                            width: 43
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtFareAIR',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 80,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtCurAIR',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'Equiv.:',
                                                            width: 53
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtEquivAIR',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 81,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtEquivCurAIR',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-txtYQPAYNAME',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'YQ PAY.:',
                                                            width: 59
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtYQPAY1',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 81,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtYQPAY2',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-txtYRPAYNAME',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'YR PAY.:',
                                                            width: 59
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtYRPAY1',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 81,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtYRPAY2',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-txtChargeName',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'S/Charge:',
                                                            width: 69
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtCharge1',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 81,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtCharge2',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-txtPenaltyName',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'Penalty PAY:',
                                                            width: 88
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtPenalty1',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 81,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtPenalty2',
                                                            fieldStyle: 'text-align:center;',
//                                                            enforceMaxLength: true,
//                                                            maxLength: 1,
                                                            maskRe: /[0-9]/,
                                                            width: 28,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                // <editor-fold defaultstate="collapsed" desc="gridComponentOld">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id+'-1-gridComponentOld',
                                                    width: 1400,
                                                    height: 150,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            { text: 'Corrl', dataIndex: 'A1580CORRL', width: 43 },
                                                            { text: 'Component', dataIndex: 'A1580FROM', flex: 1 },
                                                            { text: 'Carr', dataIndex: 'A1580CARR', width: 45 },
                                                            { text: 'Class', dataIndex: 'A1580CLASE', width: 45 },
                                                            { text: 'FBasis', dataIndex: 'A1580FBASI', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:left;";
                                                                    metaData.tdAttr = 'data-qtip="'+data.A1580FBASI+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Cur<br>ATPCO', dataIndex: 'A1580MDAAT', width: 55 },
                                                            { text: 'ROE', dataIndex: 'A1580ROEAT', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: '&nbsp;',
                                                                id: prototype.id+'-1-lstComponent_SALES',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    { text: 'FARE<br>ATPCO', dataIndex: 'A1580FARAT', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Q.<br>ATPCO', dataIndex: 'A1580QATPC', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'SOVER<br>ATPCO', dataIndex: 'A1580SOATP', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'YQ<br>ATPCO', dataIndex: 'A1580YQATP', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'YR.<br>ATPCO', dataIndex: 'A1580YRATP', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Cur<br>AIRLINE', dataIndex: 'A1580MDA', width: 65 },
                                                                    { text: 'FARE<br>AIRLINE', dataIndex: 'A1580FMIOR', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Q.<br>AIRLINE', dataIndex: 'A1580QMIOR', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'SOVER<br>AIRLINE', dataIndex: 'A1580SOMIO', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'YQ<br>AIRLINE', dataIndex: 'A1580YQMIO', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'YR<br>AIRLINE', dataIndex: 'A1580YRMIO', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'FARE<br>Diff.', dataIndex: 'A1580FADIF', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Q.<br>Diff.', dataIndex: 'A1580QDIF', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '&nbsp;',
                                                                id: prototype.id+'-1-lstComponent_RFND',
                                                                hidden: true,
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    { text: 'PnltyFee Atpco', dataIndex: 'A1580FEEAT', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Nuc / Cur', dataIndex: 'A1580MORIG', width: 55 },
                                                                    { text: 'FARE', dataIndex: 'A1580FARE', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Q', dataIndex: 'A1580QORIG', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'StOver', dataIndex: 'A1580SOVER', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Cur<br>Airline', dataIndex: 'A1580MDA', width: 55 },
                                                                    { text: 'FARE<br>AIRLINE', dataIndex: 'A1580FAORI', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Q<br>Airline', dataIndex: 'A1580QMIOR', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'StOver<br>Airline', dataIndex: 'A1580SOMIO', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'PnltyFee<br>Airline', dataIndex: 'A1580PENAL', width: 65,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    { text: 'Apply<br>RFND', dataIndex: 'A1580APPLY', width: 45 },
                                                                    { text: 'Incl<br>Cpn', dataIndex: 'A1580INCCP', width: 45 },
                                                                    { text: 'Excl<br>PnltyFee', dataIndex: 'A1580EXCLU', width: 50 }
                                                                ]
                                                            },
                                                            { text: 'Status', dataIndex: 'A1580STAT', width: 50 },
                                                            { text: 'ADM', dataIndex: 'A1580FLADM', width: 40 },
                                                            { text: 'Error', dataIndex: 'A1580ERROR', width: 50 }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: '<label style="color:#0B333C;">FARE COMPONENT USED</label>',
                                            id: prototype.id+'-1-boxComponentUsed',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 1400,
                                                    height: 24,
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 782},
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblCURAIRLEUSED',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'CUR',
                                                            width: 40
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtCURAIRLEUSED',
                                                            fieldStyle: 'text-align:center;',
                                                            enforceMaxLength: true,
                                                            maxLength: 1,
                                                            width: 28,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblFareAIRLEUSED',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'FARE NEW',
                                                            width: 73
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtFareAIRLEUSED',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 53,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblFareOldAIRLEUSED',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'FARE OLD',
                                                            width: 68
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtFareOldAIRLEUSED',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 53,
                                                            readOnly: true
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-1-lblADCAIRLEUSED',
                                                            style: 'text-align:center;',
                                                            padding: '4 0',
                                                            text: 'ADC',
                                                            width: 35
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id+'-1-txtADCAIRLEUSED',
                                                            fieldStyle: 'text-align:center;',
                                                            maskRe: /[0-9]/,
                                                            width: 53,
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                // <editor-fold defaultstate="collapsed" desc="gridFCRfndUsed">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id+'-1-gridFCRfndUsed',
                                                    width: 1400,
                                                    height: 120,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            { text: 'Corrl.', dataIndex: 'A1580CORRL', width: 45 },
                                                            { text: 'Component', dataIndex: 'A1580FROM', flex: 1,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:left;";
                                                                    metaData.tdAttr = 'data-qtip="'+data.A1580FROM+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Carrier', dataIndex: 'A1580CARR', width: 52 },
                                                            { text: 'Class', dataIndex: 'A1580CLASE', width: 45 },
                                                            { text: 'Fare<br>Basis', dataIndex: 'A1580FBASI', width: 67,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:left;";
                                                                    metaData.tdAttr = 'data-qtip="'+data.A1580FBASI+'"';
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Cur<br>ATPCO', dataIndex: 'A1580MDAAT', width: 54 },
                                                            { text: 'ROE', dataIndex: 'A1580ROEAT', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'Pnlty<br>Fee<br>ATPCO', dataIndex: 'A1580FEEAT', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'NUC/Curr', dataIndex: 'A1580NUC', width: 67,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'FARE', dataIndex: 'A1580FARE', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'Q', dataIndex: 'A1580Q', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'SOver', dataIndex: 'A1580SOVER', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'Cur<br>Airline', dataIndex: 'A1580MMORI', width: 50 },
                                                            { text: 'Fare<br>Airline', dataIndex: 'A1580FMIOR', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'Q<br>Airline', dataIndex: 'A1580QMIOR', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'SOver<br>Airline', dataIndex: 'A1580SOMIO', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'Pnlty<br>Fee<br>Airline', dataIndex: 'A1580PENAL', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            { text: 'Apply<br>RFND', dataIndex: 'A1580APPLY', width: 65,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Incl<br>CPN', dataIndex: 'A1580INCCP', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Excl<br>Pnlty<br>Fee', dataIndex: 'A1580EXCLU', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }
                                                            },
                                                            { text: 'Status', dataIndex: 'A1580STAT', width: 55 },
                                                            { text: 'ADM', dataIndex: 'A1580FLADM', width: 40 },
                                                            { text: 'Error', dataIndex: 'A1580ERROR', width: 50 }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 4},
                        {
                            xtype: 'panel',
                            id: prototype.id+'-1-OLD_FARE_COMPONENT',
                            width: '100%',
                            height: 135,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1490,
                                    height: 120,
                                    layout: 'vbox',
                                    autoScroll: true,
                                    border: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 1300,
                                            height: 24,
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'OLD FARE COMPONENT',
                                                    style: 'font-weight:bold;',
                                                    width: 163
                                                },
                                                {xtype: 'tbspacer', width: 500},
                                                {
                                                    xtype: 'label',
                                                    padding: '4 0',
                                                    text: 'PENALTY PAY',
                                                    width: 97
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtFarePENAL',
                                                    fieldStyle: 'text-align:center;',
                                                    maskRe: /[0-9]/,
                                                    width: 53,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtCURAPENAL',
                                                    fieldStyle: 'text-align:center;',
//                                                    enforceMaxLength: true,
//                                                    maxLength: 1,
                                                    width: 28,
                                                    readOnly: true
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'label',
                                                    padding: '4 0',
                                                    text: 'IVA',
                                                    width: 29
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtFareIVA',
                                                    fieldStyle: 'text-align:center;',
                                                    maskRe: /[0-9]/,
                                                    width: 53,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id+'-1-txtFarePOR',
                                                    fieldStyle: 'text-align:center;',
                                                    maskRe: /[0-9]/,
                                                    width: 53,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '4 0',
                                                    text: '%',
                                                    width: 29
                                                }
                                            ]
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="gridComponentOLD">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id+'-1-gridComponentOLD',
                                            width: 1400,
                                            height: 150,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    { text: 'Corrl<br>Tkt', dataIndex: 'A1580CORRL', width: 47 },
                                                    { text: 'Old Tkt', dataIndex: 'A2837CIANW', width: 100 },
                                                    { text: 'New Tkt', dataIndex: 'A2837CIAPA', width: 100 },
                                                    { text: 'Corrl<br>Comp', dataIndex: 'A2837CCORR', width: 50 },
                                                    { text: 'Component', dataIndex: 'A1580FROM', width: 80 },
                                                    { text: 'Carr', dataIndex: 'A1580CARR', width: 50 },
                                                    { text: 'Class', dataIndex: 'A1580CLASE', width: 45 },
                                                    { text: 'FBasis', dataIndex: 'A1580FBASI', flex: 1,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="'+data.A1580FBASI+'"';
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Cur<br>ATPCO', dataIndex: 'A1580MDAAT', width: 60 },
                                                    { text: 'ROE', dataIndex: 'A1580ROEAT', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Pnlty Fee<br>ATPCO', dataIndex: 'A1580FEEAT', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'NUC/Curr', dataIndex: 'A1580MDA', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'FARE', dataIndex: 'A1580FARE', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Q', dataIndex: 'A1580Q', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Pnlty Fee<br>Airline', dataIndex: 'A2837FEEMI', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Apply<br>RFND', dataIndex: 'A1580APPLY', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'BSR', dataIndex: 'A2837BSR', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    { text: 'Orig Date', dataIndex: 'A2837FEMIO', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    { text: 'Orig<br>Trnx', dataIndex: 'A2837TRNCO', width: 60 },
                                                    { text: 'Error', dataIndex: 'A1580ERROR', width: 50 }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '2 0 0 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    id:prototype.id+'-1-btnClose',
                    html: '<strong style="font-size:13px;">Close</strong>',
                    icon: 'resources/img/botones/1337983423_Cancel__Red.png',
                    scale: 'medium',
                    listeners:{
                        click: 'btnCancel_clickHandler'
                    }
                }
            ]
        }
    ]
});