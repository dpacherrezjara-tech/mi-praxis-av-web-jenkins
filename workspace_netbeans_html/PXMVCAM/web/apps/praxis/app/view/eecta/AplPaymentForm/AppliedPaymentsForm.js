/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//AplPayment-dataEntryController

Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.AppliedPaymentsForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-AppliedPaymentsForm',
    controller: prototype.id + '-appliedPaymentsFormController',
    requires: [
        'Ext.Praxis.controller.eecta.AplPayment.AppliedPaymentsController',
        'Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAppliedPaymentCab',
        'Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAppliedPaymentDet'
    ],
    title: 'Detalle Aplicacion de pagos',
    header: true,
    width: 910,
    height: 600,
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
            id: prototype.id + '-DataEntry-AppliedPaymentsForm',
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
                            id: prototype.id + '-A3958NRRPT',
                            fieldLabel: 'Nº Reporte', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            width: 225,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
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
                            labelWidth: 70,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            readOnly: true,
                            width: 160
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3953RSOCI',
                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 10,
                            width: 350,fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
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
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3957INIPR',
                            fieldLabel: 'Periodo de', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,                            
                            width: 205,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A3957FINPR',
                            fieldLabel: 'Al ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,                            
                            width: 110, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',                            
                            readOnly: true
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3957TOT',
                                    fieldLabel: 'Total', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0.00',
                                    readOnly:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3957MDLOC',
                                    padding:'0 0 0 2',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 40, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',                                   
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3957TOTAP',
                                    fieldLabel: 'Pagos', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0.00',
                                    readOnly:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3957SALDP',
                                    fieldLabel: 'Saldo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0.00',
                                    readOnly:true
                                }
                            ]
                        }
                    ]
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="grid-cab">
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-infoGridAppliedPaymentCab',
                    width: 900,
                    layout: 'fit',
                    items: [{
                            xtype: prototype.id + '-infoGridAppliedPaymentCab'
                        }
                    ]
                            // </editor-fold>
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="grid-det">
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-infoGridAppliedPaymentDet',
                    width: 900,
                    layout: 'fit',
                    items: [{
                            xtype: prototype.id + '-infoGridAppliedPaymentDet'
                        }
                    ]
                            // </editor-fold>
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
                    text: 'Grabar',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-check',
                    hidden: true,
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
