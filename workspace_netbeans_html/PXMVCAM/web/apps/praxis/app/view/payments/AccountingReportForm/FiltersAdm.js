Ext.define('Ext.Praxis.view.payments.AccountingReportForm.FiltersAdm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersAdm',
    border: false,
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
                    id: prototype.id + '-formFiltersAdm',
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
                        // ── ROW 1 ────────────────────────────────────────────
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
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    id: prototype.id + '-cmbCcustAdm',
                                    name: 'IN_CCUST',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
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
                                    value: ''
                                },
                                // NUEVO: Combo para elegir tipo de fecha (Sdate / Update)
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Date Type',
                                    id: prototype.id + '-cmbDateTypeAdm',
                                    name: 'IN_DATETYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['SDATE',  'Sdate'],
                                            ['UPDATE', 'Update']
                                        ]
                                    }),
                                    labelWidth: 75,
                                    width: 175,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'SDATE'
                                },
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
                                    xtype: 'textfield',
                                    fieldLabel: 'ADM Number',
                                    labelWidth: 90,
                                    width: 200,
                                    name: 'IN_ADMNUM',
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket Number',
                                    labelWidth: 90,
                                    width: 200,
                                    name: 'IN_TICKET',
                                    maxLength: 13,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 90,
                                    width: 200,
                                    name: 'IN_SCARDN1',
                                    maxLength: 6,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '******'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 70,
                                    name: 'IN_SCARDN2',
                                    maxLength: 4,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Auth Code',
                                    labelWidth: 90,
                                    width: 200,
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        },
                        // ── ROW 2 ────────────────────────────────────────────
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Accounting ID',
                                    labelWidth: 90,
                                    width: 280,
                                    name: 'IN_IDCONT',
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Corrl AV',
                                    labelWidth: 80,
                                    width: 230,
                                    name: 'IN_HEADER',
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisAdm',
                                    name: 'IN_PAIS',
                                    labelWidth: 80,
                                    width: 210,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    fieldLabel: 'Country',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurrAdm',
                                    name: 'IN_MONEDA',
                                    labelWidth: 80,
                                    width: 150,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    fieldLabel: 'Currency',
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
                                // NUEVO: Adjustment Type
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAdjTypeAdm',
                                    name: 'IN_ADJTYPE',
                                    labelWidth: 110,
                                    width: 300,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    fieldLabel: 'Adjustment Type',
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
                                // NUEVO: Agent
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Agent',
                                    labelWidth: 50,
                                    width: 150,
                                    name: 'IN_SAGENT',
                                    maxLength: 10,
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