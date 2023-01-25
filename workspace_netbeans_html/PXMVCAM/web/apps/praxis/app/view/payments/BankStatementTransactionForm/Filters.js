Ext.define('Ext.Praxis.view.payments.BankStatementTransactionForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 5px',
                        anchor: '100%',
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBank',
                            fieldLabel: 'Code Bank ',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODEBANK',
                            displayField: 'IN_CODE_IN_NAME',
                            emptyText: 'All',
                            margin: '5 5 5 20',
                            width: 240,
                            labelWidth: 80
                        }
                        ,
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country',
                            id: prototype.id + '-cmbPais',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'A006PAIS',
                            displayField: 'A006NOMBRE',
                            emptyText: 'All',
                            width: 350,
                            labelWidth: 70,
                            margin: '5 5 5 10'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Transaction Type',
                            id: prototype.id + '-cmbTTRAN',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 200,
                            labelWidth: 120,
                            margin: '5 5 5 10'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Transaction Code',
                            id: prototype.id + '-cmbCTRAN',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 300,
                            labelWidth: 120,
                            margin: '5 5 5 10'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: true,
                    width: 1400,
                    bodyStyle: 'background: transparent;border-top: 2px solid white;',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        labelAlign: 'right'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtDESCEECC',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Description EECC',
                            width: 330,
                            labelWidth: 120,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            margin: '5 5 5 20',
                            enforceMaxLength: true,
                            maxLength: 40,
                            minLength: 1,
                            maskRe: /[0-9A-Za-z]/,
                            labelSeparator: ':',
                            listeners: {
                                keypress: 'txtFilterValue_keyDownHandler',
                                change: function (field, newValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



