/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.NoShowForm.NoShowFormViewXml', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id03 + '-dataEntry',
    controller: prototype.id03 + '-noShowFormViewXmlController',
    requires: [
        'Ext.Praxis.controller.discharges.NoShow.NoShowFormViewXmlController'
    ],
    title: '',
    width: 1000,
    height: 500,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'left'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id03 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    margin: '2 2 1 1',
                    items: [
                        {
                            xtype: 'textareafield',
                            height: 490,
                            border: false,
                            id: prototype.id03 + '-INFO_XML',
                            padding: '1 1 1 1',
                            width: 990,
                            //maxRows: 150,
                            fieldLabel: '',
                            labelPad: 0,
                            labelSeparator: ' ',                            
                            fieldStyle: 'color:black;font-weight: bold; font-size:13px; font-family:Courier New',
                            labelWidth: 0
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
            margin: '5 5 1 1', // left/right/right/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id03 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id03 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id03 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id03 + '-btn-cancel',
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
