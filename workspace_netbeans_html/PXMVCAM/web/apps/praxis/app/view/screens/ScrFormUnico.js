var widthWindow = 1150;
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * prototype.id1 = 'ScrFormUnico';
 */
prototype.id2 = 'DocumRelFormUnico';
prototype.id3 = 'FormOfProvisions';
prototype.id4 = 'FormUnicoSeguimieto';
prototype.id5 = 'FormUnicoSeguimietoSubiArchivo';
prototype.idformateoCta = 'FormformateoCta';
Ext.define('Ext.Praxis.view.screens.ScrFormUnico', {
    extend: 'Ext.window.Window',
    alias: 'widget.ScrFormUnico',
    requires: [
        'Ext.Praxis.controller.screens.ScrFormUnicoController',
        'Ext.Praxis.view.salesaudit.ADMReportForm.DocumRelFormUnico',
        'Ext.Praxis.view.salesaudit.ADMReportForm.FormOfProvisions',
        'Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimieto',
        'Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimietoSubiArchivo',
        'Ext.Praxis.view.salesaudit.ADMReportForm.FormformateoCta'
        
    ],
    controller: 'ScrFormUnicoController',
    title: 'Single Format',
    id: prototype.id1 + '-win',
    header: true,
    height: 840,
    width: widthWindow,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [{
            xtype: 'panel',
            layout: 'vbox',
            border: false,
            items: [{
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'fieldset',
                            width: 900,
                            title: 'AGENCY DEBIT MEMO / CREDIT NOTE',
                            collapsible: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 120,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'label',
                                                    text: 'History:'
                                                }]
                                        }, {
                                            width: 105,
                                            border: false
                                        }, {
                                            width: 215,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-MemoNumber',
                                                    fieldLabel: 'Memo Number',
                                                    maskRe: /[0-9]/,
                                                    width: 210,
                                                    readOnly: true,
                                                    labelWidth: 90
                                                }
                                            ]
                                        }, {
                                            width: 55,
                                            border: false
                                        }, {
                                            width: 165,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-IssueDate',
                                                    fieldLabel: 'Issue Date',
                                                    maskRe: /[0-9]/,
                                                    width: 180,
                                                    readOnly: true,
                                                    labelWidth: 70
                                                }
                                            ]
                                        },{
                                            width: 165,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-NNotice',
                                                    fieldLabel: 'N° Notice',
                                                    maskRe: /[0-9]/,
                                                    width: 180,
                                                    readOnly: true,
                                                    labelWidth: 60
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 130,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Accepted',
                                                    fieldLabel: 'Accepted',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    width: 125,
                                                    readOnly: true,
                                                    labelWidth: 50
                                                }
                                            ]
                                        }, {
                                            width: 95,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Usser',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    readOnly: true,
                                                    width: 90
                                                }
                                            ]
                                        }, {
                                            width: 25,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'button',
                                                    icon: 'resources/img/botones/16x16/swap.png',
                                                    tooltip: 'Check Detail',
                                                    listeners: {
                                                         click: 'onSeguimietoClick'
                                                    }
                                                }
                                            ]
                                        }, {
                                            width: 190,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Transaction',
                                                    fieldLabel: 'Transaction',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    width: 185,
                                                    readOnly: true,
                                                    labelWidth: 65
                                                }
                                            ]
                                        }, {
                                            width: 220,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-SourceChannel',
                                                    fieldLabel: 'Source and Channel',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    width: 215,
                                                    readOnly: true,
                                                    labelWidth: 113
                                                }
                                            ]
                                        }, {
                                            width: 190,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Ticket',
                                                    fieldLabel: 'Ticket Number',
                                                    maskRe: /[0-9]/,
                                                    width: 185,
                                                    readOnly: true,
                                                    labelWidth: 93
                                                }
                                            ]
                                        }, {
                                            width: 25,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'button',
                                                    icon: 'resources/img/botones/16x16/swap.png',
                                                    tooltip: 'Show Related Documents',
                                                    listeners: {
                                                            click: 'onRelatedDocumentsClick'
                                                    }
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 130,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Issued',
                                                    fieldLabel: 'Issued',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    width: 125,
                                                    readOnly: true,
                                                    labelWidth: 50
                                                }
                                            ]
                                        }, {
                                            width: 95,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-UsserIss',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    readOnly: true,
                                                    width: 90
                                                }
                                            ]
                                        }, {
                                            width: 25,
                                            border: false
                                        }, {
                                            width: 190,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Coupon',
                                                    fieldLabel: 'Coupon',
                                                    maskRe: /[0-9]/,
                                                    width: 125,
                                                    readOnly: true,
                                                    labelWidth: 65
                                                }
                                            ]
                                        }, {
                                            width: 220,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TicketDate',
                                                    fieldLabel: 'Ticket Date',
                                                    maskRe: /[0-9]/,
                                                    width: 215,
                                                    readOnly: true,
                                                    labelWidth: 113
                                                }
                                            ]
                                        }, {
                                            width: 190,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TransactionTKT',
                                                    fieldLabel: 'Transaction TKT',
                                                    maskRe: /[0-9]/,
                                                    width: 185,
                                                    readOnly: true,
                                                    labelWidth: 93
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 130,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    id: prototype.id1 + '-Sent',
                                                    fieldLabel: 'Sent',
                                                    readOnly: true,
                                                    width: 125,
                                                    labelWidth: 50
                                                }
                                            ]
                                        }, {
                                            width: 95,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-UserSent',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    readOnly: true,
                                                    width: 90
                                                }
                                            ]
                                        }, {
                                            width: 25,
                                            border: false
                                        }, {
                                            width: 190,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-IATA',
                                                    fieldLabel: 'IATA Nº ',
                                                    maskRe: /[0-9]/,
                                                    width: 185,
                                                    readOnly: true,
                                                    labelWidth: 65
                                                }
                                            ]
                                        }, {
                                            width: 415,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-IATAName',
                                                    fieldLabel: 'IATA Name',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    width: 410,
                                                    readOnly: true,
                                                    labelWidth: 113
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    id: prototype.id1 + '-CTA',
                                                    fieldLabel: 'CTA',
                                                    readOnly: true,
                                                    width: 248,
                                                    labelWidth: 50
                                                }
                                            ]
                                        },{
                                            width: 5,
                                            border: false
                                        }, {
                                            width: 600,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-Address',
                                                    fieldLabel: 'Address',
                                                    width: 595,
                                                    readOnly: true,
                                                    labelWidth: 60
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 100,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'button',
                                                    text    : 'provisions',
                                                    icon: 'resources/img/botones/16x16/swap.png',
                                                    tooltip: 'Check Detail provisions',
                                                    listeners: {
                                                            click: 'onProvisionsClick'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            width: 100,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'button',
                                                    text    : 'Tasa Iva%',
                                                    icon: 'resources/img/botones/16x16/swap.png',
                                                    tooltip: 'Check Detail Tasa Iva',
                                                    listeners: {
                                                            click: 'onTasaIvaClick'
                                                    }
                                                }
                                            ]
                                        },{
                                            width: 50,
                                            border: false
                                        }, {
                                            width: 605,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-PassName',
                                                    fieldLabel: 'Pass Name',
                                                    readOnly: true,
                                                    width: 600,
                                                    labelWidth: 65
                                                }
                                            ]
                                        }]
                                }]
                        }, {
                            xtype: 'panel',
                            id: prototype.id1 + '-image',
                            layout: 'vbox',// width: 605,
                            collapsible: true,
                            border: false,
                            defaults: {
                                // bodyStyle: 'background: transparent'
                            },
                            items: [{
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                       // bodyStyle: 'background: transparent'
                                    },
                                    items: [{border: false,width: 280,height: 70,
                                            html: '<img src=resources/img/botones/16x16/Aeromexico.jpg />'
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{border: false, height: 140,width: 48, 
                                            html: '<a href="#" onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().PDF_clickHandler(1);"> <img  src="resources/img/botones/24x24/pdf_48.png" /> </a>'
                                        }, {border: false, width: 48,height: 140, id: prototype.id1 + '-PDFASR', hidden: true,
                                            html: '<a href="#" onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().PDF_clickHandler(3);">  <img src="resources/img/botones/24x24/pdf_ASR_BSP.png" /> </a>'
                                        }, {border: false, width: 48,height: 140, id: prototype.id1 + '-PDFRecallCommi', hidden: true,
                                            html: '<a href="#" onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().PDF_clickHandler(5);">  <img src="resources/img/botones/24x24/pdf_ASR_BSP.png" /> </a>'
                                        }, {border: false, width: 48,height: 140, id: prototype.id1 + '-PDFBSP', hidden: true,
                                            html: '<a href="#" onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().PDF_clickHandler(4);">  <img src="resources/img/botones/24x24/pdf_ASR_BSP.png" /> </a>'
                                        }, {border: false, width: 48,height: 140, id: prototype.id1 + '-PDFARC', hidden: true,
                                            html: '<a href="#" onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().PDF_clickHandler(2);">  <img src="resources/img/botones/24x24/pdf_ASR_BSP.png" /> </a>'
                                        }
                                    ]
                                }]
                        },]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        style: 'margin: 2px;',
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'fieldset',
                            width: 740,
                            height: 150,
                            title: 'CALCULATED AIRLINE (DETAIL)',
                            collapsible: true,
                            items: [{
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridCalAirline',
                                    columns: {
                                        items: [
                                            {text: 'From', dataIndex: 'A1580FROM', width: 50, align: 'left'},
                                            {text: 'To', dataIndex: 'A1580TO', width: 50, align: 'left'},
                                            {text: 'Route x<br> Comp.', dataIndex: 'A1580RUTAC', width: 90, align: 'left'},
                                            {text: 'Clase', dataIndex: 'A1580CLASE', width: 50, align: 'left'},
                                            {text: 'FareBasis', dataIndex: 'A1580FBASI', width: 75, align: 'left'},
                                            {text: 'Calculated Airline(Detail)',
                                                columns: [
                                                    {text: 'Tarifa', dataIndex: 'A1580FMIOR', width: 80, align: 'right',
                                                        cls: 'column_header_double',
                                                        renderer: function(value, metaData, record, rowIndex) {
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Q´s', dataIndex: 'A1580QMIOR', width: 80, align: 'right',
                                                        cls: 'column_header_double',
                                                        renderer: function(value, metaData, record, rowIndex) {
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Total <br> Fare', dataIndex: 'TotalFare', width: 80, align: 'right',
                                                        cls: 'column_header_double',
                                                        renderer: function(value, metaData, record, rowIndex) {
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Charges', dataIndex: 'A1580CHAMI', width: 80, align: 'right',
                                                        cls: 'column_header_double',
                                                        renderer: function(value, metaData, record, rowIndex) {
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Total <br>  TKT', dataIndex: 'TotalTKT', width: 80, align: 'right',
                                                        cls: 'column_header_double',
                                                        renderer: function(value, metaData, record, rowIndex) {
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }
                                }, {
                                    width: 400,
                                    border: false,
                                    padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                    id: prototype.id1 + '-CABErrorAirline',
                                    hidden: true,
                                    items: [{
                                            xtype: 'textfield',
                                            id: prototype.id1 + '-ErrorAirline',
                                            width: 395,
                                            readOnly: true,
                                            labelWidth: 20
                                        }
                                    ]
                                }]
                        }, {
                            xtype: 'fieldset',
                            width: 360,
                            title: 'ISSUE REASON',
                            collapsible: true,
                            height: 150,
                            items: [{
                                    xtype: 'grid',
                                    id: prototype.id1 + '-gridRazones',
                                    columns: {
                                        items: [
                                            {text: 'Codigo', dataIndex: 'A2553CODE', width: 60, align: 'left'},
                                            {text: 'Family', dataIndex: 'A2553TYPO', width: 90, align: 'left'},
                                            {text: 'Description', dataIndex: 'A2553DESCR', width: 185, align: 'left',
                                                renderer: function(value, metadata) {
                                                    metadata.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            }
                                        ],
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }
                                }, {
                                    width: 300,
                                    border: false,
                                    padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                    id:prototype.id1 + '-CABErrorRazones',
                                    height: 50,
                                    hidden: true,
                                    items: [{
                                            xtype: 'textfield',
                                            id: prototype.id1 + '-ErrorRazones',
                                            width: 295,
                                            readOnly: true,
                                            labelWidth: 20
                                        }
                                    ]
                                }]
                        }]
                }, {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        style: 'margin: 2px;',
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'fieldset',
                            width: 1100,
                            height: 360,
                            title: 'CALCULATED DIFFERENCES',
                            collapsible: true,
                            items: [{
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 150,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'label',
                                                    text: 'Currency'
                                                }
                                            ]
                                        }, {
                                            width: 300,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'label',
                                                    text: 'Calculated Airline'
                                                }
                                            ]
                                        }, {
                                            width: 400,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'label',
                                                    text: 'Calculated AGENT'
                                                }
                                            ]
                                        }, {
                                            width: 400,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'label',
                                                    text: 'Difference'
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 55,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-cur',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    width: 50,
                                                    readOnly: true,
                                                    labelWidth: 5
                                                }
                                            ]
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-FareAro',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Fare',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 25
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-FareAgent',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Fare',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 25
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-FareDife',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Fare',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 25
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    /*layout: 'hbox',*/
                                    border: false,
                                    height: 100,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 90,
                                            border: false
                                        }, {
                                            xtype: 'grid',
                                            id: prototype.id1 + '-gridTax',
                                            autoScroll: true, width: 950, height: 100,
                                            columns: {
                                                items: [
                                                    {text: 'Tax', dataIndex: 'A1673CDTAX', width: 60, align: 'left'},
                                                    {text: 'Ato', dataIndex: 'A1673CDATO', width: 60, align: 'left'},
                                                    {text: 'Calculated Airline',
                                                        columns: [
                                                            {text: 'Amount', dataIndex: 'A1673TXMIA', width: 250, align: 'right',
                                                                cls: 'column_header_double',
                                                                renderer: function(value, metaData, record, rowIndex) {
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }}
                                                        ]
                                                    }, {text: 'Calculated Agent',
                                                        columns: [
                                                            {text: 'Amount', dataIndex: 'A1673TXORI', width: 250, align: 'right',
                                                                cls: 'column_header_double',
                                                                renderer: function(value, metaData, record, rowIndex) {
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }}
                                                        ]
                                                    }, {text: 'Difference',
                                                        columns: [
                                                            {text: 'Amount', dataIndex: 'A1673TXDIF', width: 250, align: 'right',
                                                                cls: 'column_header_double',
                                                                renderer: function(value, metaData, record, rowIndex) {
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }}
                                                        ]
                                                    }

                                                ],
                                                defaults: {
                                                    menuDisabled: true,
                                                    align: 'center'
                                                }
                                            }
                                        }, {
                                            width: 110,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            id: prototype.id1 + '-CABErrorTax',
                                            hidden: true,
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-ErrorTax',
                                                    readOnly: true,
                                                    width: 105,
                                                    labelWidth: 5
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TotalTaxAre',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Total Tax',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TotalTaxAgent',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Total Tax',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TotalTaxDife',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Total Tax',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-ServiceschargesAre',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    fieldLabel: 'Services charges',
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-ServiceschargesAgent',
                                                    fieldLabel: 'Services charges',
                                                    maskRe: /[0-9]/,
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-ServiceschargesDife',
                                                    fieldLabel: 'Services charges',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-IvaAre',
                                                    fieldLabel: 'Iva(charge)',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-IvaAgent',
                                                    fieldLabel: 'Iva(charge)',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-IvaDife',
                                                    fieldLabel: 'Iva(charge)',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-CommissionAre',
                                                    fieldLabel: 'Commission',
                                                    maskRe: /[0-9]/,
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-CommissionAgent',
                                                    fieldLabel: 'Commission',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-CommissionDife',
                                                    fieldLabel: 'Commission',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                },{
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-SobreComiAre',
                                                    fieldLabel: 'SobreComision',
                                                    maskRe: /[0-9]/,
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-SobreComiAgent',
                                                    fieldLabel: 'SobreComision',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-SobreComiDife',
                                                    fieldLabel: 'SobreComission',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TocaAre',
                                                    fieldLabel: 'Toca',
                                                    maskRe: /[0-9]/,
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TocaAgent',
                                                    fieldLabel: 'Toca',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }, {
                                            width: 75,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-TocaDife',
                                                    fieldLabel: 'Toca',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                }, {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent'
                                    },
                                    items: [{
                                            width: 725,
                                            border: false
                                        }, {
                                            width: 250,
                                            border: false,
                                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                                            items: [{
                                                    xtype: 'textfield',
                                                    id: prototype.id1 + '-AmountPay',
                                                    fieldLabel: 'Amount Pay',
                                                    fieldStyle: "text-align:right;",
                                                    readOnly: true,
                                                    maskRe: /[0-9]/,
                                                    width: 245,
                                                    labelWidth: 100
                                                }
                                            ]
                                        }]
                                }]
                        }]
                }
            ]
        }
        
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    xtype: 'button',
                    html: '<b style="color:#2B333C;font-size:14px;">Close<b>',
                    id: prototype.id1 + '-A-btnClose',
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    border: true,
                    width: 130,
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});