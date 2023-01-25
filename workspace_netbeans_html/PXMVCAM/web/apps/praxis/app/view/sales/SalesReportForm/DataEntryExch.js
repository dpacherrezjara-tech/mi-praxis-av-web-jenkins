/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryExch', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntryExch',
    controller: prototype.id + '-dataEntryExchController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryExchController'
    ],
    title: 'Exchange Information',
    header: true,
    width: 1250,
    height: 430,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntryExch-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 1240,
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.id + '-det-tabMainEXCH',
                            width: 1230,
                            height: 415,
                            anchor: '100%',
                            margin: '1 1 1 1',
                            autoScroll: true,
                            bodyStyle: 'background: #E5ECEF',
                            listeners: {
                                tabchange: 'onChangeTab'
                            },
                            items: [
                                
                                // <editor-fold defaultstate="collapsed" desc="Tab ExchInformation">

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    id: prototype.id + '-det-tabEXCH',
                                    title: 'Exchange Information',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    margin: '5 5 5 5',
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
                                                                    text: 'Commission:'
                                                                },
                                                                {
                                                                    text: 'Over Comm.:'
                                                                },
                                                                {
                                                                    text: 'YQ:'
                                                                },
                                                                {
                                                                    text: 'IVA:'
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
                                                                            id: prototype.id + '-det-lblCiaEXCH',
                                                                            width: 30,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblDocumentoEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.id + '-det-lblTransactionEXCH',
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
                                                                            id: prototype.id + '-det-lblConjuctionEXCH',
                                                                            width: 30,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblBoletoEXCH',
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
                                                                            id: prototype.id + '-det-lblTotBoletoEXCH',
                                                                            fieldLabel: '',
                                                                            width: 30
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.id + '-det-lblIataEXCH',
                                                                    xtype: 'textfield',
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.id + '-det-lblTourCodeEXCH',
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
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblFareCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblFareEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblEQVCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblEQVEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblDiscountCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblDiscountEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        //fieldStyle: 'text-align:left;',
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblQCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblQEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblCommCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblCommEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblOCommCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblOCommEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblYQCurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblYQEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        labelSeparator: ''
                                                                    },
                                                                    items: [
                                                                        {
                                                                            id: prototype.id + '-det-lblIVACurEXCH',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            fieldStyle: 'text-align:left;'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.id + '-det-lblIVAEXCH',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                }
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
                                                                                        labelStyle: 'font-weight:bold;font-size:11px;'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            id: prototype.id + '-det-lblDigitoEXCH',
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'D:',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            labelWidth: 45,
                                                                                            width: 90
                                                                                        },
                                                                                        {
                                                                                            id: prototype.id + '-det-lblDocTypeEXCH',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: 'Doc. T.:',
                                                                                            labelWidth: 45,
                                                                                            width: 90
                                                                                        }
                                                                                        //{xtype: 'label', padding: '14px 3px 10px 3px'}*/
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
                                                                                        width: 80
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            text: 'Group:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Issue Date:'
                                                                                        },
                                                                                        {
                                                                                            text: 'RFIC:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Fare Loc:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Fare Rev:'
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
                                                                                                    id: prototype.id + '-det-lblGroupEXCH',
                                                                                                    width: 65,
                                                                                                    fieldLabel: ''
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblSourceEXCH',
                                                                                                    fieldLabel: '',
                                                                                                    width: 45
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            id: prototype.id + '-det-lblIssueDateEXCH',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            width: 65
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
                                                                                                    id: prototype.id + '-det-lblRficEXCH',
                                                                                                    width: 30,
                                                                                                    fieldLabel: ''
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblRfisEXCH',
                                                                                                    fieldLabel: 'RFIS:',
                                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                                    width: 80,
                                                                                                    labelWidth: 40
                                                                                                }
                                                                                            ]
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
                                                                                                labelSeparator: ''
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblFare2CurEXCH',
                                                                                                    width: 30,
                                                                                                    fieldLabel: '',
                                                                                                    fieldStyle: 'text-align:left;'
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblFare2EXCH',
                                                                                                    fieldLabel: '',
                                                                                                    width: 75,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                }
                                                                                            ]
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
                                                                                                labelSeparator: ''
                                                                                            },
                                                                                            items: [
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblFareRvCurEXCH',
                                                                                                    fieldLabel: '',
                                                                                                    width: 30,
                                                                                                    fieldStyle: 'text-align:left;'
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 10},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblFareRvEXCH',
                                                                                                    fieldLabel: '',
                                                                                                    width: 75,
                                                                                                    fieldStyle: 'text-align:right;'
                                                                                                }
                                                                                            ]
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
                                                                                                    xtype: 'label',
                                                                                                    id: prototype.id + '-det-lblTicket1',
                                                                                                    labelAlign: 'left',
                                                                                                    //html: '<strong>1391234123456</strong>',
                                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                                    width: 90
                                                                                                    //padding: '5px 0px 5px 0x'
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn1_1',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn2_1',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn3_1',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn4_1',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'label',
                                                                                                    id: prototype.id + '-det-lblTicket2',
                                                                                                    labelAlign: 'left',
                                                                                                    width: 90,
                                                                                                    hidden: true
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn1_2',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20,
                                                                                                    hidden: true
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn2_2',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20,
                                                                                                    hidden: true
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn3_2',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20,
                                                                                                    hidden: true
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.id + '-det-lblCpn4_2',
                                                                                                    fieldLabel: '',
                                                                                                    width: 20,
                                                                                                    hidden: true
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
                                                                            id: prototype.id + '-det-gridDetCpnEXCH',
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
                                                                                    {text: 'Line', width: 40, dataIndex: 'CUPON'},
                                                                                    {text: 'X/O', width: 40, dataIndex: 'CONEX'},
                                                                                    {text: 'From', width: 45, dataIndex: 'ORIGEN'},
                                                                                    {text: 'To', width: 40, dataIndex: 'DESTINO'},
                                                                                    {text: 'Cr', width: 30, dataIndex: 'CARRIER'},
                                                                                    {text: 'Cl', width: 30, dataIndex: 'CLASE'},
                                                                                    {text: 'Flight<br>Number', width: 60, dataIndex: 'FLIGHT'},
                                                                                    {text: 'Flight<br>Date', width: 65, dataIndex: 'DFLIGHT'},
                                                                                    {text: 'Fare <br>Basis', width: 80, dataIndex: 'FAREBASIS'},
                                                                                    {text: 'Prorate',
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: true,
                                                                                            align: 'center',
                                                                                            border: true
                                                                                        },
                                                                                        columns: [
                                                                                            {text: 'Fare<br> Curr', width: 55, dataIndex: 'CPNCUR'},
                                                                                            {text: 'Fare<br> Amount', dataIndex: 'CPN', width: 70,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Q <br>Curr', width: 55, dataIndex: 'QCUR'},
                                                                                            {text: 'Q', dataIndex: 'Q', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Comm', dataIndex: 'COMM', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Over<br> Comm', dataIndex: 'OCOMM', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'YQ', dataIndex: 'YQ', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'IVA', dataIndex: 'IVA', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            }
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
                                                                    id:prototype.id+'-det-totalesEXCH',
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
                                                                        readOnly: true,
                                                                        fieldStyle: 'text-align:right;'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 483},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Totals:',
                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalCpnCurEXCH',
                                                                            fieldStyle: 'text-align:center;'
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalCpnEXCH',
                                                                            width: 70
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalQCurEXCH',
                                                                            fieldStyle: 'text-align:center;'
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalQEXCH'
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalCOMEXCH'
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalOVERCOMEXCH'
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalYQEXCH'
                                                                        },
                                                                        {
                                                                            id: prototype.id + '-det-lblTotalIVAEXCH'
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
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }

            ]
        }
    ]

});

