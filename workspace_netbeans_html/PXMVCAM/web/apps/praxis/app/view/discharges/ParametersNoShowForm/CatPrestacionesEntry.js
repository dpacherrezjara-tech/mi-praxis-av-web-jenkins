/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.CatPrestacionesEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.discharges.ParametersNoShow.CatPrestacionesEntryController',
        'Ext.Praxis.view.discharges.ParametersNoShowForm.InfoGridPrestaciones'
    ],
    title: 'Catalogo Pseudo City Code',
    header: true,
    width: 500,
    height: 320,
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
                    layout: 'hbox',
                    border: false,
                    margin: '3 3 3 3',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-grid-excel01',
                            layout: 'fit',
                            width: 200,
                            height: 220,
                            items: [
                                {
                                    xtype: prototype.id02 + '-infoGrid'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            title: 'Detalles',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3975KEY1',
                                            fieldLabel: 'Codigo', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80,
                                            width: 150,readOnly:true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            listeners: {
                                                change: 'onUpperValue',
                                                //focusleave: 'fn_completar_cia',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069CIA').focus();
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
                                            id: prototype.id02 + '-A3975KEY2',
                                            fieldLabel: 'PPC', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80,
                                            width: 150,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            listeners: {
                                                change: 'onUpperValue',
                                                //focusleave: 'fn_completar_cia',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069CIA').focus();
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
                                            id: prototype.id02 + '-A3975DESC1',
                                            fieldLabel: 'Descripcion', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80,
                                            width: 250,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                change: 'onUpperValue',
                                                //focusleave: 'fn_completar_cia',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id01 + '-A4069CIA').focus();
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
                                            id: prototype.id02 + '-A3975STATU',
                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                            width: 180,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["A", "ACTIVO"],
                                                    ["D", "DESACTIVO"]
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
                                            value: "A",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }// 
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    labelWidth: 125,
                                    text: 'Control data ',
                                    labelAlign: 'left',
                                    style: 'font-weight:bold;'
                                    //margin: '22 0 0 26'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3975REGIS',
                                            fieldLabel: 'Creado por',
                                            labelStyle: 'font-weight: bold;',
                                            labelWidth: 80,
                                            labelTextAlign: 'right',
                                            labelAlign: 'right',
                                            margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 180
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
                                            id: prototype.id02 + '-A3975FREGI',
                                            fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                            labelWidth: 80,labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3975HREGI',
                                            fieldLabel: '<strong style="color:#000;"> Hora</strong>',
                                            labelWidth: 35,labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            margin: '0 10 0 0',
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
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3975REVIS',
                                            fieldLabel: '<strong style="color:#000;">Actualizado</strong>',
                                            labelWidth: 80,labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            margin: '0 10 0 0',
                                            width: 180
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
                                            id: prototype.id02 + '-A3975FREVI',
                                            fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                            labelWidth: 80,labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            margin: '0 10 0 0',
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3975HREVI',
                                            fieldLabel: '<strong style="color:#000;">Hora</strong>',
                                            labelWidth: 35,labelAlign: 'right',
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            margin: '0 10 0 0',
                                            width: 100
                                        }
                                    ]
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
            border: false,
            ui: 'footer',
            margin: '5 5 7 7', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Grabar',
                    id: prototype.id02 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick01'
                    } 
                },
                
                {
                    text: 'Update',
                    id: prototype.id02 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick01'
                    } 
                },
                {
                    text: 'Nuevo',
                    id: prototype.id02 + '-btn-new',
                    iconCls: 'prx-icon-image-file',
                    listeners: {
                        click: 'onNewClick01'
                    } 
                },
                {
                    text: 'Cancelar',
                    id: prototype.id02 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick01'
                    }
                }
            ]
        }
    ]
});




