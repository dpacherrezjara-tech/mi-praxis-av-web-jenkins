/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPProcesarForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-controlUATPProcesarController',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATP.ControlUATPProcesarController'
    ],
    title: 'Procesar',
    header: true,
    width: 550,
    height: 200,
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
            id: prototype.id02 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id02 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            width: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: prototype.id02 + '-op01',
                                    name:prototype.id02 + '-op',
                                    boxLabel: 'CARGA UATP',
                                    margin: '2 2 2 10',
                                    checked: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FECHA1',
                                    fieldLabel: 'Desde', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                    width: 180, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value:new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id02 + '-FECHA2').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FECHA2',
                                    fieldLabel: 'Hasta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 160, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value:new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                //Ext.getCmp(prototype.id + '-btn-save').focus();
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
                    id: prototype.id02 + '-form02',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            width: 150,
                            items: [{
                                    xtype: 'radiofield',
                                    id: prototype.id02 + '-op02',
                                    name:prototype.id02 + '-op',
                                    boxLabel: 'REPORTE DE VENTA',
                                    margin: '2 2 2 10'
                                }]

                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FECHEJE01',
                                    fieldLabel: 'Emisión', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                    width: 180, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value:new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id + '-FECHA2').focus();
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
                    id: prototype.id02 + '-form03',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            width: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: prototype.id02 + '-op03',
                                    name:prototype.id02 + '-op',
                                    boxLabel: 'ESTADO DE CUENTA',
                                    margin: '2 2 2 10'
                                }]

                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FECHEJE02',
                                    fieldLabel: 'Emisión', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                    width: 180, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value:new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id + '-FECHA2').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype:'label',
                    padding:'0 0 0 5',
                    html: '<font color="green"><h3 id="ControlUATPProcesarForm_Msg"></h3></font>'                    
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
                    text: 'Ejecutar',
                    id: prototype.id02 + '-btn-save',
                    iconCls: 'prx-icon-processing',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id02 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
