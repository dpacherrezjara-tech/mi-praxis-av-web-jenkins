prototype.idDE = prototype.id + '-MaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.MiscCatalogForm.DataEntrys.MaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.MiscCatalog.MaintenanceDataEntryController'
    ],
    controller: 'MaintenanceDataEntryController',
    title: 'Maintenance - Form',
    header: true,
    width: 700,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: true
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Parameters">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Details</span>',
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    id: prototype.idDE + '-cmbCcust',
                                    name: 'A4451CCUST',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['134', 'AV - AVIANCA'],
                                            ['202', 'TA - TACA'],
                                            ['547', '2K - AEROGAL'],
                                            ['133', 'LR - LACSA']
                                        ]
                                    }),
                                    labelWidth: 90,
                                    editable:false,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    value: '134'
                                },
                                 {
                                    name: 'A4451KEY1',
                                    id: prototype.idDE + '-txtKey1',
                                    fieldLabel: 'Key 1',
                                    labelWidth: 40,
                                    width: 100,
                                    maxLength: 2,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    name: 'A4451KEY2',
                                    id: prototype.idDE + '-txtKey2',
                                    fieldLabel: 'Key 2',
                                    labelWidth: 40,
                                    width: 130,
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    name: 'A4451KEY3',
                                    id: prototype.idDE + '-txtKey3',
                                    fieldLabel: 'Key 3',
                                    labelWidth: 40,
                                    width: 150,
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'A4451DESC1',
                                    fieldLabel: 'Description 1',
                                    labelWidth: 90,
                                    width: 280,
                                    maxLength: 50,
                                    enforceMaxLength: true
                                },
                                {
                                    name: 'A4451DESC2',
                                    fieldLabel: 'Description 2',
                                    labelWidth: 90,
                                    width: 280,
                                    maxLength: 50,
                                    enforceMaxLength: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'A4451COMEN',
                                    fieldLabel: 'Comment',
                                    labelWidth: 90,
                                    width: 450,
                                    maxLength: 100,
                                    enforceMaxLength: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'A4451SEQ',
                                    fieldLabel: 'SEQ',
                                    labelWidth: 90,
                                    width: 150,
                                    maxLength: 2,
                                    enforceMaxLength: true
                                },
                                {
                                    name: 'A4451CORRL',
                                    fieldLabel: 'Corrl',
                                    labelWidth: 60,
                                    width: 130,
                                    maxLength: 3,
                                    enforceMaxLength: true
                                },
                                {
                                    name: 'A4451TTABL',
                                    fieldLabel: 'Table',
                                    labelWidth: 60,
                                    width: 150,
                                    maxLength: 10,
                                    enforceMaxLength: true
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Status',
                                    name: 'A4451STS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Active'],
                                            ['0', 'Inactive']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '0'
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="Control Data">
                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: true,
                    margin: '5 5 5 5',
                    width: '100%',
                    style: {
                        backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Crt.',
                                    name: 'A4451USCR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 200,
                                    fieldLabel: 'Date Crt.',
                                    name: 'A4451TSCR'
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 0 5 0'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: {
                        click: 'onSaveRecord'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDE + '-btn-delete',
                    iconCls: 'prx-icon-image-trash',
                    listeners: {
                        click: 'onDeleteRecord'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});