prototype.idDE = prototype.id + '-CodeMaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.RejectedCodesForm.DataEntrys.CodeMaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CodeMaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.RejectedCodesCatalog.CodeMaintenanceDataEntryController'
    ],
    controller: 'CodeMaintenanceDataEntryController',
    title: 'Code Maintenance - Form',
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
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Type',
                                    name: 'TIPO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['C', 'Accounting'],
                                            ['V', 'Validations'],
                                            ['2', 'Phase 2'],
                                            ['1', 'Phase 1']
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'C'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Code',
                                    labelWidth: 50,
                                    width: 160,
                                    name: 'CODREC',
                                    editable: false
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'DESCR',
                                    editable: true, // Deshabilita la edición del campo
                                    fieldLabel: 'Description',
                                    fieldStyle: 'text-align:left;',
                                    allowBlank: false,
                                    labelWidth: 100,
                                    width: 500,
                                    maxLength: 100
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
            margin: '7 0 7 0',
            padding: '3 0 3 0',
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
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: {
                        click: 'onSaveRecord'
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