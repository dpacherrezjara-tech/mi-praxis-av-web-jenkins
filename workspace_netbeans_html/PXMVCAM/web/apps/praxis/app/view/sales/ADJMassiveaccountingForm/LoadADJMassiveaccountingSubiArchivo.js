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
Ext.define('Ext.Praxis.view.sales.ADJMassiveaccountingForm.LoadADJMassiveaccountingSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.LoadADJMassiveaccountingSubiArchivo',
    controller: 'LoadADJMassiveaccountingSubiArchivoController',
    requires: [
        'Ext.Praxis.controller.sales.ADJMassiveaccountingForm.LoadADJMassiveaccountingSubiArchivoController'
    ],
    title: 'Load Excel AdjMassive Massive',
    header: true,
    id: prototype.idADJLoadADJMassive + '-win',
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
            id: prototype.idADJLoadADJMassive + '-form',
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
                            id: prototype.idADJLoadADJMassive + '-CmbType',
                            fieldLabel: 'Select Type',
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
                        }                        
                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.idADJLoadADJMassive + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            id: prototype.idADJLoadADJMassive + '-File',
                            name: 'excelfile', // prototype.idADJLoadADJMassive + '-File',
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
                    text: 'Save', id: prototype.idADJLoadADJMassive + '-Save',
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








