prototype.idDE = prototype.id + '-MaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountsCatalogForm.DataEntrys.MaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountsCatalog.MaintenanceDataEntryController'
    ],
    controller: 'MaintenanceDataEntryController',
    title: 'Maintenance Account - Form',
    header: true,
    width: 600,
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
                                    name: 'CODCTB',
                                    fieldLabel: 'Key',
                                    labelWidth: 90,
                                    width: 180,
                                    readOnly: true,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Process',
                                    name: 'BANCO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['BC', 'Colombia'],
                                            ['JP', 'Exterior']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    editable: false,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    value: 'BC'
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Type',
                                    name: 'TIPO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['NET', 'Netos'],
                                            ['COM', 'Comisiones'],
                                            ['GYD', 'Gastos'],
                                            ['SOB', 'Sobrantes'],
                                            ['DFR', 'Diferencias']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    editable: false,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    value: 'NET'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'CODIGO',
                                    fieldLabel: 'Code',
                                    labelWidth: 90,
                                    width: 180,
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
                                    name: 'CUENTA',
                                    fieldLabel: 'Account',
                                    labelWidth: 80,
                                    width: 180,
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    maskRe: /[0-9]/
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'MEMOLINE',
                                    fieldLabel: 'Memo Line',
                                    labelWidth: 90,
                                    width: 550,
                                    maxLength: 50,
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
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
                                    name: 'DESCR',
                                    fieldLabel: 'Description',
                                    fieldStyle: 'text-align:left;',
                                    labelWidth: 90,
                                    width: 550,
                                    maxLength: 30,
                                    enforceMaxLength: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'FINICI',
                                    fieldLabel: 'Validity',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 90,
                                    width: 190,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'FVENCE',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: '99991231'
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
                                    name: 'USCR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 200,
                                    fieldLabel: 'Date Crt.',
                                    name: 'TSCR'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Upd.',
                                    name: 'USUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 200,
                                    fieldLabel: 'Date Upd.',
                                    name: 'TSUP'
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
                margin: '5 5 5 5'
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