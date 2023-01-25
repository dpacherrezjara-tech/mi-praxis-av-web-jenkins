/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//AplPayment-dataEntryController

Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.AplPaymentBoletoEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-AplPaymentBoletoEntry',
    controller: prototype.id + '-aplPaymentBoletoEntryController',
    requires: [
        'Ext.Praxis.controller.eecta.AplPayment.AplPaymentBoletoEntryController',
        'Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAplPaymentBoleto'
    ],
    title: 'Detalle de reporte',
    header: true,
    width: 910,
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
            id: prototype.id + '-DataEntry-AplPaymentBoletoEntry',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-total_sel',
                            fieldLabel: 'Total Seleccionado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            width: 225, value: '0.00', fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-FILTER01',
                            fieldLabel: 'Filtrar Boleto', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                            enableKeyEvents: true,
                            width: 170,
                            value: '139',
                            enforceMaxLength: true,
                            maxLength: 3,
                            height: 24,
                            listeners: {
                                keypress: 'onTxtFilterKeypress01'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-FILTER02',
                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                            enableKeyEvents: true,
                            padding: '0 0 0 2',
                            width: 90,
                            enforceMaxLength: true,
                            maxLength: 10,
                            height: 24,
                            listeners: {
                                keypress: 'onTxtFilterKeypress01'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-FILTER03',
                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                            enableKeyEvents: true,
                            width: 30,
                            value: '00',
                            height: 24,
                            padding: '0 0 0 2',
                            enforceMaxLength: true,
                            maxLength: 2,
                            listeners: {
                                keypress: 'onTxtFilterKeypress01'
                            }
                        }
                    ]
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="grid">
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-infoGridAplPaymentBoleto',
                    width: 900,
                    layout: 'fit',
                    items: [{
                            xtype: prototype.id + '-infoGridAplPaymentBoleto'
                        }
                    ]
                            // </editor-fold>
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3958NRRPT',
                            fieldLabel: 'Nº Reporte', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            width: 225,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 50,
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-A3953CIUDA').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3958CDCLI',
                            fieldLabel: 'Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            labelWidth: 70,
                            readOnly: true,
                            width: 160
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3953RSOCI',
                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 10,
                            width: 350,
                            readOnly: true,
                            //enableKeyEvents: true,
                            //enforceMaxLength: true,
                            padding: '0 0 0 2',
                            //maxLength: 150,
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-A3953NCOME').focus();
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
                            id: prototype.id + '-A3959REFPG',
                            fieldLabel: 'Ref. Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            width: 475,
                            readOnly: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 160,
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-A3953RFC').focus();
                                    }
                                }
                            }
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
                            fieldLabel: 'Banco', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            id: prototype.id + '-A3959BANCO',
                            width: 225,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 15,
                            listeners: {
                                change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-A3953TELE1').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cta. Bancaria ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            id: prototype.id + '-A3959CTABC',
                            width: 250,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 15,
                            listeners: {
                                change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-A3953TELE1').focus();
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
                            id: prototype.id + '-A3959TOTPG',
                            fieldLabel: 'Importe de pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            width: 225, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                            value: '0.00',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[1234567890\.]/,
                            listeners: {
                                focus: 'onFocusNumberfield',
                                focusleave: 'onfocusleaveNumberfield',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        Ext.getCmp(prototype.id + '-A3959FECPG').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3959MDAPG',
                            fieldLabel: 'Moneda', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                            width: 110,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            readOnly: true,
                            //maskRe: /[1234567890\+-]/,
                            listeners: {
                                change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
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
                                    xtype: 'datefield',
                                    id: prototype.id + '-A3959FECPG',
                                    fieldLabel: 'Fech Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                    width: 210, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id + '-btn-save').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            //margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-TICKET_NC',
                                    fieldLabel: 'Boleto NC', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 90,
                                    width: 215, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    maskRe: /[0-9/]/,
                                    //editable: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id + '-btn-save').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '0 0 0 0',
                            layout: {
                                pack: 'center'
                            },
                            fieldStyle: 'text-align:center',
                            defaults: {
                                scale: 'small'
                            },
                            items: [                             
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-consulta-TKT-NC',
                                    title: 'Buscar',
                                    icon: 'resources/img/botones/search.png',
                                    hidden: true,
                                    listeners: {
                                        click: ''
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Aplicar Pago',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-check',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    hidden: true,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});
