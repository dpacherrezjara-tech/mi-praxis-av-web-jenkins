/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryRfnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idRfnd + '-dataEntryRfnd',
    controller: prototype.idRfnd + '-dataEntryRfndController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryRfndController',
        'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.prorrate',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPRfnd',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXRfnd',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXCOMMRfnd',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryCOMMRfnd',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRfnd'
    ],
    title: 'Refund Information',
    header: true,
    width: 1470,
    height: 800,
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
            id: prototype.idRfnd + '-DataEntryRfnd-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 1460,
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.idRfnd + '-det-tabMain',
                            width: 1450,
                            height: 750,
                            anchor: '100%',
                            margin: '1 1 1 1',
                            autoScroll: true,
                            bodyStyle: 'background: #E5ECEF',
                            listeners: {
                                tabchange: 'onChangeTab'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Tab RfndInformation">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #E5ECEF',
                                    id: prototype.idRfnd + '-det-tabSale',
                                    title: 'Refund Information',
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
                                                                    text: 'EQV. Fare:'
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
                                                                            id: prototype.idRfnd + '-det-lblCia',
                                                                            fieldLabel: '',
                                                                            width: 30,
                                                                            readOnly:true,
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            maskRe: /[0-9]/,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            listeners: {
                                                                                blur: 'onBlurValueCia'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblDocumento',
                                                                            fieldLabel: '',
                                                                            readOnly:true,
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:left;',
                                                                            labelSeparator: '',
                                                                            maskRe: /[0-9]/,
                                                                            maxLength: 10,
                                                                            enforceMaxLength: 10,
                                                                            listeners: {
                                                                                blur: 'onBlurValueTicket'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idRfnd + '-det-lblTransaction',
                                                                    xtype: 'textfield',
                                                                    margin: '1',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly:true,
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
                                                                            id: prototype.idRfnd + '-det-lblConjuction',
                                                                            width: 30,
                                                                            readOnly:true,
                                                                            fieldLabel: ''
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblBoleto',
                                                                            fieldLabel: '',
                                                                            readOnly:true,
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
                                                                            id: prototype.idRfnd + '-det-lblTotBoleto',
                                                                            fieldLabel: '',
                                                                            readOnly:true,
                                                                            width: 30
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idRfnd + '-det-lblTransactionNbr',
                                                                    xtype: 'textfield',
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly:true,
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idRfnd + '-det-lblIata',
                                                                    xtype: 'textfield',
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    maskRe: /[0-9]/,
                                                                    maxLength: 8,
                                                                    enforceMaxLength: 8,
                                                                    width: 110,
                                                                    listeners: {
                                                                        blur: 'onBlurValueIata'
                                                                    }
                                                                },
                                                                {
                                                                    id: prototype.idRfnd + '-det-lblTourCode',
                                                                    xtype: 'textfield',
//                                                                    padding: '1',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    maxLength: 20,
                                                                    enforceMaxLength: 20,
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
                                                                            id: prototype.idRfnd + '-det-lblFareCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onBlurValueCurrency'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblFare',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
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
                                                                            id: prototype.idRfnd + '-det-lblEQVCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            readOnly: true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblEQV',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
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
                                                                            id: prototype.idRfnd + '-det-lblDiscountCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            readOnly: true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblDiscount',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
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
                                                                            id: prototype.idRfnd + '-det-lblQCur',
                                                                            width: 30,
                                                                            fieldLabel: '',
                                                                            maxLength: 3,
                                                                            readOnly:true,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblQ',
                                                                            fieldLabel: '',
                                                                            width: 70,
                                                                            readOnly:true,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                //blur: 'onAmountRenderer'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    id: prototype.idRfnd + '-det-lblExchangeRate',
                                                                    xtype: 'textfield',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:right;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly:true,
                                                                    width: 110
                                                                },
                                                                {
                                                                    id: prototype.idRfnd + '-det-lblLocalCur',
                                                                    xtype: 'textfield',
                                                                    margin: '2',
                                                                    fieldStyle: 'text-align:left;',
                                                                    labelSeparator: '',
                                                                    fieldLabel: '',
                                                                    readOnly:true,
                                                                    width: 60
                                                                } 
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // </editor-fold

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
                                                                                            id: prototype.idRfnd + '-det-lblDigito',
                                                                                            xtype: 'textfield',
                                                                                            fieldLabel: 'D:',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            labelWidth: 45,
                                                                                            readOnly:true,
                                                                                            width: 90
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblDocType',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: 'Doc. T.:',
                                                                                            labelWidth: 45,
                                                                                            readOnly:true,
                                                                                            width: 90,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue',
                                                                                                blur: 'onBlurTDoc'
                                                                                            }
                                                                                        },
                                                                                        {xtype: 'label', padding: '14px 3px 10px 3px'},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblSeq',
                                                                                            xtype: 'textfield',
                                                                                            margin: '2',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: 'Seq:',
                                                                                            labelWidth: 45,
                                                                                            readOnly:true,
                                                                                            width: 90
                                                                                        },
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            id: prototype.idRfnd + '-btnUpdateItinerary',
                                                                                            iconCls: 'prx-icon-update',
                                                                                            tooltip: 'Update Itinerary',
                                                                                            listeners: {
                                                                                                click: 'onClickBtnUpdateItinerary'
                                                                                            }
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
                                                                                            text: 'Unauthorized:'
                                                                                        },
                                                                                        {
                                                                                            text: 'FFOP:'
                                                                                        },
                                                                                        {
                                                                                            text: 'Vou. Reason:'
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
                                                                                                    id: prototype.idRfnd + '-det-lblGroup',
                                                                                                    width: 65,
                                                                                                    readOnly:true,
                                                                                                    fieldLabel: ''
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.idRfnd + '-det-lblSource',
                                                                                                    fieldLabel: '',
                                                                                                    readOnly:true,
                                                                                                    width: 50
                                                                                                },
                                                                                                {xtype: 'tbspacer', width: 5},
                                                                                                {
                                                                                                    id: prototype.idRfnd + '-det-lblFileId',
                                                                                                    fieldLabel: 'File ID:',
                                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                                    width: 115,
                                                                                                    readOnly:true,
                                                                                                    labelWidth: 45
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblIssueDate',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            maxLength: 8,
                                                                                            enforceMaxLength: 8,
                                                                                            maskRe: /[0-9]/,
                                                                                            width: 65,
                                                                                            listeners: {
                                                                                                blur: 'onBlurValueFecha'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblAuthorityNumber',
                                                                                            xtype: 'textfield',
                                                                                            margin: '1',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            maskRe: /[0-9]/,
                                                                                            width: 240
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
                                                                                                    id: prototype.idRfnd + '-det-lblFFOP',
                                                                                                    width: 40,
                                                                                                    maxLength: 1,
                                                                                                    enforceMaxLength: 1,
                                                                                                    maskRe: /[1-2]/,
                                                                                                    fieldLabel: ''
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblVoucherReason',
                                                                                            xtype: 'textfield',
                                                                                            margin: '2',
                                                                                            fieldStyle: 'text-align:left;',
                                                                                            labelSeparator: '',
                                                                                            fieldLabel: '',
                                                                                            readOnly:true,
                                                                                            width: 240
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        // </editor-fold
                                                                        //PANEL 2_1 Reference
                                                                        // <editor-fold defaultstate="collapsed" desc="Reference">
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 1 1 1',
                                                                            width: 575,
                                                                            border: false,
                                                                            items: [
                                                                                {
                                                                                    id: prototype.idRfnd + '-det-lblReference',
                                                                                    xtype: 'textfield',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Reference:',
                                                                                    width: 450,
                                                                                    labelWidth: 75,
                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                    listeners: {
                                                                                        change: 'onUpperValue'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    id: prototype.idRfnd + '-det-lblRelated',
                                                                                    xtype: 'textfield',
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    labelSeparator: '',
                                                                                    fieldLabel: 'Observation:',
                                                                                    width: 450,
                                                                                    labelWidth: 75,
                                                                                    labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                    listeners: {
                                                                                        change: 'onUpperValue'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'label',
                                                                                    id: prototype.idRfnd + '-filler',
                                                                                    height: 45
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
                                                                                            id: prototype.idRfnd + '-det-lblTicket1',
                                                                                            labelAlign: 'left',
                                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                                            width: 70
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn1_1',
                                                                                            fieldLabel: '',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[1]/,
                                                                                            width: 15
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn2_1',
                                                                                            fieldLabel: '',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[2]/,
                                                                                            width: 15
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn3_1',
                                                                                            fieldLabel: '',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[3]/,
                                                                                            width: 15
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn4_1',
                                                                                            fieldLabel: '',
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[4]/,
                                                                                            width: 15
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            xtype: 'label',
                                                                                            id: prototype.idRfnd + '-det-lblTicket2',
                                                                                            labelAlign: 'left',
                                                                                            width: 70,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn1_2',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[1]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn2_2',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[2]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn3_2',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[3]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn4_2',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[4]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            xtype: 'label',
                                                                                            id: prototype.idRfnd + '-det-lblTicket3',
                                                                                            labelAlign: 'left',
                                                                                            width: 70,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn1_3',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[1]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn2_3',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[2]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn3_3',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[3]/,
                                                                                            hidden: true
                                                                                        },
                                                                                        {xtype: 'tbspacer', width: 5},
                                                                                        {
                                                                                            id: prototype.idRfnd + '-det-lblCpn4_3',
                                                                                            fieldLabel: '',
                                                                                            width: 15,
                                                                                            maxLength: 1,
                                                                                            enforceMaxLength: 1,
                                                                                            maskRe: /[4]/,
                                                                                            hidden: true
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        // </editor-fold>
                                                                        //PANEL 2_1 Botones
                                                                        // <editor-fold defaultstate="collapsed" desc="Botones">
                                                                        {
                                                                            xtype: 'panel',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 1 1 1',
                                                                            //width: 564,
                                                                            border: false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'button',
                                                                                    id: prototype.idRfnd + '-btnSave',
                                                                                    iconCls: 'prx-icon-save',
                                                                                    tooltip: 'Save',
                                                                                    listeners: {
                                                                                        click: 'onClickBtnSave'
                                                                                    }
                                                                                },
                                                                                {xtype: 'label', padding: '14px 3px 10px 3px'},
                                                                                {
                                                                                    xtype: 'button',
                                                                                    id: prototype.idRfnd + '-btnDelete',
                                                                                    iconCls: 'prx-icon-delete',
                                                                                    tooltip: 'Delete',
                                                                                    listeners: {
                                                                                        click: 'onClickBtnDelete'
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
                                                                    width: 1190,
                                                                    border: false,
                                                                    items: [
                                                                        {
                                                                            xtype: 'grid',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            padding: '5 0 0 0',
                                                                            border: true,
                                                                            id: prototype.idRfnd + '-det-gridDetCpn',
                                                                            height: 190,
                                                                            width: 1180,
                                                                            columnLines: true,
                                                                            resizable: false,
                                                                            plugins: {
                                                                                ptype: 'cellediting',
                                                                                clicksToEdit: 1
                                                                            },
                                                                            dockedItems: [{
                                                                                xtype: 'toolbar',
                                                                                items: [{
                                                                                        text: 'Add Coupon',
                                                                                        id: prototype.idRfnd + '-btnADD',
                                                                                        iconCls: 'prx-icon-add',
                                                                                        handler: 'onAddCouponClick'
                                                                                    }, '-']
                                                                            }],
                                                                            autoScroll: true,
                                                                            columns: {
                                                                                defaults: {
                                                                                    menuDisabled: true,
                                                                                    sortable: true,
                                                                                    resizable: false,
                                                                                    align: 'center',
                                                                                    renderer: 'onRendererColumnAttr'
                                                                                },
                                                                                items: [
                                                                                    {text: 'Ticket', width: 100, dataIndex: 'TICKET'},
                                                                                    {text: 'CPN', width: 40, dataIndex: 'CUPON'},
                                                                                    {text: 'X/O', width: 35, dataIndex: 'CONEX', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 1, maskRe: /[ oxOX]/,
                                                                                            enforceMaxLength: 1,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'From', width: 45, dataIndex: 'ORIGEN', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 3, maskRe: /[ a-zA-Z]/,
                                                                                            enforceMaxLength: 3,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue',
                                                                                                blur: 'onBlurValueCity'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'To', width: 40, dataIndex: 'DESTINO', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 3, maskRe: /[ a-zA-Z]/,
                                                                                            enforceMaxLength: 3,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue',
                                                                                                blur: 'onBlurValueCity'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'Cr', width: 30, dataIndex: 'CARRIER', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 2, maskRe: /[a-zA-Z0-9*.]/,
                                                                                            enforceMaxLength: 2,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'Cl', width: 30, dataIndex: 'CLASE', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 1, maskRe: /[a-zA-Z]/,
                                                                                            enforceMaxLength: 1,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'Flight<br>Number', width: 60, dataIndex: 'FLIGHT', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 5, maskRe: /[openclsvidOPENCLSVID0-9]/,
                                                                                            enforceMaxLength: 5,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue',
                                                                                                blur: 'onBlurValueVuelo'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'Flight<br>Date', width: 65, dataIndex: 'DFLIGHT', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 8, maskRe: /[openclsvidOPENCLSVID0-9]/,
                                                                                            enforceMaxLength: 8,
                                                                                            listeners: {
                                                                                                blur: 'onBlurValueFechaVuelo'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'Cr<br>OPE', width: 40, dataIndex: 'CARRIEROPE'/*, editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 2, maskRe: /[a-zA-Z0-9*.]/,
                                                                                            enforceMaxLength: 2,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue'
                                                                                            }
                                                                                        }
                                                                                    }*/},
                                                                                    {text: 'Flight<br>OPE', width: 53, dataIndex: 'FLIGHTOPE'/*, editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 5, maskRe: /[openclsvidOPENCLSVID0-9]/,
                                                                                            enforceMaxLength: 5,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue',
                                                                                                blur: 'onBlurValueVuelo'
                                                                                            }
                                                                                        }
                                                                                    }*/},
                                                                                    {text: 'FareBasis', width: 80, dataIndex: 'FAREBASIS', editor: {
                                                                                        completeOnEnter: false,
                                                                                        field: {
                                                                                            xtype: 'textfield',
                                                                                            maxLength: 15, maskRe: /[a-zA-Z0-9/]/,
                                                                                            enforceMaxLength: 15,
                                                                                            listeners: {
                                                                                                change: 'onUpperValue'
                                                                                            }
                                                                                        }
                                                                                    }},
                                                                                    {text: 'Prorate',
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: true,
                                                                                            align: 'center',
                                                                                            border: true
                                                                                        },
                                                                                        columns: [
                                                                                            {text: 'Fare<br>Curr', width: 48, dataIndex: 'CPNCUR'},
                                                                                            {text: 'Coupon<br>Value', dataIndex: 'CPN', width: 70,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            /*{text: 'Q <br>Curr', width: 48, dataIndex: 'QCUR'},*/
                                                                                            {text: 'Q', dataIndex: 'Q', width: 55,
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
                                                                                            {text: 'IVA', dataIndex: 'IVA', width: 50,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Comm', dataIndex: 'COMM_G', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Over <br>Comm', dataIndex: 'SCOMM', width: 55,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Fare<br>Amount', dataIndex: 'CPNLOC', width: 70,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {text: 'Usage', width: 48, dataIndex: 'USED'},
                                                                                    {
                                                                                        xtype: 'actioncolumn',
                                                                                        id: prototype.idRfnd + '-det-gridDetCpn-delete',
                                                                                        width: 40,
                                                                                        menuDisabled: true,
                                                                                        sortable: false,
                                                                                        items: [
                                                                                            {
                                                                                                iconCls: 'prx-icon-image-trash',
                                                                                                handler: 'onRemoveCouponClick'
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
                                                                    id:prototype.idRfnd+'-det-totales',
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
                                                                        {xtype: 'tbspacer', width: 200},
                                                                        {
                                                                            xtype: 'label',
                                                                            id: prototype.idRfnd + '-det-lblError',
                                                                            text: '',
                                                                            width: 370,
                                                                            fieldStyle: 'text-align:left;',
                                                                            style: {
                                                                                background: '#FFA07A'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Totals:',
                                                                            labelStyle: 'font-weight:bold;font-size:11px;',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalCpnCur',
                                                                            fieldStyle: 'text-align:center;',
                                                                            width: 48
                                                                        },
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalCpn',
                                                                            width: 70
                                                                        },/*
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalQCur',
                                                                            fieldStyle: 'text-align:center;',
                                                                            width: 48
                                                                        },*/
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalQ'
                                                                        },
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalYQ'
                                                                        },
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalIVA',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalCOM'
                                                                        },
                                                                        {
                                                                            id: prototype.idRfnd + '-det-lblTotalOVERCOM'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold
                                                    ]
                                                }
                                                // </editor-fold
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
                                                    title: '<b style="font-size:12px">Form of Payment<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 0',
                                                    width: 335,
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
                                                                        width: 35,
                                                                        margin: '1',
                                                                        padding: '1px 2px 0px 2px'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Code'
                                                                        },
                                                                        {
                                                                            text: 'Type'
                                                                        },
                                                                        {
                                                                            text: 'Ref. Number',
                                                                            width: 100
                                                                        },
                                                                        {
                                                                            text: 'Curr'
                                                                        },
                                                                        {
                                                                            text: 'Amount',
                                                                            width: 75
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFOPCode1',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblCardType1',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblRefNumber1',
                                                                            width: 105,
                                                                            maxLength: 19,
                                                                            enforceMaxLength: 19,
                                                                            maskRe: /[xX0-9*]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFOPCur1',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFOP1',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFEXP1',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblCAPL1',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblCORRLFOP1',
                                                                            hidden: true
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFOPCode2',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblCardType2',
                                                                            maxLength: 2,
                                                                            enforceMaxLength: 2,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblRefNumber2',
                                                                            width: 105,
                                                                            maxLength: 19,
                                                                            enforceMaxLength: 19,
                                                                            maskRe: /[xX0-9*]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFOPCur2',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFOP2',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblFEXP2',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblCAPL2',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblCORRLFOP2',
                                                                            hidden: true
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
                                                                        width: 50
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Net Remmit:',
                                                                            width: 130
                                                                        },
                                                                        {
                                                                            text: 'Other:'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblFopOtherCur',
                                                                            width: 30
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblFOPOther',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.idRfnd + '-det-btnSearch',
                                                                            style: 'background:#E5ECEF',
                                                                            iconCls: 'prx-icon-search',
                                                                            border: false,
                                                                            tooltip: 'Search FOP',
                                                                            width: 30,
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblRemmittanceCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblRemmittance',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            width: 25
                                                                        },
                                                                        {
                                                                            text: 'Total:',
                                                                            width: 50
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblFOPCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblFOP',
                                                                            width: 70,
                                                                            labelwidth: 0,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: prototype.idRfnd + '-det-lblUnbalance',
                                                                    text: 'Ticket is Unbalance',
                                                                    hidden:true,
                                                                    width: 220,
                                                                    style: {
                                                                        background: '#FFA07A'
                                                                    }
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
                                                    width: 215,
                                                    height: 200,
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
                                                                        width: 35,
                                                                        margin: '1',
                                                                        padding: '1px 2px 0px 2px'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Code',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            text: 'Curr'
                                                                        },
                                                                        {
                                                                            text: 'Amount',
                                                                            width: 75
                                                                        },
                                                                        {
                                                                            text: 'PFC'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCode1',
                                                                            width: 40,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCur1',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAX1',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblPFC1',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCode2',
                                                                            width: 40,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCur2',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAX2',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblPFC2',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCode3',
                                                                            width: 40,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCur3',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAX3',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblPFC3',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCode4',
                                                                            width: 40,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z0-9]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue',
                                                                                blur: 'onTipoRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCur4',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAX4',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblPFC4',
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                change: 'onUpperValue'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Other:',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXOtherCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXOther',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.idRfnd + '-det-btnSearch2',
                                                                            style: 'background:#E5ECEF',
                                                                            iconCls: 'prx-icon-search',
                                                                            border: false,
                                                                            tooltip: 'Search TAX',
                                                                            width: 30,
                                                                            listeners: {
                                                                                click: 'onClickSearchTAX'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Total:',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAX',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: {
                                                        type: 'vbox'
                                                    },
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                        
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    margin: '1 1 1 1',
                                                    border: false,
                                                    items: [
                                                // PANEL 3_3 Commision
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b  style="font-size:12px">Commision<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 5',
                                                    width: 290,
                                                    height: 150,
                                                    defaults: {
                                                        border: false
                                                    },
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
                                                                                width: 35,
                                                                                margin: '1',
                                                                                padding: '1px 2px 0px 2px'
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: '',
                                                                                    width: 90
                                                                                },
                                                                                {
                                                                                    text: 'Rate',
                                                                                    width: 45
                                                                                },
                                                                                {
                                                                                    text: 'Curr'
                                                                                },
                                                                                {
                                                                                    text: 'Amount',
                                                                                    width: 75
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
                                                                                width: 30
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Standard:',
                                                                                    width: 85
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONRate1',
                                                                                    width: 40,
                                                                                    maxLength: 7,
                                                                                    enforceMaxLength: 7,
                                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                                    fieldStyle: 'text-align:right;',
                                                                                    listeners: {
                                                                                        blur: 'onAmountRenderer'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONCur1',
                                                                                    readOnly:true,
                                                                                    maxLength: 3,
                                                                                    enforceMaxLength: 3,
                                                                                    maskRe: /[a-zA-Z]/,
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    listeners: {
                                                                                        //change: 'onUpperValue'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISION1',
                                                                                    width: 70,
                                                                                    maxLength: 13,
                                                                                    enforceMaxLength: 13,
                                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                                    fieldStyle: 'text-align:right;',
                                                                                    listeners: {
                                                                                        blur: 'onAmountRenderer'
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
                                                                                width: 30
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: 'Over Comm.:',
                                                                                    width: 85
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONRate2',
                                                                                    width: 40,
                                                                                    maxLength: 7,
                                                                                    enforceMaxLength: 7,
                                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                                    fieldStyle: 'text-align:right;',
                                                                                    listeners: {
                                                                                        blur: 'onAmountRenderer'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONCur2',
                                                                                    readOnly:true,
                                                                                    maxLength: 3,
                                                                                    enforceMaxLength: 3,
                                                                                    maskRe: /[a-zA-Z]/,
                                                                                    fieldStyle: 'text-align:left;',
                                                                                    listeners: {
                                                                                        //change: 'onUpperValue'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISION2',
                                                                                    width: 70,
                                                                                    maxLength: 13,
                                                                                    enforceMaxLength: 13,
                                                                                    maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                                    fieldStyle: 'text-align:right;',
                                                                                    listeners: {
                                                                                        blur: 'onAmountRenderer'
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
                                                                                width: 30
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: '',
                                                                                    width: 85
                                                                                },
                                                                                {
                                                                                    text: 'Other:',
                                                                                    width: 40
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONCurOther'
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONOther',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    id: prototype.idRfnd + '-det-btnSearch3_1',
                                                                                    style: 'background:#E5ECEF',
                                                                                    iconCls: 'prx-icon-search',
                                                                                    border: false,
                                                                                    tooltip: 'Search COMM',
                                                                                    width: 40,
                                                                                    listeners: {
                                                                                        click: 'onClickSearchCOMM'
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
                                                                                width: 30
                                                                            },
                                                                            items: [
                                                                                {
                                                                                    text: '',
                                                                                    width: 85
                                                                                },
                                                                                {
                                                                                    text: 'Total:',
                                                                                    width: 40
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISIONCur'
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idRfnd + '-det-lblCOMMISION',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                // PANEL 3_4 Tax on Commission
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b  style="font-size:12px">Tax On Commission<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 5',
                                                    width: 240,
                                                    height: 140,
                                                    defaults: {
                                                        border: false
                                                    },
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
                                                                        width: 35,
                                                                        margin: '1',
                                                                        padding: '1px 2px 0px 2px'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: 'Rate',
                                                                            width: 45
                                                                        },
                                                                        {
                                                                            text: 'Code',
                                                                            width: 55
                                                                        },
                                                                        {
                                                                            text: 'Curr'
                                                                        },
                                                                        {
                                                                            text: 'Amount',
                                                                            width: 75
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            width: 0
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSIONRate1',
                                                                            width: 40,
                                                                            maxLength: 7,
                                                                            enforceMaxLength: 7,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSIONCode1',
                                                                            width: 55
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSIONCur1',
                                                                            readOnly:true,
                                                                            maxLength: 3,
                                                                            enforceMaxLength: 3,
                                                                            maskRe: /[a-zA-Z]/,
                                                                            fieldStyle: 'text-align:left;',
                                                                            listeners: {
                                                                                //change: 'onUpperValue'
                                                                            }
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSION1',
                                                                            width: 70,
                                                                            maxLength: 13,
                                                                            enforceMaxLength: 13,
                                                                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                                                                            fieldStyle: 'text-align:right;',
                                                                            listeners: {
                                                                                blur: 'onAmountRenderer'
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
                                                                        width: 30
                                                                    },
                                                                    items: [{}]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    bodyStyle: 'background: #E5ECEF',
                                                                    layout: 'hbox',
                                                                    margin: '1 1 1 1',
                                                                    defaults: {
                                                                        xtype: 'label',
                                                                        style: 'font-weight:bold',
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: '',
                                                                            width: 35
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.idRfnd + '-det-btnSearch4',
                                                                            style: 'background:#E5ECEF',
                                                                            iconCls: 'prx-icon-search',
                                                                            border: false,
                                                                            tooltip: 'Search TAXCOMM',
                                                                            width: 30,
                                                                            listeners: {
                                                                                click: 'onClickSearchTAXCOMM'
                                                                            }
                                                                        },
                                                                        {
                                                                            text: 'Other:',
                                                                            width: 40
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSIONOtherCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSIONOther',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
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
                                                                        width: 30
                                                                    },
                                                                    items: [
                                                                        {
                                                                            text: '',
                                                                            width: 65
                                                                        },
                                                                        {
                                                                            text: 'Total:',
                                                                            width: 40
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSIONCur'
                                                                        },
                                                                        {
                                                                            width: 5
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            readOnly:true,
                                                                            id: prototype.idRfnd + '-det-lblTAXCOMMISSION',
                                                                            width: 70,
                                                                            fieldStyle: 'text-align:right;'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                }
                                                ]
                                                },
                                                // <editor-fold defaultstate="collapsed" desc="PANEL 2_1 GRID">
                                                                        {
                                                                            xtype: 'panel',
                                                                            id:prototype.idRfnd+'-det-panelGridEMD',
                                                                            bodyStyle: 'background: #E5ECEF',
                                                                            layout: 'vbox',
                                                                            margin: '1 1 1 1',
                                                                            width: 510,
                                                                            border: false,
                                                                            items: [
                                                                                /*{
                                                                                    xtype: 'label',
                                                                                    labelAlign: 'left',
                                                                                    html: '<strong>EMD INFORMATION</strong>',
                                                                                    padding: '1px 5px 0px 10px'

                                                                                },*/
                                                                                {
                                                                                    xtype: 'grid',
                                                                                    bodyStyle: 'background: #E5ECEF',
                                                                                    padding: '5 0 0 0',
                                                                                    border: true,
                                                                                    id: prototype.idRfnd + '-det-gridEMD',
                                                                                    height: 112,
                                                                                    width: 500,
                                                                                    columnLines: true,
                                                                                    resizable: false,
                                                                                    plugins: {
                                                                                        ptype: 'cellediting',
                                                                                        clicksToEdit: 1
                                                                                    },
                                                                                    dockedItems: [{
                                                                                        xtype: 'toolbar',
                                                                                        items: [{
                                                                                                text: 'Add Coupon',
                                                                                                id: prototype.idRfnd + '-btnADDEmd',
                                                                                                iconCls: 'prx-icon-add',
                                                                                                handler: 'onAddCouponClickEmd'
                                                                                            }, '-']
                                                                                    }],
                                                                                    columns: {
                                                                                        defaults: {
                                                                                            menuDisabled: true,
                                                                                            sortable: true,
                                                                                            resizable: false,
                                                                                            align: 'center',
                                                                                            renderer: 'onRendererColumnAttr'
                                                                                        },
                                                                                        items: [
                                                                                            {text: 'Ticket', width: 100, dataIndex: 'TKTEMD', id: 'tktemd'},
                                                                                            {text: 'CPN', width: 40, dataIndex: 'CUPONEMD', id: 'cpnemd', editor: {
                                                                                                completeOnEnter: false,
                                                                                                field: {
                                                                                                    xtype: 'textfield',
                                                                                                    maxLength: 1, maskRe: /[1-4]/,
                                                                                                    enforceMaxLength: 1
                                                                                                    /*listeners: {
                                                                                                        change: 'onUpperValue'
                                                                                                    }*/
                                                                                                }
                                                                                            }},
                                                                                            {text: 'RFIC', width: 50, dataIndex: 'RFIC', id: 'rficemd', editor: {
                                                                                                completeOnEnter: false,
                                                                                                field: {
                                                                                                    xtype: 'textfield',
                                                                                                    maxLength: 1, maskRe: /[a-zA-Z0-9]/,
                                                                                                    enforceMaxLength: 1,
                                                                                                    listeners: {
                                                                                                        change: 'onUpperValue'
                                                                                                    }
                                                                                                }
                                                                                            }},
                                                                                            {text: 'RFIS', width: 60, dataIndex: 'RFIS', id: 'rfisemd', editor: {
                                                                                                completeOnEnter: false,
                                                                                                field: {
                                                                                                    xtype: 'textfield',
                                                                                                    maxLength: 3, maskRe: /[a-zA-Z0-9]/,
                                                                                                    enforceMaxLength: 3,
                                                                                                    listeners: {
                                                                                                        change: 'onUpperValue'
                                                                                                    }
                                                                                                }
                                                                                            }},
                                                                                            /*{text: 'Cost', dataIndex: 'COST', width: 80,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Tax Value', dataIndex: 'TAXVALUE', width: 80,
                                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                                    metaData.style = 'text-align :right;';
                                                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                                                }
                                                                                            },
                                                                                            {text: 'Curr Tax', width: 60, dataIndex: 'TAXCURR'}*/
                                                                                            {
                                                                                                xtype: 'actioncolumn',
                                                                                                width: 40,
                                                                                                //id: 'dltemd',
                                                                                                id:prototype.idRfnd+'-det-panelGridEMD-delete',
                                                                                                menuDisabled: true,
                                                                                                sortable: false,
                                                                                                items: [
                                                                                                    {
                                                                                                        iconCls: 'prx-icon-image-trash',
                                                                                                        handler: 'onRemoveCouponClickEmd'
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                        // </editor-fold
                                                ]
                                                },
                                                // PANEL 3_5 Other
                                                {
                                                    xtype: 'fieldset',
                                                    title: '<b  style="font-size:12px">Other<b/>',
                                                    bodyStyle: 'background: #E5ECEF',
                                                    margin: '1 5 0 5',
                                                    width: 240,
                                                    height: 260,
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
                                                                                    width: 35
                                                                                },
                                                                                {
                                                                                    text: 'Amount',
                                                                                    width: 75
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
                                                                                    text: 'Fare:'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idRfnd + '-det-lblFARE2Cur',
                                                                                    width: 30
                                                                                },
                                                                                {
                                                                                    width: 5
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    readOnly: true,
                                                                                    id: prototype.idRfnd + '-det-lblFARE2',
                                                                                    width: 70,
                                                                                    fieldStyle: 'text-align:right;'
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
                                                    text: '<strong style="color:white;">Farecalc<strong>',
                                                    id: prototype.idRfnd + '-det-btnFareCalc',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onFareCalc'
                                                    }
                                                },
                                                {
                                                    text: '<strong style="color:white;">Delivery<strong>',
                                                    id: prototype.idRfnd + '-det-btnDeliveryTKT',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onDelivery'
                                                    }
                                                },
                                                {
                                                    text: '<strong style="color:white;">Facsimil<strong>',
                                                    id: prototype.idRfnd + '-det-btnFacsimilTKT',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onFacsimil'
                                                    }
                                                },
                                                {
                                                    text: '<strong style="color:white;">Prorate<strong>',
                                                    id: prototype.idRfnd + '-det-btnProrrateTKT',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onProrrate'
                                                    }
                                                }/*,
                                                {
                                                    text: '<strong style="color:white;">Taxes-TUAS<strong>',
                                                    id: prototype.idRfnd + '-det-btnTUAS',
                                                    cls: 'x-btn-sent',
                                                    overCls: 'x-btn-sent-over',
                                                    listeners: {
                                                        click: 'onTaxes'
                                                    }
                                                }*/
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Tab Prorrateo">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    id: prototype.idRfnd + '-det-tabProrrateo',
                                    title: 'Prorate',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.idRfnd + '-contenedor-form',
                                            width: 1446,
                                            height: 740,
                                            items: [
                                                {
                                                    xtype: 'prorrate',
                                                    id: prototype.idRfnd + '-widget-prorrate'
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
        }
    ]
});

