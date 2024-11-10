Ext.define('Ext.Praxis.view.payments.AccountingReportForm.Filters', {
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
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    id: prototype.id + '-cmbCcust',
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
                                    value: '134',
                                    listeners: {
                                        change: 'onChangeCcust'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Acc. Type',
                                    id: prototype.id + '-cmbTIPOCON',
                                    name: 'IN_TIPOCON',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['REG', 'Regular'],
                                            ['DEB', 'Debits'],
                                            ['ADJ', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 90,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'REG',
                                    listeners: {
                                        change: 'onChangeTipocon'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FCONTF',
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
                                    name: 'IN_FCONTT',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 120,
                                    value: new Date(),
                                    listeners: {
                                        'specialkey': 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCODPRO',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 300,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
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
    ]
});
