Ext.define('Ext.Praxis.view.payments.TAXMerchantCatalogForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
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
                                    fieldLabel: 'Proceso',
                                    id: prototype.id + '-cmbCcust',
                                    name: 'IN_PROCESO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['TC', 'TC - CREDIT CARD'],
                                            ['CA', 'CA - CASH'],
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 300,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 100,
                                    width: 300,
                                    name: 'IN_MERCHANT',
                                    maxLength: 19,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Sale Agent',
                                    labelWidth: 100,
                                    width: 300,
                                    name: 'IN_IATAVTA',
                                    maxLength: 9,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Code',
                                    labelWidth: 100,
                                    width: 300,
                                    name: 'IN_CODE',
                                    maxLength: 10,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress',
                                        change: function (field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbProcessor',   
                                    fieldLabel: 'Processor',
                                    labelWidth: 100,
                                    width: 300,
                                    name: 'IN_CODPRO',
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    emptyText: '(All)',
                                    store: {
                                        fields: ['NAME', 'CODE'],
                                        data: []
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
