/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetLog', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id06 + '-dataEntry',
    controller: prototype.id06 + '-noShowFormDetErrController',
    requires: [
        'Ext.Praxis.controller.discharges.NoShow.NoShowFormDetLogController',
        'Ext.Praxis.view.discharges.NoShowForm.InfoGridDetLog'
    ],
    title: 'Log determinacion CADUCO',
    width: 670,
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
            id: prototype.id06 + '-DataEntry-center',
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
                            width: 640,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-A3980FFILE',
                                    fieldLabel: 'Fecha', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 140, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-TICKET_NUMBER',
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
                                    id: prototype.id06 + '-SEQ',
                                    value: '00', labelWidth: 2,
                                    width: 30, fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                    readOnly: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id06 + '-STAT',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                    width: 120,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Todos"],
                                            ["A", "Aplica caduco"],
                                            ["N", "No aplica"],
                                            ["X", "Error XML"]
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
                                    margin: '2 2 2 10',
                                    fieldStyle: 'text-align:center',
                                    items: [
                                        {
                                            xtype: 'button',
                                            border: false,
                                            id: prototype.id06 + '-btn-buscar',
                                            text: '',
                                            icon: 'resources/img/botones/search.png',
                                            listeners: {
                                                click: 'onsearchClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id06 + '-btnTexto',
                                            icon: 'resources/img/botones/txt.png',
                                            tooltip: 'Exportar en formato texto',
                                            listeners: {
                                                click: 'ondoanlodTxtClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id06 + '-btnExcel',
                                            icon: 'resources/img/botones/excel.png',
                                            tooltip: 'Exportar en formato Excel',
                                            listeners: {
                                                click: 'ondoanlodExcelClick'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id06 + 'contenedor-grid',
                            layout: 'fit',
                            width: 650,
                            height: 520,
                            defaults: {
                                margin: '2 2 2 2',
                                border: false
                            },
                            items: [
                                {
                                    xtype: prototype.id06 + '-infoGridDetLog'
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
                    id: prototype.id06 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id06 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id06 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id06 + '-btn-cancel',
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
