/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.DataEntryDetailsFOP
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntrySalesAuditAccepted', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsFOP',
    controller: 'DataEntrySalesAuditAcceptedController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntrySalesAuditAcceptedController'
    ],
    title: 'ADM Information',
    header: true,
    id: prototype.id9 + '-win',
    height: 280,
    width: 630,
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
            id: prototype.id9 + '-form',
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
                            xtype: 'combo',
                            id: prototype.id9 + '-ComboSourceASR',
                            fieldLabel: 'Status', hidden: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 150,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 150
                            },
                            listeners: {
                                select: 'onCmbSelect'
                            }
                        }, {
                            xtype: 'combo',
                            id: prototype.id9 + '-ComboSourceBSP',
                            fieldLabel: 'Status',
                            queryMode: 'local', hidden: true,
                            displayField: 'name',
                            valueField: 'code',
                            width: 150,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 150
                            },
                            listeners: {
                                select: 'onCmbSelect'
                            }
                        }, {
                            xtype: 'combo',
                            id: prototype.id9 + '-ComboSourceARC',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name', hidden: true,
                            valueField: 'code',
                            width: 150,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 150
                            },
                            listeners: {
                                select: 'onCmbSelect'
                            }
                        }, {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id9 + '-ComboReason',
                            queryMode: 'local', hidden: true,
                            fieldLabel: 'Reason',
                            displayField: 'DESCRIPT',
                            valueField: 'DESCRIPT',
                            width: 306,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 500
                            }
                        },
                        {
                            xtype: 'label',
                            id: prototype.id9 + '-lblCantCarac',
                            text: '0',
                            margin: '0 0 0 10'

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
                            id: prototype.id9 + '-ComboStatus',
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
                            id: prototype.id9 + '-ComboStatus2',
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
                            id: prototype.id9 + '-Argument',
                            labelWidth: 60,
                            width: 600,
                            height: 80,
                            grow: true,
                            maxLength: 300,
                            enforceMaxLength: true,
                            name: 'Reason',
                            fieldLabel: 'Reason',
                            listeners: {
                                keydown: {
                                    element: 'el',
                                    fn: function () {
                                        var count =(Ext.getCmp(prototype.id9 + '-Argument').getValue().length + 1);
                                         Ext.getCmp(prototype.id9 + '-lblCantCarac').setText(count);
                                    }
                                }

                            }

                        }

                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.id9 + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            //layout: 'hbox',
                            id: prototype.id9 + '-File',
                            name: 'file', // prototype.id9 + '-File',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 600,
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
                    text: 'Save', id: prototype.id9 + '-Save',
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
                        click: 'onCancelClick'
                    }
                }
            ]
        }

    ]
});