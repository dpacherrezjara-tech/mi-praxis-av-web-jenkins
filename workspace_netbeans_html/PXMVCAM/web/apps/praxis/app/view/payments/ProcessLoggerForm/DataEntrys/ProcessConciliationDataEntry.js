prototype.idDE2 = prototype.id + '-ProcessConciliationDataEntry';
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessConciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessConciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.ProcessConciliationDataEntryController'
    ],
    controller: 'ProcessConciliationDataEntryController',
    title: 'Process Conciliation - Form',
    header: true,
    width: 380,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'form',
            id: prototype.idDE2 + '-mainForm',
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
                        pack: 'center'
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
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Parameters</span>',
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Client',
                                    name: 'VP_CCUST',
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
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '134'
                                }

                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE2 + '-cmbCODPRO',
                                    name: 'VP_CODPRO',
                                    labelWidth: 90,
                                    width: 250,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'VP_SDATE_INI',
                                    fieldLabel: 'Process From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 90,
                                    width: 180,
                                    value: ''
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'VP_SDATE_FIN',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 40,
                                    width: 130,
                                    value: ''
                                },
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Bank Doc.',
                                    labelWidth: 90,
                                    width: 190,
                                    name: 'VP_BANDOC',
                                    maxLength: 10,
                                    enforceMaxLength: true
                                }
                            ]
                        }
                    ]
                },
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
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                margin: '3 5 3 5',
                scale: 'medium'
            },
            items: [
                {
                    text: 'Process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClose'
                    }
                }
            ]
        }
    ]
});