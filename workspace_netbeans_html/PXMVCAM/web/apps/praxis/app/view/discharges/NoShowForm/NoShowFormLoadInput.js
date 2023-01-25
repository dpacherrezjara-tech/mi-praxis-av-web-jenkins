/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.NoShowForm.NoShowFormLoadInput', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id07 + '-dataEntry',
    controller: prototype.id07 + '-noShowFormLoadInputController',
    requires: [
        'Ext.Praxis.controller.discharges.NoShow.NoShowFormLoadInputController'
    ],
    title: 'Cargar Insumo',
    header: true,
    width: 590,
    height: 150,
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
            id: prototype.id07 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id07 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    padding: '5 0 0 0 ',
                    items: [
                        {
                            xtype: 'filefield',
                            padding: '7 2 2 2',
                            id: prototype.id07 + '-file',
                            name: 'textfile',
                            labelAlign: 'right',
                            fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Input File</strong>',
                            allowBlank: false,
                            accept: '.xlsx, .xls, .txt',
                            labelWidth: 65,
                            width: 340,
                            //buttonText: 'Select logo...',
                            regex: /(.)+((\.xlsx)|(\.txt)(\w)?)$/i,
                            regexText: 'Only XLS,XLSX,TXT formats are accepted',
                            buttonConfig: {
                                text: 'Browse...',
                                width: 75,
                                glyph: 'xf3b6@Ionicons'
                            },
                            listeners: {
                                //change: 'onUploadChange'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id07 + '-FPROC',
                            fieldLabel: 'Fecha Insumo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 90,
                            width: 185,
                            height: 24,
                            format: 'Y/m/d',
                            value: new Date(),
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            padding: '5 2 2 2',
                            listeners: {
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {

                                    }
                                }
                            }
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
                    xtype: 'button',
                    id: prototype.id07 + '-btn-save',
                    text: 'Procesar',
                    icon: 'resources/img/botones/process.png',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id07 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick07'
                    }
                }
            ]
        }
    ]
});
