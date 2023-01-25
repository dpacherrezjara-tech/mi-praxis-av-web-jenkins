Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    requires: [
        'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.prorrate'
    ],
    border: false,
    layout: 'column',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        width: prototype.widthContenedor,
        bodyStyle: 'background: transparent;'
    },
    items: [
        {
            xtype: 'panel',
            border: false,
            layout: 'vbox',
            overflowY: 'scroll',
            resizable: {
                handles: 's'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                width: '100%',
                margin: '2 0 0 0',
                border: true
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-info-panel',
                    layout: 'hbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Ticket Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 185
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Ticket Number',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTicketNumber',
                                                    value: '999 9999 999999',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Conj. Ticket Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 185
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Conj. Ticket Number',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTicketNumberConjuntion',
                                                    value: '999 9999 999999',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="PNR">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 145
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'PNR',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblPNR',
                                                    value: 'XXXXXX',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Period Ending Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 165
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Period Ending Date',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblPeriodEndingDate',
                                                    value: '99-Xxx-99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Currency">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 95
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Currency',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblCurrency',
                                                    value: 'XXX',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '0px 4px 4px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Passenger Name">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 360
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Passenger Name',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblPassengerName',
                                                    value: 'XXXXXXXX/XXXXXX XXXXXXXX',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:left;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Segment Ind.">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 110
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Segment Ind.',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblSegmentIndicator',
                                                    value: 'Xxx',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Tour Code">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 145
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Tour Code',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTourCode',
                                                    value: '999999',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Source">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 165
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Source',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblSource',
                                                    value: 'XXXXX',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Exc. Rate">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 95
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Exc. Rate',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblExchangeRate',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    value: '99.999999',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Loc. Rate">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 95
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Loc. Rate',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblExchangeLocalRate',
                                                    style: 'font-weight:bold;text-align:center;',
                                                    value: '99.999999',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '0px 4px 4px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Endorsements & Restrictions">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 260
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Endorsements & Restrictions',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.id + '-lblEndorsementAndRestrictions',
                                                    value: 'XXX XXX/XXX XXX',
                                                    readOnly: true,
//                                                    maxLength: 49,
                                                    fieldStyle: 'font-family:Monospace;background:white;color:#0B333C;font-weight:bold;text-align:left;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="GDS">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 110
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'GDS',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblGDS',
                                                    value: 'Xxxxx',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Quotation Type">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 125
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Quotation Type',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblQuotationType',
                                                    value: 'Xxxxxxxxx',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Original Issued">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 185
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Original Issued',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.id + '-lblIssuedInExchangeFor',
                                                    value: 'XXX XXX/XXX XXX',
                                                    readOnly: true,
//                                                    maxLength: 32,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="Ori-Des">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 95
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Ori-Des',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblOriDes',
                                                    value: 'XXX-XXX',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Agency IATA / Issue Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 280
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agency IATA / Issue Date',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 140
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblAgencyIATANumber',
                                                            value: '9999999-9',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:0px;border-bottom-width:0px;'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblAgencyIATADate',
                                                            value: '99-Xxx-99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-left-width:0px;border-bottom-width:0px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 280
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblAgencyIATAName',
                                                            value: 'XXXX XXXXXX XXXXXX',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:left;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:0px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 280
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblAgencyIATACity',
                                                            value: 'XXXXXX, X.X.',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:left;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 140
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Counter',
                                                            style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                            padding: '4 0 5 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblFRESV',
                                                            value: '',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-left-width:0px;border-bottom-width:0px;'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 17},
                                        // <editor-fold defaultstate="collapsed" desc="Agency Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 280
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agency Group',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblAgencyGroup',
                                                    value: 'XXXXXXXX XXXXXXX XXXXXX',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Document Type">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 180
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Document Type',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblDocumentType',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="EMD Code">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 180
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'EMD Code',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblDocumentTypeCod',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="EMD Concept">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 180
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'EMD Concept',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblDocumentTypeCon',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                }
                                            ]
                                        }
                                        // </editor-fold>
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
                        labelStyle: 'font-weight:bold;',
                        anchor: '100%',
                        enableKeyEvents: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {xtype: 'tbspacer', height: 17},
                                // <editor-fold defaultstate="collapsed" desc="checkboxfield">
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkElectronicticket',
                                            boxLabel: '<strong style="color:#0B333C;">E Ticket</strong>',
                                            checked: true,
                                            readOnly: true,
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkOverCommision',
                                            boxLabel: '<strong style="color:#0B333C;">Over Commision</strong>',
                                            checked: true,
                                            readOnly: true,
                                            width: 140
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkAccounted',
                                            boxLabel: '<strong style="color:#0B333C;">Accounted</strong>',
                                            checked: true,
                                            readOnly: true,
                                            width: 120
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 120},
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkAudited',
                                            boxLabel: '<strong style="color:#0B333C;">Audited</strong>',
                                            checked: true,
                                            readOnly: true,
                                            width: 140
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkMemoRaised',
                                            boxLabel: '<strong style="color:#0B333C;">Memo Raised</strong>',
                                            checked: true,
                                            readOnly: true,
                                            width: 120
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxMemoNumber',
                                    hidden: true,
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%',
                                        width: 185
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Memo Number',
                                            style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                            padding: '4 0 5 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-lblMemoNumber',
                                            value: '0000000000',
                                            readOnly: true,
                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', height: 47},
                                // <editor-fold defaultstate="collapsed" desc="buttons">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 4px 4px',
                                    defaults: {
                                        anchor: '100%',
                                        width: 185
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnTicket',
                                            text: '<strong style="color:white;">Ticket<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80,
                                            listeners: {
                                                click: 'btnTicket_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnAccounting',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Accounting<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 95,
                                            listeners: {
                                                click: 'btnAccounting_clickHandler'
                                            }
                                        },
                                        /*{
                                            xtype: 'button',
                                            id: prototype.id + '-btnFacsimil',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Facsimil<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80,
                                            listeners: {
                                                click: 'btnFacsimil_clickHandler'
                                            }
                                        },*/
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnProrrate',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Prorate<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80,
                                            listeners: {
                                                click: 'btnProrrate_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnDelivery',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Delivery<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80,
                                            listeners: {
                                                click: 'btnDelivery_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnUsage',
                                            hidden: true,
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Usage<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnHistory',
                                            hidden: true,
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">History<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnPayment',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Payment<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 80,
                                            listeners: {
                                                click: 'btnPayment_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            hidden:true,
                                            id: prototype.id + '-btnSingleFormat',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">ADM / ACM<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 110,
                                            listeners: {
                                                click: 'btnSingleFormat_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnADM',
                                            hidden: true,
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">Fare Audit<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 105,
                                            listeners: {
                                                click: 'searchPopup',
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnPNR',
                                            margin: '0 0 0 30',
                                            text: '<strong style="color:white;">PNR<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 70,
                                            listeners: {
                                                click: 'btnPNR_clickHandler'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'panel',
                            hidden: true,
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%',
                                width: 134
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Batch',
                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                    padding: '4 0 5 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-lblBatch1',
                                    value: 'XXX',
                                    readOnly: true,
                                    margin: '0 0 0 0',
                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:0px;'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-lblBatch2',
                                    value: 'XXX',
                                    readOnly: true,
                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-top-width:0px;border-right-width:4px;border-bottom-width:4px;'
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 220},
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%',
                                width: 80
                            },
                            items: [
                                {xtype: 'tbspacer', height: 45},
                                {
                                    xtype: 'label',
                                    text: 'Fare',
                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                    padding: '4 0 5 0'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Surcharge',
                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                    padding: '4 0 5 0'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Commission',
                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                    padding: '4 0 5 0'
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Balance">
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%',
                                                width: 240
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Balance',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'label',
                                                    html: 'Begining &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Remaining',
                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                    padding: '4 0 5 0'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 120
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblBalanceBeginingFare',
                                                            value: '999999.99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:0px;border-bottom-width:0px;'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblBalanceRemainingFare',
                                                            value: '999999.99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:0px;border-left-width:0px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 120
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblBalanceBeginingSurcharge',
                                                            value: '999999.99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:0px;border-top-width:0px;border-bottom-width:0px;'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblBalanceRemainingSurcharge',
                                                            value: '999999.99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-left-width:0px;border-right-width:4px;border-bottom-width:0px;border-top-width:0px;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%',
                                                        width: 120
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblBalanceBeginingCommision',
                                                            value: '999999.99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:0px;border-top-width:0px;border-bottom-width:4px;'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-lblBalanceRemainingCommision',
                                                            value: '999999.99',
                                                            readOnly: true,
                                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-left-width:0px;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
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
                        labelStyle: 'font-weight:bold;',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxCoupons',
                            border: false,
                            layout: 'hbox',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                height: '100%',
                                border: true
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridDataTkt">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTkt',
                                    width: 940,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Tkt', dataIndex: 'TKTIND', width: 40
                                            },
                                            {
                                                text: 'Seq', dataIndex: 'SEQ', width: 40, hidden: true
                                            },
                                            {
                                                text: 'Cp', dataIndex: 'CPN', width: 30
                                            },
                                            {
                                                text: 'X/O', dataIndex: 'XO', width: 40
                                            },
                                            {
                                                text: 'Frm', dataIndex: 'ORI', width: 40
                                            },
                                            {
                                                text: 'To', dataIndex: 'DES', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Cr Mk', dataIndex: 'AL', width: 50
                                            },
                                            {
                                                text: 'Flight<br>MKT', dataIndex: 'FLIGHT', width: 55
                                            },
                                            {
                                                text: 'Date', dataIndex: 'DATE', flex: 1, //width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Time', dataIndex: 'TIME', width: 50
                                            },
                                            {
                                                text: 'St', dataIndex: 'STAT', width: 45
                                            },
                                            {
                                                text: 'Cls', dataIndex: 'CLS', width: 40
                                            },
                                            {
                                                text: 'Fare Basis', dataIndex: 'FAREBASIS', width: 85
                                            },
                                            {
                                                text: 'Cr<br>Ope', dataIndex: 'CARR', width: 45
                                            },
                                            {
                                                text: 'Flight<br>Ope', dataIndex: 'FLIGHTOP', width: 55
                                            },
                                            {text: 'Leg', width: 40, dataIndex: 'LEG',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center; margin-right:0px ; background:#d5f4d5; ';
                                                    return (value==='Y' ?  ('<a href="#">' + value + '</a>') : value);
                                                },
                                                listeners: {
                                                    click: 'lnkLeg_clickHandler'
                                                }
                                            },
                                            {text: 'Sales Leg', width: 80, dataIndex: 'LEGSALES',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    console.log("record");
                                                    console.log(record.data.CIA);
                                                    metaData.style = ' color:#008FE3;text-align:center; margin-right:0px ; background:#d5f4d5; ';
                                                    return (value==='Y' && record.data.CIA === '139' ?  ('<a href="#">' + value + '</a>') : 
                                                            (value==='Y' && record.data.CIA !== '139' ?  ('N') : value));
                                                },
                                                listeners: {
                                                    click: 'lnkLegSales_clickHandler'
                                                }
                                            },
                                            {
                                                text: 'Not Valid',
                                                columns: [
                                                    {
                                                        text: 'Before', dataIndex: 'BEFORE', width: 60
                                                    },
                                                    {
                                                        text: 'After', dataIndex: 'AFTER', width: 60
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDataTktRealUses">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTktRealUses',
                                    width: 800,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'USAGES', flex: 1,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Seq', dataIndex: 'SEQ', width: 40, hidden: true
                                                    },
                                                    {
                                                        text: 'SeqRo', dataIndex: 'SEQRO', width: 40, hidden: true
                                                    },
                                                    {
                                                        text: 'STATUS', dataIndex: 'STATUS', width: 70
                                                    },
                                                    {
                                                        text: 'TKT', dataIndex: 'TKTIND', width: 50
                                                    },
                                                    {
                                                        text: 'CPN', dataIndex: 'CPN', width: 50
                                                    },
                                                    {
                                                        text: 'ORI', dataIndex: 'ORI', width: 35
                                                    },
                                                    {
                                                        text: 'DES', dataIndex: 'DES', width: 40, 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'AL', dataIndex: 'AL', width: 30, 
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'FLIGHT', dataIndex: 'FLIGHT', width: 55
                                                    },
                                                    {
                                                        text: 'DATE', dataIndex: 'DATE', width: 65
                                                    },
                                                    {
                                                        text: 'STAT', dataIndex: 'STAT', width: 70
                                                    },
                                                    {
                                                        text: 'REF', dataIndex: 'REF', flex: 1
                                                    },
                                                    {
                                                        text: 'AMOUNT', dataIndex: 'AMOUNT', width: 70
                                                    },
                                                    {
                                                        text: 'CURR', dataIndex: 'CRCY', width: 50
                                                    },
                                                    {
                                                        text: 'FBASIS', dataIndex: 'FARE', width: 120
                                                    },
                                                    {
                                                        text: 'Edit',
                                                        xtype: 'actioncolumn',
                                                        width: 39,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'gridDataTktRealUses_act1_clickHandler'
                                                            }
                                                        ]
                                                    }
                                                ]
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
        {
            xtype: 'panel',
            id: prototype.id + '-vskData',
            border: true,
            margin: '2 0 0 0',
            activeTab: 1,
            //overflowY: 'scroll',
            resizable: {
                handles: 's'
            },
            listeners: {
                    resize: {
                            fn: function(el) {
                                    //alert('panel resize');
                                    //var panelAccounting = Ext.getCmp(prototype.id + '-boxDataAccounting');
                                    //var gridAccounting = Ext.getCmp(prototype.id + '-gridDataAccounting');
                                    //alert('panel: ' + panelAccounting.getHeight() + ' grid: ' + gridAccounting.getHeight());
                                    //gridAccounting.setHeight(600);
                                    //gridAccounting.doLayout();
                            }
                    }
            },
            defaults: {
                bodyStyle: 'background-color: #E3EAF9;',
//                border: true,
                height: 255
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDataTkt',
                    hidden: true,
                    layout: 'hbox',
                    defaults: {
                        //anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        //anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', height: 22},
                                        // <editor-fold defaultstate="collapsed" desc="Fare">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                // anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Fare',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblFare',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Eq. Fare Paid">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Eq. Fare Paid',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblEqFarePaid',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Commission">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Commission',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblCommision',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Tax 1">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Tax',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTax1',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Tax 2">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Tax',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTax2',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Tax 3">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Tax',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTax3',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Ttl Amount">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Ttl Amount',
                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                    padding: '4 0 5 0',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblTotalAmount',
                                                    value: '999999.99',
                                                    readOnly: true,
                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                    width: 115
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
                            border: false,
                            width: 120,
                            layout: 'hbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'label',
                                    text: ' ',
                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 0
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: 110,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        //anchor: '100%',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                        value: 'XXX',
                                        margin: '0 0 2 5',
                                        width: 100
                                    },
                                    items: [
                                        {xtype: 'tbspacer', height: 22},
                                        {
                                            id: prototype.id + '-lblFareCurrency'
                                        },
                                        {
                                            id: prototype.id + '-lblEqFarePaidCurrency'
                                        },
                                        {
                                            id: prototype.id + '-lblCommisionCurrency'
                                        },
                                        {
                                            id: prototype.id + '-lblTax1Code'
                                        },
                                        {
                                            id: prototype.id + '-lblTax2Code'
                                        },
                                        {
                                            id: prototype.id + '-lblTax3Code'
                                        },
                                        {
                                            id: prototype.id + '-lblTotalAmountCurrency'
                                        }
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent',
                                    padding: '4px 4px 0px 4px',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1050
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Fare Construction',
                                            style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                            padding: '4 0 5 0'
                                        },
                                        {
                                            xtype: 'textarea',
                                            id: prototype.id + '-txaFareConstruction',
                                            value: 'XXXXXXXXXXXX&#xd;&#xa;XXXXXXXXXXXXXXXXXXXXXX',
                                            readOnly: true,
                                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:left;font-family:monospace;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                            height: 52
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background: transparent',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    border: false,
                                                    bodyStyle: 'background: transparent',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background: transparent',
                                                            defaults: {
                                                                anchor: '100%'
                                                            },
                                                            items: [
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3 Columna 1">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes1',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes2',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes3',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3 Columna 2">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes1Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes2Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'

                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes3Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                {xtype: 'tbspacer', width: 5},
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3 Columna 3">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes4',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes5',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes6',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3 Columna 4">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes4Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes5Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'

                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes6Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                {xtype: 'tbspacer', width: 5},
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3 Columna 5">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes7',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes8',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'Tax',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes9',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 105
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3 Columna 6">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes7Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes8Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'

                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                                width: 90
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblTaxes9Code',
                                                                                    value: 'XXX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                                // </editor-fold>
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            bodyStyle: 'background: transparent',
                                                            defaults: {
                                                                anchor: '100%'
                                                            },
                                                            items: [
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 4 Columna 1">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'FOP',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP1',
                                                                                    value: 'XX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 40
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'FOP',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 50
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP2',
                                                                                    value: 'XX',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 40
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                {xtype: 'tbspacer', width: 15},
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 4 Columna 2">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP1CCNumber',
                                                                                    value: '9999********9999',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 184
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP2CCNumber',
                                                                                    value: '9999********9999',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 184
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                {xtype: 'tbspacer', width: 15},
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 4 Columna 3">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP1CCAprov',
                                                                                    value: '999999',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 84
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP2CCAprov',
                                                                                    value: '999999',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 84
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                {xtype: 'tbspacer', width: 15},
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 4 Columna 4">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP1CCAmount',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 150
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP2CCAmount',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 150
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblChargeback',
                                                                                    value: '',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'color:#ff0000;font-weight:bold;text-align:center;font-size:20px',
                                                                                    width: 150
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                {xtype: 'tbspacer', width: 40},
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 4 Columna 5">
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    bodyStyle: 'background: transparent',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'CASH',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 80
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP3CAAmount',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 150
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'EXCH',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 80
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP5EXAmount',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 150
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            layout: 'hbox',
                                                                            border: false,
                                                                            bodyStyle: 'background: transparent',
                                                                            defaults: {
                                                                                anchor: '100%'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    xtype: 'label',
                                                                                    text: 'MORE FOP',
                                                                                    style: 'font-weight:bold;text-align:left;color:#0B333C;',
                                                                                    padding: '4 0 5 0',
                                                                                    width: 80
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.id + '-lblFOP4MoreAmount',
                                                                                    value: '999999.99',
                                                                                    readOnly: true,
                                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:right;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                                                                                    width: 150
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                                // </editor-fold>
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    layout: 'hbox',
                                                    bodyStyle: 'background: transparent',
                                                    //                                            padding: '4px 4px 0px 4px',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        // <editor-fold defaultstate="collapsed" desc="Related Tickets">
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'background: transparent',
                                                            defaults: {
                                                                anchor: '100%',
                                                                width: 185,
                                                                margin: '0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Related Tickets',
                                                                    style: 'font-weight:bold;text-align:center;color:#0B333C;',
                                                                    padding: '4 0 5 0'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets1',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets1_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                //alert('ok');
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets1').trim().length > 0 && win.getValue('lblRelatedTickets1').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets1').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets1SEQ').trim().length === 2) ? win.getValue('lblRelatedTickets1SEQ').trim() : '00';
                                                                                    /*var ScrTKTForm = Ext.create('Ext.Praxis.view.screens.ScrTKTForm', { id: 'ScrTKTForm' });
                                                                                    var controller = ScrTKTForm.getController();
                                                                                    controller.VP_DOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    controller.VP_DOCUMENTO_PARENT = win.getValue('txtFilterTicketCia').trim() + win.getValue('txtFilterTicketFormSer').trim();
                                                                                    controller.strTCNR = controller.VP_DOCUMENTO_PARENT;
                                                                                    controller.VP_CIA = win.getValue('lblRelatedTickets1').substr(0, 3);
                                                                                    controller.VP_SEQ = strSEQ;
                                                                                    controller.actionCode = 'V';
                                                                                    ScrTKTForm.show();*/
                                                                                    
                                                                                    var strCIA = win.getValue('lblRelatedTickets1').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }
                                                                                
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets1SEQ',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets2',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets2_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets2').trim().length > 0 && win.getValue('lblRelatedTickets2').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets2').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets2SEQ').trim().length === 2) ? win.getValue('lblRelatedTickets2SEQ').trim() : '00';
                                                                                    var strCIA = win.getValue('lblRelatedTickets2').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }
                                                                                
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets2SEQ',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets3',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets3_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets3').trim().length > 0 && win.getValue('lblRelatedTickets3').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets3').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets3SEQ').trim().length === 2) ? win.getValue('lblRelatedTickets3SEQ').trim() : '00';
                                                                                    var strCIA = win.getValue('lblRelatedTickets3').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }
                                                                                
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets3SEQ',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets4',
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;',
                                                                    listeners: {
                                                                        //click: 'Tickets4_clickHandler'
                                                                        render: function() {
                                                                            this.getEl().on('mousedown', function(e, t, eOpts) {
                                                                                var strTKT = '';
                                                                                var strSEQ = '';
                                                                                if(win.getValue('lblRelatedTickets4').trim().length > 0 && win.getValue('lblRelatedTickets4').substr(0, 3) === '139'){
                                                                                    strTKT = win.getValue('lblRelatedTickets4').trim();
                                                                                    strSEQ = (win.getValue('lblRelatedTickets4SEQ').trim().length === 2) ? win.getValue('lblRelatedTickets4SEQ').trim() : '00';
                                                                                    var strCIA = win.getValue('lblRelatedTickets4').substr(0, 3);
                                                                                    var strDOCUMENTO = ((strTKT.length >= 3) ? strTKT.substr(3) : strTKT);
                                                                                    win.displaySalesReportTkt(strCIA,strDOCUMENTO,strSEQ,'EXCH');
                                                                                }
                                                                                
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-lblRelatedTickets4SEQ',
                                                                    value: '',
                                                                    hidden: true,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:center;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-top-width:0px;border-bottom-width:4px;'
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    border: true,
                                                                    items: [
                                                                          {
                                                                            xtype: 'toolbar',
                                                                            items: [                                                                                
                                                                                {
                                                                                    xtype:'button',
                                                                                    id: prototype.id + '-btn-de-back-cjn',
                                                                                    icon: 'resources/img/botones/prev.png',
                                                                                    listeners: {
                                                                                        click: 'imgPrev_clickHandler'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype:'button',
                                                                                    id: prototype.id + '-btn-de-next-cjn',
                                                                                    icon: 'resources/img/botones/next2.png',
                                                                                    listeners: {
                                                                                        click: 'imgNext_clickHandler'
                                                                                    }
                                                                                }
                                                                            ]
                                                                            
                                                                          }
                                                                    
                                                                       ]
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        //                                                { xtype: 'tbspacer', width: 17 },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            border: false,
                                                            bodyStyle: 'background: transparent',
                                                            defaults: {
                                                                anchor: '100%',
                                                                width: 25,
                                                                margin: '0'
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', height: 22},
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT1',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT2',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT3',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgSearchTKT4',
                                                                    style: 'background: #E3EAF9',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    padding: '3px 0px 3px 0px',
                                                                    border: false,
                                                                    listeners: {
                                                                        click: 'imgSearchTKT_clickHandler'
                                                                    }
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
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="gridDataAccounting">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataAccounting',
                    width: 1752,
                    height: '100%',
                    layout: 'fit',
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
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = 'text-align:right;';                                                   

                                            var rtn = '';
                                            switch(data.A1716MODO.trim()){
                                                    case 'S': rtn = 'SALE'; break;
                                                    case 'M': rtn = 'MEMO'; break;
                                                    case 'J': rtn = 'EXCH'; break;
                                                    case 'I': rtn = 'TAXC'; break;
                                                    case 'R': rtn = 'RFND'; break;
                                                    case 'F': rtn = 'FLWN'; break;
                                                    case 'C': rtn = 'COMM'; break;
                                                    case 'L': rtn = 'IPAY'; break;
                                                    default: rtn = data.A1716MODO.trim();
                                            }

                                            return rtn;
                                        }
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
                                text: 'ACCOUNT NUMBER', dataIndex: 'A1716CUENT', /*width: 277*/flex: 1,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = 'text-align:right;';
                                            value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1716ACTIV, '0,000.00') : '';
                                            return value; // Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'CREDIT', dataIndex: 'A1716PASIV', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = 'text-align:right;';
                                            value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                                            return value; // Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'CREDIT', dataIndex: 'A1716PASRV', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {
                                text: 'CLIENT', dataIndex: 'A1716COPE', width: 80
                            },
                            {
                                text: 'PROVIDER', dataIndex: 'A1716PROV', width: 80
                            },
                            {
                                text: 'JOURNAL<br>ENTRY', dataIndex: 'A1716IDCON', width: 80
                            },
                            {
                                text: 'EXCHANGE<br>RATE', dataIndex: 'A720ROE', width: 80,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    value = data.A1716MODO.trim() !== '' ? Ext.util.Format.number(data.A1530TCAMB, '0,000.000000') : '';
                                    return Ext.util.Format.number(value, '0,000.000000');
                                }
                            }
                        ]
                    }
                }
                // </editor-fold>
                    
            ]
        },
        {
            xtype: 'panel',
            border: true,
            bodyStyle: 'background-color: #E3EAF9;',
            margin: '2 0 0 0',
            layout: 'hbox',
            overflowY: 'scroll',
            resizable: {
                handles: 's'
            },
            defaults: {
                anchor: '100%'
            },
            items: [
                {xtype: 'tbspacer', width: 7},
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'vbox',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%',
                        width: prototype.widthContenedor / 2 - 20
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Reference">
                        {
                            xtype: 'label',
                            text: 'Reference',
                            style: 'font-weight:bold;text-align:left;color:#0B333C;',
                            padding: '4 0 5 0'
                        },
                        {
                            xtype: 'textarea',
                            id: prototype.id + '-txaReference',
                            value: 'XXXXXXXXXXXX&#xd;\nXXXXXXXXXXXXXXXXXXXXXX',
                            readOnly: true,
                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:left;font-family:monospace;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                            height: 52
                        }
                        // </editor-fold>
                    ]
                },
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'vbox',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%',
                        width: prototype.widthContenedor / 2 - 20
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Related">
                        {
                            xtype: 'label',
                            text: 'Related',
                            style: 'font-weight:bold;text-align:left;color:#0B333C;',
                            padding: '4 0 5 0'
                        },
                        {
                            xtype: 'textarea',
                            id: prototype.id + '-txaRelated',
                            value: 'XXXXXXXXXXXX&#xd;\nXXXXXXXXXXXXXXXXXXXXXX',
                            readOnly: true,
                            fieldStyle: 'background:white;color:#0B333C;font-weight:bold;text-align:left;font-family:monospace;border-style:solid;border-color:#7F98A8;border-right-width:4px;border-bottom-width:4px;',
                            height: 52
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});