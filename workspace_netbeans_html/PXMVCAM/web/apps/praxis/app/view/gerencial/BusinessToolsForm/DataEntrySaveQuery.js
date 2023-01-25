Ext.define('Ext.Praxis.view.gerencial.BusinessToolsForm.DataEntrySaveQuery', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySaveQuery',
    controller: prototype.id + '-dataEntrySaveController',
    requires: [
        'Ext.Praxis.controller.gerencial.BusinessTools.DataEntrySaveController'
    ],
    title: 'Save',
    header: true,
    height: 170,
    width: 300,
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
            id: prototype.id + '-formSave',
            defaults: {
                // style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            margin: '10 5 1 5',
                            layout: {
                                type: 'vbox'
                            },
                            defaults: {
                                xtype: 'textfield',
//                                readOnly: true,
                                padding: '1 5 1 5',
                                labelStyle: 'color:#0b333c;font-weight:bold;',
                                fieldStyle: 'font-weight:bold'
                            },
                            items: [
                                {
                                    id: prototype.id + '-txtNameQuery',
                                    width: 250,
                                    labelWidth: 90,
                                    fieldLabel: 'Name',
                                    maxLength: 10,
                                    enforceMaxLength: true
                                },
                                {
                                    id: prototype.id + '-txtDescQuery',
                                    width: 250,
                                    labelWidth: 90,
                                    fieldLabel: 'Description',
                                    maxLength: 40,
                                    enforceMaxLength: true
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
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
//                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]
});