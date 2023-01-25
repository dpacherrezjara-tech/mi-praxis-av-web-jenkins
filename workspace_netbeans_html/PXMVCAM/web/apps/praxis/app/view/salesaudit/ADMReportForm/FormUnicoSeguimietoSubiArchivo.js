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
Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimietoSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormUnicoSeguimietoSubiArchivo',
    controller: 'FormUnicoSeguimietoSubiArchivoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReport.FormUnicoSeguimietoSubiArchivoController'
    ],
    title: 'UPLOAD FILE',
    header: true,
    id: prototype.id5 + '-win',
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
            id: prototype.id5 + '-form',
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
                            id: prototype.id5 + '-MemoNumber',
                            labelWidth: 60,
                            labelAlign: 'center',
                            maxLength: 10, readOnly: true,
                            name: 'MemoNumber',
                            fieldLabel: 'Memo N°',
                            width: 205
                        }, {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id5 + '-Folio',
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
                            id: prototype.id5 + '-Service',
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
                            id: prototype.id5 + '-ComboStatus',
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
                            id: prototype.id5 + '-ComboStatus2',
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
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id5 + '-ComboStatus3',
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
                                afterrender: 'onCmbSearch3AfterRender'
                            }
                        },
                        {
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id5 + '-ComboStatus4',
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
                                afterrender: 'onCmbSearch4AfterRender'
                            }
                        },
                        {
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id5 + '-ComboStatus5',
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
                                afterrender: 'onCmbSearch4AfterRender'
                            }
                        },
                        {
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id5 + '-ComboStatus6',
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
                                afterrender: 'onCmbSearch4AfterRender'
                            }
                        },
                        {
                            xtype: 'combo', hidden: true,
                            fieldLabel: 'Status',
                            id: prototype.id5 + '-ComboStatus7',
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
                                afterrender: 'onCmbSearch4AfterRender'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id5 + '-txtFilterDateFrom',
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
                            id: prototype.id5 + '-Argument',
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
                    id: prototype.id5 + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            //layout: 'hbox',
                            id: prototype.id5 + '-File',
                            name: 'fileaudito', // prototype.id5 + '-File',
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
                            id: prototype.id5 + '-File2',
                            name: 'fileaudito2', // prototype.id5 + '-File2',
                            fieldLabel: 'File',
                            allowBlank: true,hidden: true,
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
                            id: prototype.id5 + '-File3',
                            name: 'fileaudito3', // prototype.id5 + '-File3',
                            fieldLabel: 'File',
                            allowBlank: true,hidden: true,
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
                    text: 'Save',id: prototype.id5 + '-Save',
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


