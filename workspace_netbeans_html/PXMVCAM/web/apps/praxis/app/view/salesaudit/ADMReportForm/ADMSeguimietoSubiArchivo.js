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
Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.ADMSeguimietoSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.ADMSeguimietoSubiArchivo',
    controller: 'ADMSeguimietoSubiArchivoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReport.ADMSeguimietoSubiArchivoController'
    ],
    title: 'UPLOAD FILE',
    header: true,
    id: prototype.id6 + '-win',
    height: 350,
    width: 870,
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
            id: prototype.id6 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id6 + '-MemoNumber',
                            labelWidth: 60,
                            labelAlign: 'center',
                            maxLength: 10, readOnly: true,
                            name: 'Source',
                            fieldLabel: 'Source',
                            width: 205
                        }, {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id6 + '-Folio',
                            labelWidth: 30,
                            labelAlign: 'center',
                            maxLength: 8,
                            name: 'Folio',
                            enforceMaxLength: 8,
                            fieldLabel: 'Folio',
                            width: 150
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id6 + '-Service',
                            fieldLabel: 'Service Agent',
                            labelWidth: 90,
                            readOnly: true,
                            labelAlign: 'center',
                            width: 180
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id6 + '-ComboStatus',
                            labelAlign: 'left',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 60,
                            labelClsExtra: 'prx-label-search',
                            width: 210,
                            editable: false,
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender'
                            }
                        },
                        {
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id6 + '-ComboStatus2',
                            labelAlign: 'left',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 60,
                            labelClsExtra: 'prx-label-search',
                            width: 210,
                            editable: false,
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearch2AfterRender'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id6 + '-txtFilterDateFrom',
                            fieldLabel: 'Date',
                            format: 'Y/m/d',
                            labelWidth: 40,
                            value: new Date(),
                            labelAlign: 'right',
                            width: 135,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'textareafield',
                            id: prototype.id6 + '-Argument',
                            labelWidth: 60,
                            width: 800,
                            height: 80,
                            grow: true,
                            maxLength: 500,
                            enforceMaxLength: true,
                            name: 'Argument',
                            fieldLabel: 'Argument'
                        }

                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.id6 + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            //layout: 'hbox',
                            id: prototype.id6 + '-File',
                            name: 'fileaudito', // prototype.id6 + '-File',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            // buttonOnly: true,
                            // hideLabel: true,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            },
                            listeners: {
                                //change: 'onFileChange'
                            }
                        },
                        {
                            xtype: 'filefield',
                            id: prototype.id6 + '-File2',hidden: true,
                            name: 'fileaudito2', // prototype.id6 + '-File2',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            // buttonOnly: true,
                            // hideLabel: true,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            },
                            listeners: {
                                //change: 'onFileChange'
                            }
                        },
                        {
                            xtype: 'filefield',
                            id: prototype.id6 + '-File3',hidden: true,
                            name: 'fileaudito3', // prototype.id6 + '-File3',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            // buttonOnly: true,
                            // hideLabel: true,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            },
                            listeners: {
                                //change: 'onFileChange'
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
                    text: 'Save',id: prototype.id6 + '-Save',
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





