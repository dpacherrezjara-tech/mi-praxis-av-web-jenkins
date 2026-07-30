Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 10',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1),
                                    listeners: {
                                        'specialkey': 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true,
                                    labelWidth: 30,
                                    width: 120,
                                    value: new Date(),
                                    listeners: {
                                        'specialkey': 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Process',
                                    name: 'IN_PROCESO',
                                    id: prototype.id + '-cmbPROCESO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['TC', 'Credit Card'],
                                            ['CASH', 'Cash']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'TC',
                                    listeners: { select: 'onChangeProceso' }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Acc. Type',
                                    name: 'IN_ACCTYPE',
                                    id: prototype.id + '-cmbACCTYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['REG', 'Regular'],
                                            ['DEB', 'Debit'],
                                            ['ADJ', 'Adjustment'],
                                            ['SAL', 'Sale W/O Settl.'],
                                            ['ADM', 'ADM'],
                                            ['REV', 'Reversal'],
                                            ['CHK', 'Check'],
                                            ['ARC', 'Neg. Balance']
                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'REG',
                                    listeners: { select: 'onChangeAccType' }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Status',
                                    name: 'IN_STATUS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['R', 'Rejected'],
                                            ['S', 'Report SAP']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 170,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCODPRO',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 300,
                                    valueField: 'PROCESADOR',
                                    displayField: 'PROC_DESC',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: true,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    emptyText: '(All)'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'ID Acc.',
                                    labelWidth: 80,
                                    width: 280,
                                    name: 'IN_IDCONT',
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Header',
                                    labelWidth: 80,
                                    width: 280,
                                    name: 'IN_HEADER',
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Error Code',
                                    labelWidth: 80,
                                    width: 220,
                                    name: 'IN_CODREC',
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ]
});
