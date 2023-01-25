/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.MassiveRefunduatpFormSubiArchivo',
    controller: 'MassiveRefunduatpFormSubiArchivoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormSubiArchivoController'
    ],
    title: 'UPLOAD FILE',
    header: true,
    id: prototype.idMassiveRefunduatpFormSubiArchivo + '-win',
    height: 200,
    width: 420,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idMassiveRefunduatpFormSubiArchivo + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.idMassiveRefunduatpFormSubiArchivo + '-CmbType',
                    fieldLabel: 'Type',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'code',
                    width: 180,
                    labelWidth: 50,
                    emptyText: '',
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbSearchAfterRender'
                    }
                }, {
                    xtype: 'form',
                    id: prototype.idMassiveRefunduatpFormSubiArchivo + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            id: prototype.idMassiveRefunduatpFormSubiArchivo + '-File',
                            name: 'excelfile', // prototype.idMassiveRefunduatpFormSubiArchivo + '-File',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 400,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
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
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    icon: 'resources/img/botones/24x24/1337982029_3floppy_unmount.png',
                    text: 'Save', id: prototype.idMassiveRefunduatpFormSubiArchivo + '-Save',
                    height: 30,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickSave'
                    }
                }, {
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    text: 'Close',
                    height: 30,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }

    ]
});






