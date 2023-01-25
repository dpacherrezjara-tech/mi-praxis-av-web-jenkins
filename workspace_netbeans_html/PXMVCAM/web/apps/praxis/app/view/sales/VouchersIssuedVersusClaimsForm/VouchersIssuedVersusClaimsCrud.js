/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.VouchersIssuedVersusClaimsForm.VouchersIssuedVersusClaimsCrud', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id01 + '-dataEntry',
    controller: prototype.id01 + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.VouchersIssuedVersusClaims.VouchersIssuedVersusClaimsCrudController',
        'Ext.Praxis.view.sales.VouchersIssuedVersusClaimsForm.Info01'
    ],
    title: 'Vouchers Issued Versus Claims',
    header: true,
    width: 750,
    height: 520,
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
                            width: 350,
                            margin: '2 2 2 2',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Issued Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            id: prototype.id01 + '-A4213FECVT', fieldStyle: 'text-align:center;font-size:13px;',
                                            width: 220, height: 26,
                                            format: 'Ymd', value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '5 0 0 0 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213TKTVO').focus();
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
                                            id: prototype.id01 + '-A4213TKTVO-CIA',
                                            fieldLabel: 'Travel Voucher Nbr.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 165, height: 26, value: '139', fieldStyle: 'text-align:center;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213TKTVO').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213TKTVO-FORMA',
                                            fieldLabel: '', labelAlign: 'right', labelSeparator: ' ',
                                            labelStyle: 'font-weight: bold;',
                                            fieldStyle: 'text-align:center;font-size:13px;',
                                            labelWidth: 5, padding: '0 0 0 2',
                                            width: 45, height: 26,disabled:true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 4, value:'0425',
                                            maskRe: /[1234567890\+-]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                //focusleave: 'fn_completar_cia',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213TKTVO').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213TKTVO',
                                            fieldLabel: '', labelAlign: 'right', labelSeparator: ' ',
                                            labelStyle: 'font-weight: bold;',
                                            fieldStyle: 'text-align:center;font-size:13px;',
                                            labelWidth: 5, padding: '0 0 0 2',
                                            width: 80, height: 26,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            maskRe: /[1234567890\+-]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                //focusleave: 'fn_completar_cia',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213AMOUN').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213SEQVO',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213ITEMC',
                                            hidden: true
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
                                            id: prototype.id01 + '-A4213AMOUN',
                                            width: 200, height: 26,
                                            fieldLabel: 'Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            value: '0.00',
                                            fieldStyle: 'text-align:right;font-size:13px;',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213MONED').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213MONED',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            width: 50, height: 26, labelSeparator: ' ', value: '', fieldStyle: 'text-align:center;font-size:13px;',
                                            enableKeyEvents: true,
                                            padding: '0 0 0 2',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[a-z,A-Z]/,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213AGENT').focus();
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
                                            id: prototype.id01 + '-A4213AGENT',
                                            fieldLabel: 'Agent', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 250, height: 26, fieldStyle: 'text-align:left;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            // maskRe: /[1234567890\+-]/,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213TICKET').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]

                                }

                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="auditoria">
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: '98%',
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '2 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213USRIN',
                                            fieldLabel: '<strong style="color:#000;">Created by</strong>',
                                            labelWidth: 100, labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            margin: '2 2 0 0',
                                            readOnly: true,
                                            width: 200
                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '0 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213FECIN',
                                            fieldLabel: '<strong style="color:#000;">Date</strong>',
                                            labelWidth: 100, labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            margin: '2 2 0 0',
                                            readOnly: true,
                                            width: 200
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213HORIN',
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
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 0 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id01 + '-A4213USRAC',
                                                    fieldLabel: '<strong style="color:#000;">Modified by</strong>',
                                                    labelWidth: 100, labelAlign: 'right',
                                                    labelTextAlign: 'right',
                                                    readOnly: true,
                                                    margin: '0 0 0 0',
                                                    width: 200
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213FECAC',
                                            fieldLabel: '<strong style="color:#000;">Date</strong>',
                                            labelWidth: 100, labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            margin: '0 0 0 0',
                                            width: 200
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213HORAC',
                                            fieldLabel: '<strong style="color:#000;">Time</strong>',
                                            labelWidth: 35, labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            margin: '0 0 0 0',
                                            width: 100
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
                    layout: 'vbox',
                    margin: '3 3 3 3',
                    title: 'Ticket/Ancillaries',
                    border: false,
                    width: '98%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 0 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213TICKET-CIA',
                                            fieldLabel: 'Ticket Nbr.:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 90,
                                            width: 130, height: 26, value: '139', fieldStyle: 'text-align:center;font-size:13px;',
                                            enableKeyEvents: true, margin: '1 0 0 0',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213TICKET').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213TICKET',
                                            fieldLabel: '', padding: '0 0 0 2', labelSeparator: ' ',
                                            labelStyle: 'font-weight: bold;',
                                            fieldStyle: 'text-align:center;font-size:13px;',
                                            labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            margin: '1 0 0 0',
                                            width: 120, height: 26,
                                            maskRe: /[1234567890\+-]/,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213CUPON').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id01 + '-A4213CUPON',
                                            fieldLabel: 'Coupons',
                                            labelStyle: 'font-weight: bold;',
                                            fieldStyle: 'text-align:left;font-size:13px;',
                                            labelWidth: 70, labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            margin: '0 0 0 0',
                                            width: 190, height: 26,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 111,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-A4213FEMIS').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 0 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Issued Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 90, fieldStyle: 'text-align:left;font-size:13px;',
                                            id: prototype.id01 + '-A4213FEMIS',
                                            width: 180, height: 26,
                                            format: 'Ymd', value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '1 0 0 0 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id01 + '-btn-add').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    margin: '0 2 0 4',
                                    items: [{
                                            text: 'Add',
                                            id: prototype.id01 + '-btn-add',
                                            iconCls: 'prx-icon-add',
                                            listeners: {
                                                click: 'onClickAdd'
                                            }
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-panel-contenedor-grid',
                            height: 220,
                            width: '99%',
                            layout: 'fit',
                            margin: '8 0 0 0',
                            items: [
                                {
                                    xtype: prototype.id01 + '-info01'
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
