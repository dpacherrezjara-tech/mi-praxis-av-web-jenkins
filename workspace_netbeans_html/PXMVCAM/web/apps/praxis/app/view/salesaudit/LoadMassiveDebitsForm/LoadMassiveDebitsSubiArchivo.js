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
Ext.define('Ext.Praxis.view.salesaudit.LoadMassiveDebitsForm.LoadMassiveDebitsSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.LoadMassiveDebitsSubiArchivo',
    controller: 'LoadMassiveDebitsSubiArchivoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.LoadMassiveDebitsForm.LoadMassiveDebitsSubiArchivoController'        
    ],
    title: 'UPLOAD FILE',
    header: true,
    id: prototype.id3 + '-win',
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
            id: prototype.id3 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id3 + '-CmbType',
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
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id3 + '-CmbArea',
                            fieldLabel: 'Area',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.id3 + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            id: prototype.id3 + '-File',
                            name: 'excelfile', // prototype.id3 + '-File',
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
                    text: 'Save', id: prototype.id3 + '-Save',
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





