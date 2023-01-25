/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPErroresForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id04 + '-dataEntry',
    controller: prototype.id04 + '-controlUATPErroresController',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATP.ControlUATPErroresController',
        'Ext.Praxis.view.eecta.ControlUATPForm.Info03'
    ],
    title: 'Errores de carga UATP',
    header: true,
    width: 800,
    height: 480,
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
            id: prototype.id04 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id04 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id04 + '-FECHA1',
                                    fieldLabel: 'Del', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd', margin: '5 0 0 0',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
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
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id04 + '-FECHA2',
                                    fieldLabel: 'Al', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd', margin: '5 0 0 0',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
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
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id04 + '-STSERR',margin: '5 0 0 0',
                                    fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Todos"],
                                            ["0", "Sin Corregir"],
                                            ["1", "Corregido"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true, caseSensitive: false,
                                    editable: true,typeAhead: true,
                                    valueField: 'code', displayField: 'name',width: 180, 
                                    value: "",
                                    enableKeyEvents: true,
                                    padding: '0 0',
                                    listeners: {
                                        change: 'cmbfiltroSTSUUID_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '1 0 0 20',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '1 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            ui: 'footer',
                                            margin: '2 0 2 15',
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
                                                    id: prototype.id04 + '-btn-search',
                                                    text: 'Consultar',
                                                    icon: 'resources/img/botones/search.png',
                                                    listeners: {
                                                        click: 'Onsearch'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id04 + '-btn-sum_error',
                                                    text: 'Resumen',
                                                    disabled:true,
                                                    icon: 'resources/img/botones/panel.png',
                                                    listeners: {
                                                        click: 'onFormSummaryErrClick'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id04 + '-panel-contenedor-grid',
                    layout: 'fit',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: prototype.id04 + '-info03'
                        }
                        // </editor-fold>                                                 
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
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
