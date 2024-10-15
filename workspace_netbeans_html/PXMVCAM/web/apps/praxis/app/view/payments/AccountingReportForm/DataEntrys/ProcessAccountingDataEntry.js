prototype.idDE = prototype.id + '-ProcessAccountingDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingReportForm.DataEntrys.ProcessAccountingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessAccountingDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingReport.ProcessAccountingDataEntryController'
    ],
    controller: 'ProcessAccountingDataEntryController',
    title: 'Process Accounting - Form',
    header: true,
    width: 1700,
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
                //<editor-fold defaultstate="collapsed" desc="General Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Parameters</span>',
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    name: 'IN_CCUST',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['134', 'AV - AVIANCA'],
                                            ['202', 'TA - TACA'],
                                            ['547', '2K - AEROGAL'],
                                            ['133', 'LR - LACSA']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '134'
                                }
                            ]
                        },
                        {
                            items:[
                                {
                                    xtype: 'datefield',
                                    name: 'IN_PRDAF',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1),
                                    listeners: {
                                        'specialkey': 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_PRDAT',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1)
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FCONT',
                                    fieldLabel: 'Accounting Date',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 100,
                                    width: 200,
                                    value: new Date()
                                }
                            ]
                        },
                        {
                            items:[
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Acc. Type',
                                    name: 'IN_TIPOCON',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['REG', 'Regular'],
                                            ['DEB', 'Debits'],
                                            ['ADJ','Adjustment']
                                        ]
                                    }),
                                    labelWidth: 90,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'REG'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCODPRO',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 200,
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
                                    triggerAction: 'all',
                                    value: '', // Valor inicial (vacío)
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
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
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateConciliation'
                    }
                },
                {
                    text: 'Reverse Match',
                    hidden: true,
                    id: prototype.idDE + '-btn-reverse',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onReverseConciliation'
                    }
                },
                {
                    text: 'Download Excel',
                    hidden: true,
                    id: prototype.idDE + '-btn-excel',
                    iconCls: 'prx-icon-excel',
                    listeners: {
                        click: 'onDownloadConciliation'
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