/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CatalogoClienteForm.CatalogoClienteContrato', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-dataEntryContratoController',
    requires: [
        'Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteContratoController',
        'Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridContrato'
    ],
    title: 'Mantenimiento Contrato',
    header: true,
    width: 630,
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
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 1 1 1',
                    width: 190,
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            border: false,
                            id: prototype.id02 + '-contenedor-grid-contrato',
                            items: [
                                {
                                    xtype: prototype.id02 + '-info-contrato'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 420,
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
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007CDCLI',
                                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100,
                                            readOnly: true,
                                            width: 180
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 2 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3953RSOCI',
                                            fieldLabel: 'Razón Social', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 400, readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A3953NCOME').focus();
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
                            width: '100%',
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
                                            id: prototype.id02 + '-A4007CONTR',
                                            fieldLabel: 'Contrato', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100,
                                            //readOnly: true,
                                            width: 245
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
                                            id: prototype.id02 + '-A4007DESCR',
                                            fieldLabel: 'Descripción', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 380, //readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
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
                                            xtype: 'combo',
                                            id: prototype.id02 + '-A4007TCTR',
                                            fieldLabel: 'Tipo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 200,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["O", "ORGINAL"],
                                                    ["E", "EXTENCION"]
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
                                            value: "O",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }//   
                                        }                                        
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    //margin: '1 1 1 1',
                                    margin: '1 0 2 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id02 + '-A4007FALTA',
                                            fieldLabel: 'Fecha Alta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 220,
                                            format: 'Ymd',
                                            //formatText: '',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ',                                            
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id02 + '-A4007FBAJA',
                                            fieldLabel: 'Baja', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 120,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '0 0 0 2 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
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
                                    margin: '1 0 2 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007REGIS',labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Creado por</strong>',
                                            labelWidth: 78,value:'',
                                            //labelTextAlign: 'right',
                                            //margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 180
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007FREGI',labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                            labelWidth: 40,value:'',
                                            labelTextAlign: 'center',
                                            //margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007HREGI',labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;"> Hora</strong>',
                                            labelWidth: 35,value:'',
                                            labelTextAlign: 'center',
                                            //margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 90
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 2 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007REVIS',labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Actualizado</strong>',
                                            labelWidth: 78,
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            //margin: '0 10 0 0',
                                            width: 180
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007FREVI',labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                            labelWidth: 40,
                                            labelTextAlign: 'center',
                                            readOnly: true,
                                            //margin: '0 10 0 0',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A4007HREVI',labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Hora</strong>',
                                            labelWidth: 35,
                                            labelTextAlign: 'center',
                                            readOnly: true,
                                            //margin: '0 10 0 0',
                                            width: 90
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
            border: true,
            ui: 'footer',
            margin: '5 5 10 10', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'New',
                    id: prototype.id02 + '-btn-new',
                    iconCls: 'prx-icon-add',
                    listeners: {
                        click: 'onNewClick_id02'
                    }
                },
                {
                    text: 'Save',
                    id: prototype.id02 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick_id02'
                    }
                },
                {
                    text: 'Edit',
                    id: prototype.id02 + '-btn-edit',
                    iconCls: 'prx-icon-edit',
                    listeners: {
                        click: 'onEditClick_id02'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id02 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick_id02'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id02 + '-btn-delete',
                    iconCls: 'prx-icon-delete',                    
                    listeners: {
                        click: 'onDeleteClick_id02'
                    }
                },                
                {
                    text: 'Cancelar',
                    id: prototype.id02 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick_id02'
                    }
                }
//                {
//                    xtype: 'label',
//                    labelAlign: 'center',
//                    width: 150,
//                    padding: '2px 5px 2px 3px',
//                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'
//
//                }
            ]
        }
    ]
});
