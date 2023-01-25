/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.RegistroVentaOALForm.RegistroVentaOALCrud', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id01 + '-dataEntry',
    controller: prototype.id01 + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.eecta.RegistroVentaOAL.RegistroVentaOALCrudController',
        'Ext.Praxis.view.eecta.RegistroVentaOALForm.Info01'
    ],
    title: 'Registro VENTA OAL',
    header: true,
    width: 700,
    height: 620,
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
            id: prototype.id01 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="Main">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 2 2 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 450,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069TKTOR',
                                            fieldLabel: 'Ticket Number', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            width: 245,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            listeners: {
                                                change: 'onUpperValue',
                                                focusleave: 'fn_completar_cia',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069CIA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069CIA',
                                            fieldLabel: 'Airline Code', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 160,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069FEVTA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-INTERNAL-NUMBER',
                                            fieldLabel: 'Internal Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 245, readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069FEVTA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Date of issue', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            id: prototype.id01 + '-A4069FEVTA',
                                            width: 220,
                                            format: 'Ymd', value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding: '6 0 0 10 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069IATA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069IATA',
                                            fieldLabel: 'Agent', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 200,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            maskRe: /[1234567890\+-]/,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069TRNCU').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {

                                            xtype: 'combo',
                                            id: prototype.id01 + '-A4069TRNCU',
                                            fieldLabel: 'Transaction', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["SALE", "VENTA"],
                                                    ["EXCH", "CANJE"],
                                                    ["RFND", "REEMBOLSO"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 220,
                                            value: "SALE",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '0 0',
                                            listeners: {
                                                //focus: function(combo) {
                                                //    combo.expand();
                                                //},
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069GRUPO',
                                            fieldLabel: 'Internal Group', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 200, readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069SERV').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id01 + '-A4069SERV',
                                            fieldLabel: 'Service Type', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    //["", "ALL"],
                                                    ["OA", "OAL"],
                                                    ["HO", "HOSPEDAJE"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 220,
                                            value: "OA",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '0 0',
                                            listeners: {
                                                //focus: function(combo) {
                                                //    combo.expand();
                                                //},
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelWidth: 125,
                                            text: 'Passenger Name: ',
                                            labelAlign: 'right',
                                            style: 'font-weight:bold;',
                                            margin: '22 0 0 26'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069PAX1',
                                            fieldLabel: 'Surnames', labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 150, labelSeparator: ' ',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 45,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069PAX2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069PAX2',
                                            fieldLabel: 'Given Names', labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 150, labelSeparator: ' ',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            margin: '0 0 0 5',
                                            maxLength: 45,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069FARE').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Importes">
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: '98%',
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069FARE',
                                            width: 150,
                                            fieldLabel: 'FARE', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069MDLOC').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069MDLOC',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            width: 50, labelSeparator: ' ', value: '', fieldStyle: 'text-align:center',
                                            enableKeyEvents: true,
                                            padding: '0 0 0 2',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[a-z,A-Z]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069IVA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069IVA',
                                            width: 150,
                                            fieldLabel: 'IVA', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069IVAP').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069IVAP',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            width: 40, labelSeparator: ' ', value: '16', fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            padding: '0 0 0 2',
                                            enforceMaxLength: true,
                                            maskRe: /[16\8\%]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069TUA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelWidth: 125,
                                            text: '%',
                                            labelAlign: 'right',
                                            style: 'font-weight:bold;',
                                            margin: '5 0 0 5'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069TUA',
                                            width: 150,
                                            fieldLabel: 'TUA', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069YQ').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069YQ',
                                            width: 150,
                                            fieldLabel: 'YQ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069YR').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069YR',
                                            width: 150,
                                            fieldLabel: 'YR', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069OTR').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069OTR',
                                            width: 150,
                                            fieldLabel: 'OTHER', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069TOTAL').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069TOTAL',
                                            width: 150,
                                            fieldLabel: 'TOTAL', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069TOTAL').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="GridData">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 3 3 3',
                    border:false,
                    width: 605,
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-panel-contenedor-grid',
                            height: 130,
                            width: '99%',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: prototype.id01 + '-info01'
                                }
                            ]
                        }

                    ]
                }, // </editor-fold>                  
                // <editor-fold defaultstate="collapsed" desc="Marchant/Contabilidad">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 2 2 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 350,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069MERNB',
                                            width: 180,
                                            fieldLabel: 'Merchant Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            maxLength: 10,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069MERNM',
                                            width: 320,
                                            fieldLabel: 'Merchant Name', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            maxLength: 150,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069ACCNB').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069ACCNM',
                                            width: 320,
                                            fieldLabel: 'Account Name', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            maxLength: 100,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069ACCNB').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069ACCNB',
                                            width: 200,
                                            fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            maxLength: 10,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069CRDNB').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069CRDNB',
                                            width: 250,
                                            fieldLabel: 'Card Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            maxLength: 19,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069TTARJ').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069TTARJ',
                                            width: 150,
                                            fieldLabel: 'FOP', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            maxLength: 2, value:'TP',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069NTARJ').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069NTARJ',
                                            width: 50,
                                            fieldLabel: ' ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            maxLength: 6,
                                            fieldStyle: 'text-align:left', labelSeparator: ' ',
                                            enableKeyEvents: true,
                                            padding: '0 0 0 2',
                                            enforceMaxLength: true,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4069NTARJ2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069NTARJ1',
                                            width: 60,
                                            fieldLabel: '', labelAlign: 'center', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            maxLength: 19, value:'XXXXX',
                                            fieldStyle: 'text-align:left', labelSeparator: ' ',
                                            enableKeyEvents: true,
                                            padding: '0 0 0 2',
                                            enforceMaxLength: true,
                                            readOnly:true,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069TOTAL').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069NTARJ2',
                                            width: 40,
                                            fieldLabel: ' ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            maxLength: 4,
                                            fieldStyle: 'text-align:left', labelSeparator: ' ',
                                            enableKeyEvents: true,
                                            padding: '0 0 0 2',
                                            enforceMaxLength: true,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069TOTAL').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: '98%',
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069IDCON',
                                            width: 300,
                                            fieldLabel: 'Id Praxis', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            readOnly: true,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069FCONT',
                                            width: 180, readOnly: true,
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            //value: '0.00',
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {

                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069PCONT',
                                            width: 120,
                                            fieldLabel: 'Period', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                            readOnly: true,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                //INVOICE
                                {
                                    xtype: 'label',
                                    labelWidth: 125,
                                    text: 'Invoice: ',
                                    labelAlign: 'right',
                                    style: 'font-weight:bold;',
                                    margin: '2 0 0 2'
                                },
                                {

                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069CFDI',
                                    width: 300, margin: '1 0 1 0',
                                    fieldLabel: 'UUID', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                    readOnly: true,
                                    fieldStyle: 'text-align:left',
                                    enableKeyEvents: true,
                                    //padding: '2px 5px 2px 3px',
                                    //maskRe: /[1234567890\.]/,
                                    listeners: {
                                        //focus: 'onFocusNumberfield',
                                        // focusleave: '',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069FOP',
                                            width: 110, margin: '1 0 1 0',
                                            fieldLabel: 'FOP', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            readOnly: true,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069MPG',
                                            width: 110, margin: '1 0 1 0',
                                            fieldLabel: 'Method', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                            readOnly: true,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069RFC',
                                            width: 150, margin: '1 0 1 0',
                                            fieldLabel: 'RFC', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            readOnly: true,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4069FECTB',
                                            width: 140, margin: '1 0 1 0',
                                            fieldLabel: 'F. Factura', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            readOnly: true,
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            //padding: '2px 5px 2px 3px',
                                            //maskRe: /[1234567890\.]/,
                                            listeners: {
                                                //focus: 'onFocusNumberfield',
                                                // focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069MERNM').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="auditoria">
                {
                    xtype: 'panel',
                    width: '100%',
                    margin: '1 1 1 1',
                    defaults: {
                        border: false
                    },
                    border: true,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '1 0 1 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069REGIS',
                                    fieldLabel: '<strong style="color:#000;">Created by</strong>',
                                    labelWidth: 78, labelAlign: 'right',
                                    labelTextAlign: 'right',
                                    margin: '2 2 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069FREGI',
                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                    labelWidth: 40, labelAlign: 'right',
                                    labelTextAlign: 'right',
                                    margin: '2 2 0 0',
                                    readOnly: true,
                                    width: 130
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069HREGI',
                                    fieldLabel: '<strong style="color:#000;"> Time</strong>',
                                    labelWidth: 35, labelAlign: 'right',
                                    labelTextAlign: 'right',
                                    margin: '2 2 0 0',
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 2 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069REVIS',
                                    fieldLabel: '<strong style="color:#000;">Modified by</strong>',
                                    labelWidth: 78, labelAlign: 'right',
                                    labelTextAlign: 'right',
                                    readOnly: true,
                                    margin: '0 2 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069FREVI',
                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                    labelWidth: 40, labelAlign: 'right',
                                    labelTextAlign: 'right',
                                    readOnly: true,
                                    margin: '0 2 0 0',
                                    width: 130
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-A4069HREVI',
                                    fieldLabel: '<strong style="color:#000;">Time</strong>',
                                    labelWidth: 35, labelAlign: 'right',
                                    labelTextAlign: 'right',
                                    readOnly: true,
                                    margin: '0 2 0 0',
                                    width: 100
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '5 5 10 10', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id01 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id01 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id01 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});
