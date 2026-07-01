prototype.idDE = prototype.id + '-MaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.TAXMerchantCatalogForm.DataEntrys.MaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.TAXMerchantCatalog.MaintenanceDataEntryController'
    ],
    controller: 'MaintenanceDataEntryController',
    title: 'Maintenance - Form',
    header: true,
    width: 1200,
    resizable: true,
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
            listeners: {
                validitychange: function(form, valid) {
                    const saveBtn = Ext.getCmp(prototype.idDE + '-btn-save');
                    if (saveBtn) {
                        saveBtn.setDisabled(!valid);
                    }
                }
            },
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
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            border: false,
            bodyStyle: 'background: transparent',
            defaults: {
                xtype: 'textfield',
                margin: '5 8 5 8',
                labelStyle: 'text-align:left;font-weight:bold;',
                fieldStyle: 'text-align:center;',
                flex: 1,
                labelWidth: 120,
            }
        },
        items: [
            {
                // 1️⃣ Primera fila
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Proceso',
                        name: 'IN_PROCESO',
                        id: prototype.idDE + '-proceso',
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['TC', 'TC - CREDIT CARD'],
                                ['CA', 'CA - CASH']
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',              
                        queryMode: 'local',
                        editable: false,
                        value: 'TC', // ✅ Valor por defecto
                        triggerAction: 'all',
                        flex: 1
                    },
                    {
                        name: 'IN_MERCHANT',
                        fieldLabel: 'Merchant',
                        id: prototype.idDE + '-merchant',
                        maxLength: 19,
                        allowBlank: false,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        name: 'IN_SALE_AGENT',
                        fieldLabel: 'Sales Agent',
                        id: prototype.idDE + '-iatavta',
                        maxLength: 9,
                        allowBlank: false,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        name: 'IN_SOCIETY',
                        maxLength: 4,
                        allowBlank: false,
                        fieldLabel: 'Society',
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }
                ]
            },
            {
                // 2️⃣ Segunda fila
                items: [
                    {
                        xtype: 'combo',
                        id: prototype.idDE + '-cmbDataEntryCurrency',   
                        fieldLabel: 'Currency',
                        flex: 1,
                        name: 'IN_CURRENCY',
                        displayField: 'NAME',
                        valueField: 'CODE',
                        queryMode: 'local',
                        editable: false,
                        triggerAction: 'all',
                        emptyText: '(All)',
                        store: {
                            fields: ['NAME', 'CODE'],
                            data: []
                        }
                    },
                    {
                        name: 'IN_SALE_PROFIT',
                        maxLength: 8,
                        allowBlank: false,
                        fieldLabel: 'Sale Profit',
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        id: prototype.idDE + '-cmbDataEntryCountry',   
                        fieldLabel: 'Country',
                        flex: 1,
                        name: 'IN_COUNTRY',
                        displayField: 'NAME',
                        valueField: 'CODE',
                        queryMode: 'local',
                        editable: false,
                        triggerAction: 'all',
                        emptyText: '(All)',
                        store: {
                            fields: ['NAME', 'CODE'],
                            data: []
                        }
                    },
                    {
                        name: 'IN_STATEMENT_PROFIT',
                        fieldLabel: 'Statement Profit',
                        allowBlank: false,
                        maxLength: 8,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }
                ]
            },
            {
                // 3️⃣ Tercera fila
                items: [
                    {
                        name: 'IN_COST_CENTER',
                        fieldLabel: 'Cost Center',
                        allowBlank: false,
                        maxLength: 10,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        name: 'IN_ACQUIRER',
                        fieldLabel: 'Acquirer',
                        allowBlank: false,
                        maxLength: 40,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        id: prototype.idDE + '-cmbDataEntryProcessor',   
                        fieldLabel: 'Processor',
                        flex: 1,
                        name: 'IN_PROCESSOR',
                        displayField: 'NAME',
                        valueField: 'CODE',
                        queryMode: 'local',
                        editable: false,
                        triggerAction: 'all',
                        emptyText: '(All)',
                        store: {
                            fields: ['NAME', 'CODE'],
                            data: []
                        }
                    },
                    {
                        name: 'IN_CHANNEL',
                        fieldLabel: 'Channel',
                        id: prototype.idDE + '-channel',
                        maxLength: 40,
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
                // 4️⃣ Cuarta fila
                items: [
                    {
                        name: 'IN_COMPANY',
                        fieldLabel: 'Company',
                        allowBlank: false,
                        maxLength: 4,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        id: prototype.idDE + '-cmbDataEntryCurrencyBank',   
                        fieldLabel: 'Bank Currency',
                        flex: 1,
                        name: 'IN_BANK_CURRENCY',
                        displayField: 'NAME',
                        valueField: 'CODE',
                        queryMode: 'local',
                        editable: false,
                        triggerAction: 'all',
                        emptyText: '(All)',
                        store: {
                            fields: ['NAME', 'CODE'],
                            data: []
                        }
                    },
                    {
                        name: 'IN_BANK_PROFIT',
                        fieldLabel: 'Bank Profit',
                        allowBlank: false,
                        maxLength: 8,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        name: 'IN_NIT_CODE',
                        fieldLabel: 'NIT Code',
                        allowBlank: false,
                        maxLength: 20,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }
                ]
            },
            {
                // 5️⃣ Quinta fila
                items: [
                    {
                        name: 'IN_NIT_DESCRIPTION',
                        maxLength: 40,
                        allowBlank: false,
                        fieldLabel: 'NIT Description',
                        flex: 2,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        name: 'IN_CODE',
                        fieldLabel: 'Code',
                        id: prototype.idDE + '-code',
                        allowBlank: false,
                        maxLength: 10,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        name: 'IN_ACCOUNT',
                        maxLength: 6,
                        allowBlank: false,
                        fieldLabel: 'Account',
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Profit Type',
                        name: 'IN_TYPE_CB',
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['S', 'SALE'],
                                ['B', 'BANK'],
                                ['D', 'DEPOSIT']                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: 'S', // ✅ Valor por defecto
                        triggerAction: 'all',
                        flex: 1
                    },
                ]
            },
            {
                // 6️⃣ Sexta fila
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Type Memoline',
                        name: 'IN_TYPE_MEMOLINE',
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['COM', 'COMMISSION'],
                                ['FIS', 'FISCAL'],
                                ['AFI', 'AFFILIATE'],
                                ['NA', 'NOT APPLICABLE']
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: 'NA', // ✅ Valor por defecto
                        triggerAction: 'all',
                        flex: 1
                    },
                    {
                        name: 'IN_MEMOLINE',
                        maxLength: 60,
                        allowBlank: false,
                        fieldLabel: 'Memoline',
                        flex: 3,
                        listeners: {
                            change: function (field, newValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }
                ]
            }
        ]
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Control Data">
    {
        xtype: 'fieldset',
        id: prototype.idDE + '-controlData',
        title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        border: true,
        margin: '5 5 5 5',
        width: '100%',
        style: {
            backgroundColor: '#EEF3F9'
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
                editable: false,
                flex: 1
            }
        },
        items: [
            {
                items: [
                    {
                        fieldLabel: 'User Crt.',
                        name: 'IN_USCR'
                    },
                    {
                        fieldLabel: 'Date Crt.',
                        name: 'IN_FECR'
                    },
                    {
                        fieldLabel: 'Hour Crt.',
                        name: 'IN_HOCR'
                    }
                ]
            },
            {
                items: [
                    {
                        fieldLabel: 'User Upd.',
                        name: 'IN_USUP'
                    },
                    {
                        fieldLabel: 'Date Upd.',
                        name: 'IN_FEUP'
                    },
                    {
                        fieldLabel: 'Hour Upd.',
                        name: 'IN_HOUP'
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
                    disabled: true,
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