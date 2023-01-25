/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.ParametersNoShowEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.discharges.ParametersNoShow.ParametersNoShowEntryController'
    ],
    title: 'Mantenimiento Parametros',
    header: true,
    width: 600,
    height: 380,
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
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 2 2 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: '100%',
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3931CPARM',
                                            fieldLabel: 'Código parametro', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            width: 245,
                                            allowBlank: false,
                                            invalidText: 'Ingrese código del parametro',
                                            //placeholder: 'xxx-xxxxxx',
                                            //inputMask: '', //ref: Ext.field.InputMask
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931DESCR').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 200,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:12px;">(*)</strong>'

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
                                            id: prototype.id + '-A3931DESCR',
                                            fieldLabel: 'Descripción', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 475,
                                            allowBlank: false,
                                            invalidText: 'Ingrese valor de la descripción',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931APLIC').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:12px;">(*)</strong>'

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
                                            xtype: 'combo',
                                            id: prototype.id + '-A3931APLIC',
                                            fieldLabel: 'Aplica', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 225,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["Y", "SI"],
                                                    ["N", "NO"]
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
                                            value: "Y",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }// 
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 200,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:12px;">(*)</strong>'

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
                                            fieldLabel: 'Orden', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            id: prototype.id + '-A3931ORDEN',
                                            width: 170,
                                            readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            //maxLength: 15,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            hidden: true,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:12px;">(Orden de validación)</strong>'

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
                                            id: prototype.id + '-A3931TIPO1',
                                            fieldLabel: 'Parametro 1', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 250,
                                            padding: '0 5 0 0',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["X", "NO APLICA"],
                                                    ["S", "ALFANUMERICO"],
                                                    ["D", "FECHA"],
                                                    ["N", "NUMERICO"],
                                                    ["I", "VALOR ENTERO"],
                                                    ["C", "CATALOGO"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            value: "S",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                change: 'cmb_tipo1_clickHandler'
                                            }// 
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3931PARM1',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                            width: 300,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 30,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931PARM2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        //INPUT:DATE
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-A3931PARM1_D',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                            width: 100,
                                            format: 'Ymd',
                                            invalidText: 'Ingrese fecha valida en formato Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            hidden: true,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931PARM2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        //INPUT:Numerico
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3931PARM1_N',
                                            width: 99,
                                            labelWidth: 0,
                                            value: '0.00',
                                            hidden: true,
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                //focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931PARM2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        //INPUT:Integer
                                        {
                                            xtype: 'numberfield',
                                            id: prototype.id + '-A3931PARM1_I',
                                            width: 80,
                                            labelWidth: 0,
                                            value: '0',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            decimalPrecision: 0,
                                            hidden: true,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                //focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931PARM2').focus();
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
//                                        {
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-A3931ARCHI',
                                            fieldLabel: 'Catálogos', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 450,
                                            padding: '0 5 0 0',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            typeAhead: true,
                                            hidden: true,
                                            valueField: 'A3968CATAL_2', displayField: 'A3968DESCR',
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                change: 'cmbCatalogo_clickHandler'
                                            }// 
                                        }
                                        , {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-ver-catalogo',
                                            text: 'Ver',
                                            hidden: true,
                                            icon: 'resources/img/botones/grid.png',
                                            listeners: {
                                                click: 'onbtnClick_verDetalle_catalogo'
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
                                            id: prototype.id + '-A3931TIPO2',
                                            fieldLabel: 'Parametro 2', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 250,
                                            padding: '0 5 0 0',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["X", "NO APLICA"],
                                                    ["S", "ALFANUMERICO"],
                                                    ["D", "FECHA"],
                                                    ["N", "NUMERICO"],
                                                    ["I", "VALOR ENTERO"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            value: "S",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                change: 'cmb_tipo2_clickHandler'
                                            }// 
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3931PARM2',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                            width: 300,
                                            padding: '0 6 0 0',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 30,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931ARCHI').focus();
                                                    }
                                                }
                                            }
                                        },
                                        //INPUT:DATE
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-A3931PARM2_D',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                            width: 100,
                                            format: 'Ymd',
                                            invalidText: 'Ingrese fecha valida en formato Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            hidden: true,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931ESTAD').focus();
                                                    }
                                                }
                                            }
                                        },
                                        //INPUT:Numerico
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3931PARM2_N',
                                            width: 99,
                                            labelWidth: 0,
                                            value: '0.00',
                                            hidden: true,
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                //focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931ESTAD').focus();
                                                    }
                                                }
                                            }
                                        },
                                        //INPUT:Integer
                                        {
                                            xtype: 'numberfield',
                                            id: prototype.id + '-A3931PARM2_I',
                                            width: 80,
                                            labelWidth: 0,
                                            value: '0',
                                            fieldStyle: 'text-align:right',
                                            enableKeyEvents: true,
                                            decimalPrecision: 0,
                                            hidden: true,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                //focusleave: '',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A3931ESTAD').focus();
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
                                            id: prototype.id + '-A3931ESTAD',
                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 225,
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
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',                    
                    width: '100%',
                    margin: '5 5 0 5',
                    defaults: {
                        border: false
                    },
                    border: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 5 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3931USRIN',
                                    fieldLabel: '<strong style="color:#000;">Creado por</strong>',
                                    labelWidth: 78,
                                    labelTextAlign: 'right',
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3931FECIN',
                                    fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                    labelWidth: 40,
                                    labelTextAlign: 'right',
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 130
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3931HORIN',
                                    fieldLabel: '<strong style="color:#000;"> Hora</strong>',
                                    labelWidth: 35,
                                    labelTextAlign: 'right',
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3931USRAC',
                                    fieldLabel: '<strong style="color:#000;">Actualizado</strong>',
                                    labelWidth: 78,
                                    labelTextAlign: 'right',
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3931FECAC',
                                    fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                    labelWidth: 40,
                                    labelTextAlign: 'right',
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 130
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A3931HORAC',
                                    fieldLabel: '<strong style="color:#000;">Hora</strong>',
                                    labelWidth: 35,
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
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
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
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});


