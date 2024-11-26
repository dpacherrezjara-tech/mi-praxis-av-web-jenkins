Ext.define('Ext.Praxis.view.payments.AccountingReportForm.FiltersSummary', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersSummary',
    requires: [
        'Ext.Praxis.view.widgets.MonthField'
    ],
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
                    id: prototype.id + '-formFilters-2',
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
                                    id: prototype.id + '-cmbCcust2',
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
                                {
                                    xtype: 'monthfield',
                                    fieldLabel: 'From',
                                    format: 'Ym',
                                    altFormats: 'm/Y',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    name: 'IN_VALDATEF'
                                },
                                {
                                    xtype: 'monthfield',
                                    fieldLabel: 'To',
                                    format: 'Ym',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    lastDay: true,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    name: 'IN_VALDATET'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCODPRO2',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 300,
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
