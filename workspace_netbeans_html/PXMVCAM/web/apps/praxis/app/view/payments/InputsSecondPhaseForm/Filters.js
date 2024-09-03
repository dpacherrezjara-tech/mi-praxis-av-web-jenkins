Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.Filters', {
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
                                    xtype: 'combobox',
                                    id:prototype.id + '-cmbGroupBy',
                                    fieldLabel: 'Group By',
                                    labelStyle: 'font-weight:bold;',
                                    name: 'IN_GROUP',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['D', 'Detail'],
                                            ['C', 'Calendar']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'D',
                                    listeners: {
                                        change: 'onChangeGroup'
                                    }
                                },

                                {
                                    xtype: 'combobox',
                                    name: 'IN_TFECHA',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date']
                                        ]
                                    }),
                                    fieldLabel: 'Search By',
                                    labelWidth: 80,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-dfPRDAF',
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
                                    id: prototype.id + '-dfPRDAT',
                                    name: 'IN_PRDAT',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 120,
                                    value: new Date(anioActual, mesActual, 31),
                                    listeners: {
                                        'specialkey': 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'IN_PRDAY',
                                    id: prototype.id + '-cmbPRDAY',
                                    fieldLabel: 'Year',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['year'],
                                        data: (function () {
                                            let years = [];
                                            for (let i = anioActual + 1; i >= anioActual - 5; i--) {
                                                years.push({year: i});
                                            }
                                            return years;
                                        })()
                                    }),
                                    queryMode: 'local',
                                    displayField: 'year',
                                    valueField: 'year',
                                    labelWidth: 50,
                                    editable: false,
                                    hidden: true,
                                    width: 150,
                                    value: anioActual
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            margin: '0 0 0 30',
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
                                            ['133', 'LR - LATSA']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '134'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCODPRO',
                                    name: 'IN_CODPRO',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
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
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_SEQPRO',
                                    id:prototype.id + '-txtSEQPRO',
                                    value: '',
                                    hidden: true,
                                    readOnly: true
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
