prototype.idProcess = prototype.id + '-ProcessDataEntry';
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.ProcessDataEntryController'
    ],
    controller: 'ProcessDataEntryController',
    title: 'Process - Form',
    header: true,
    width: 500,
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
            xtype: 'panel',
            width: '100%',
            border: false,
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            defaults: {
                margin: '3 3 3 3',
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    border: false,
                    margin: '5 5 5 5',
                    bodyStyle: 'background-color:transparent;',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Process',
                            id: prototype.idProcess + '-processType',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['F2', 'F2 Conciliation EXT'],
                                    ['DB', 'Debits Conciliation'],
                                    ['PRO', 'Provision'],
                                    ['OP', 'OP Conciliation']
                                ]
                            }),
                            labelWidth: 80,
                            width: 210,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'F2',
                            listeners: {
                                change: 'onChangeProcess'
                            }
                        }
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="Filtros">
                {
                    xtype: 'form',
                    layout: 'vbox',
                    id: prototype.idProcess + '-formF2',
                    bodyStyle: 'background-color:#efe5e5',
                    border: true,
                    width: '100%',
                    defaults: {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        bodyStyle: 'background-color:transparent;',
                        defaults: {
                            xtype: 'textfield',
                            fieldStyle: 'text-align: center;',
                            padding: '5 1 5 1',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }

                    },
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type Process',
                                    id: prototype.idProcess + '-typeProcessF2',
                                    name: 'IN_TIPO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Transfer'],
                                            ['2', 'Value Date']
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1',
                                    listeners: {
                                        change: 'onChangeTypeProcessF2'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Client',
                                    name: 'IN_CCUST',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['ALL', 'All Clients'],
                                            ['134', 'AV - AVIANCA '],
                                            ['202', 'TA - TACA'],
                                            ['547', '2K - AEROGAL'],
                                            ['133', 'LR - LACSA']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '134'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idProcess + '-cmbCODPRO',
                                    name: 'IN_CODPRO',
                                    labelWidth: 70,
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
                            id: prototype.idProcess + '-valueDatesF2',
                            width:'100%',
                            hidden:true,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'IN_VALDATEF',
                                    id: prototype.idProcess + '-fromDateF2',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 140,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_VALDATET',
                                    id: prototype.idProcess + '-toDateF2',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 120,
                                    value: new Date()
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    layout: 'hbox',
                    width: '100%',
                    id: prototype.idProcess + '-formDB',
                    bodyStyle: 'background-color:#efe5e5',
                    hidden: true,
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
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
                            labelWidth: 80,
                            width: 210,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '134'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    layout: 'hbox',
                    width: '100%',
                    id: prototype.idProcess + '-formPO',
                    bodyStyle: 'background-color:#efe5e5',
                    hidden: true,
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                         {
                            xtype: 'combobox',
                            fieldLabel: 'Client',
                            name: 'IN_CCUST',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['134', 'AV - AVIANCA'],
                                    ['202', 'TA - TACA']
                                ]
                            }),
                            labelWidth: 80,
                            width: 210,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '134'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Processor',
                            name: 'IN_CODPRO',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['AB', 'AB - ARUBA '],
                                    ['BM', 'BM - MADURO'],
                                    ['VN', 'VS - VISANET']
                                ]
                            }),
                            labelWidth: 80,
                            width: 210,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'AB'
                        }
                    ]
                },
               
                {
                    xtype: 'form',
                    layout: 'vbox',
                    width: '100%',
                    id: prototype.idProcess + '-formPRO',
                    bodyStyle: 'background-color:#efe5e5',
                    hidden: true,
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false,
                        margin: '3 3 3 3'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.idProcess + '-fileProvision',
                            name: 'file',
                            width: '90%',
                            labelWidth: 50,
                            fieldLabel: 'File',
                            buttonText: 'Select File...',
                            allowBlank: false
                        },
                        {
                            xtype: 'label',
                            width: '100%',
                            html:   '<b style="color:#c82d2d;font-size:9px;text-align:right;display:block">' +
                                    'Required Layout (*): ACTION | REFER | VALDATE<br>' +
                                    'Actions: P=Process | U=Update Provision | B=Change Banco</b>'
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
            margin: '3 5 3 5',
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