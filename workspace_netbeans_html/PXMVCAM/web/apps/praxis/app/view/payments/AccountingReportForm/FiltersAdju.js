Ext.define('Ext.Praxis.view.payments.AccountingReportForm.FiltersAdju', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersAdju',
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
                    id: prototype.id + '-formFiltersAdju',
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
                                    id: prototype.id + '-cmbCcustAdju',
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
                                // NUEVO: Combo para elegir el tipo de fecha a filtrar
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Date Type',
                                    id: prototype.id + '-cmbDateTypeAdju',
                                    name: 'IN_DATETYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['VALDATE', 'Valdate'],
                                            ['SDATE',   'Sdate'],
                                            ['UPDATE',  'Update']
                                        ]
                                    }),
                                    labelWidth: 75,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'VALDATE'
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProcAdj',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 220,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisAdj',
                                    name: 'IN_PAIS',
                                    labelWidth: 80,
                                    width: 200,
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
                                    id: prototype.id + '-cmbCurrAdj',
                                    name: 'IN_MONEDA',
                                    labelWidth: 80,
                                    width: 160,
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
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['1', 'Auto'],
                                            ['5', 'Manual']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TDOC',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['S', 'Sale'],
                                            ['R', 'Refund']
                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },

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
                                    name: 'IN_IDCADJ',
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                
                                // NUEVO: Adjustment Type
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAdjTypeAdju',
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
                                // NUEVO: BPO Comment
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBpoCommentAdju',
                                    name: 'IN_BPOCOMMENT',
                                    labelWidth: 100,
                                    width: 300,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    fieldLabel: 'BPO Comment',
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
                                    fieldLabel: 'Bank Doc.',
                                    labelWidth: 90,
                                    width: 180,
                                    name: 'IN_BANDOC',
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Reference',
                                    labelWidth: 90,
                                    width: 200,
                                    name: 'IN_REFER',
                                    maxLength: 30,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 90,
                                    width: 190,
                                    name: 'IN_MERCHANT',
                                    maxLength: 16,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
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
                                },
     
                                  
                                
                            ]
                        },
                        
                        //-----ROW 03 ------
                        
                        {     xtype: 'panel',
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
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 140,
                                    name: 'IN_SPNR',
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 90,
                                    width: 165,
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
                                    width: 60,
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
                                    width: 160,
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Corrl AV',
                                    labelWidth: 70,
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