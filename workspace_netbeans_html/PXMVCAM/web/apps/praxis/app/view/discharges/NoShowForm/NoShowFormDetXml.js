/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetXml', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-noShowFormDetXmlController',
    requires: [
        'Ext.Praxis.controller.discharges.NoShow.NoShowFormDetXmlController',
        'Ext.Praxis.view.discharges.NoShowForm.InfoGridDetXml'
    ],
    title: 'XML sabre',
    width: 650,
    height: 630,
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
                    layout: 'vbox',
                    border: false,
                    margin: '3 3 3 3',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '1 0 1 0',
                            border: true,
                            width: 620,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id02 + '-A3933FPROC',
                                    fieldLabel: 'Fecha', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 140, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id02 + '-TICKET_NUMBER',
                                    fieldLabel: 'Filtrar', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                    emptyText: 'Ingrese ticket...',
                                    width: 210, fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                    readOnly: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 13,                                                                        
                                    maskRe: /[0-9]/,                                     
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id02 + '-SEQ',                                    
                                    value:'00',labelWidth: 2,
                                    width: 30, fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                    readOnly: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,                                                                        
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id02 + '-STAT',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 1,
                                    width: 100,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "TODOS"],
                                            ["00", "SUCCESS OK"],
                                            ["XX", "ERRORES"]
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
                                    value: "",
                                    enableKeyEvents: true,
                                    listeners: {                                        
                                        change: 'cmbfiltroSTAT_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'toolbar',
                                    //dock: 'bottom',
                                    //ui: 'footer',
                                    margin: '2 2 2 10',
//                                    layout: {
//                                        pack: 'center'
//                                    },
                                    fieldStyle: 'text-align:center',
//                                    defaults: {
//                                        scale: 'small'
//                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            border:false,
                                            id: prototype.id + '-btn-buscar',
                                            text: '',
                                            icon: 'resources/img/botones/search.png',
                                            //disabled: true,
                                            listeners: {
                                                click: 'onsearchClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border:false,
                                            id: prototype.id + '-btn-donwlod',                                            
                                            icon: 'resources/img/botones/excel.png',                                            
                                            listeners: {
                                                click: 'onDonwloadExcelClick'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id02 + 'contenedor-grid',
                            layout: 'fit',
                            width: 650,
                            height: 520,                            
                            defaults: {
                                margin: '2 2 2 2',
                                border:false
                            },
                            items: [
                                {
                                    xtype: prototype.id02 + '-infoGridDetXml'
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
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id02 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id02 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id02 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id02 + '-btn-cancel',
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
