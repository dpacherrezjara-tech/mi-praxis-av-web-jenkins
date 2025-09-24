prototype.idDE = prototype.id + '-ProcessBankReconciliationDataEntry';

Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.DataEntrys.ProcessBankReconciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessBankReconciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ExteriorBankReconciliation.ProcessBankReconciliationController'
    ],
    controller: 'ProcessBankReconciliationController',
    title: 'Download the Report of Pending Deposits and Settlements',
    header: true,
    width: 500,
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
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Parameters</span>',
                    items: [
//                        {
//                            items: [
//                              {
//                                    xtype: 'combo',
//                                    id: prototype.idDE + '-cmbCODPRO',
//                                    name: 'IN_CODPRO',
//                                    labelWidth: 85,
//                                    width: 410,
//                                    valueField: 'A4451KEY2',
//                                    displayField: 'A4451DESC1',
//                                    fieldLabel: 'Processor',
//                                    queryMode: 'local',
//                                    editable: false,
//                                    allowBlank: true,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    labelAlign: 'right',
//                                    typeAhead: true,
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                    value: '', // Valor inicial (vacío)
//                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
//                                },                              
//                            ]
//                        },
                        {
                            items: [                 
                                
                                 {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    name: 'IN_CCUST',
                                    id:prototype.idDE + '-cmbCcust',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['ALL', '(All)'],  
                                            ['134', 'AV - AVIANCA'],
                                            ['202', 'TA - TACA'],
                                            ['547', '2K - AEROGAL'],
                                            ['133', 'LR - LACSA']
                                        ]
                                    }),
                                    labelWidth: 85,
                                    width: 410,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'ALL',
                                    listeners:{
                                        change:'onChangeCcust'
                                    }
                                }, 
                                
                            ]
                        },
                        {
                            items:[
//                                {
//                                    xtype: 'combobox',
//                                    name: 'IN_TDATE',
//                                    id:prototype.idDE + '-cmbTdate',
//                                    store: Ext.create('Ext.data.SimpleStore', {
//                                        fields: ['code', 'name'],
//                                        data: [
//                                                ['PROCESSDATE', 'Process Date'],   // Fecha de Proceso
//                                                ['VALUEDATE', 'Value Date'],       // Fecha de Valor
//                                                ['PAYMENTDATE', 'Payment Date'],   // Fecha de Pago
//                                                ['CREATIONDATE', 'Creation Date']  // Fecha de Creación
//                                            ]
//                                    }),
//                                    fieldLabel: 'Date Type',
//                                    labelWidth: 85,
//                                    width: 200,
//                                    displayField: 'name',
//                                    valueField: 'code',
//                                    queryMode: 'local',
//                                    editable: false,
//                                   // readOnly:true,
//                                    value: 'PROCESSDATE' // valor inicial 
//                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATE_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 85,
                                    width: 200,
                                    value: new Date(new Date().setMonth(new Date().getMonth() - 1))
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATE_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 85,
                                    width: 200,
                                    value: new Date()
                                }
                            ]
                        },
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
                    text: 'Process',
                    id: prototype.idDE + '-btn-process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
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