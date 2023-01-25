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
Ext.define('Ext.Praxis.view.salesaudit.LoadticketReportForm.LoadticketReportFormSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.LoadticketReportFormSubiArchivo',
    controller: 'LoadticketReportFormSubiArchivoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.LoadticketReportForm.LoadticketReportFormSubiArchivoController'        
    ],
    title: 'UPLOAD FILE',
    header: true,
    id: prototype.idLoadLoadticketReport + '-win',
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
            id: prototype.idLoadLoadticketReport + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.idLoadLoadticketReport + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            id: prototype.idLoadLoadticketReport + '-File',
                            name: 'excelfile', // prototype.idLoadLoadticketReport + '-File',
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
                    text: 'Save', id: prototype.idLoadLoadticketReport + '-Save',
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






