prototype.idDE1 = prototype.id + '-CostCenterDataEntry';

Ext.define('Ext.Praxis.view.payments.CostCenterCatalogForm.CostCenterDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CostCenterDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.CostCenterCatalog.CostCenterDataEntryController'
    ],
    controller: 'CostCenterDataEntryController',
    title: 'Cost Center - Form',
    header: true,
    width: 700,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE1 + '-mainForm',
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
                        fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                        editable: true
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="SAP">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Cod.',
                                    name: 'CODREC',
                                    fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;',
                                    editable: false,
                                    labelWidth: 90,
                                    width: 210
                                },
                                {
                                    fieldLabel: 'Society',
                                    name: 'SOCIETY',
                                    maskRe: /^[A-Z0-9]$/,
                                    labelWidth: 90,
                                    width: 210,
                                    maxLength: 4,
                                    enforceMaxLength: true
                                    
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'PAIS',
                                    labelWidth: 60,
                                    width: 170,
                                    maskRe: /^[A-Z]$/,
                                    maxLength: 2,
                                    enforceMaxLength: true
                                },
                                {
                                    name: 'PROCESO',
                                    hidden: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Profit Center',
                                    name: 'CEBE',
                                    labelWidth: 90,
                                    maskRe: /^[A-Z0-9]$/,
                                    width: 210,
                                    maxLength: 8,
                                    enforceMaxLength: true
                                },
                                {
                                    fieldLabel: 'Cost Center',
                                    name: 'CECO',
                                    maskRe: /^[A-Z0-9]$/,
                                    labelWidth: 90,
                                    width: 210,
                                    maxLength: 10,
                                    enforceMaxLength: true
                                },
                                {
                                    fieldLabel: 'Account',
                                    name: 'CUENTA',
                                    labelWidth: 60,
                                    width: 170,
                                    maxLength: 6,
                                    enforceMaxLength: true,
                                    maskRe: /^[0-9]$/
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
                                    width: 175,
                                    fieldLabel: 'Date Crt.',
                                    name: 'FECR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Crt.',
                                    name: 'HOCR'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Crt.',
                                    name: 'USUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Crt.',
                                    name: 'FEUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Crt.',
                                    name: 'HOUP'
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
            margin: '7 5 7 5',
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
                    text: 'Update',
                    iconCls: 'prx-icon-reload',
                    id: prototype.idDE1 + '-btn-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdate'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE1 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});