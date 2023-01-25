Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-boxSearchFilter',
            margin: '0 7',
            border: false,
            width: 1600,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFecFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
//                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        //<editor-fold defaultstate="collapsed" desc="cmbDate">
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 120,
                            labelWidth: 45,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
//                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            listeners: {
                                change: 'cbxDateFromYear_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 65,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true,
                            listeners: {
                                change: 'cbxDateFromMonth_changeHandler'
                            }
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id+'-cmbDateFromDay',
//                            fieldStyle: 'text-align: left;',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable: false,
//                            autoSelect: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            valueField: 'code', displayField: 'name',
//                            emptyText: 'All',
//                            labelWidth: 0,
//                            width: 60,
//                            anchor: '100%',
//                            listConfig: {maxHeight: 111, minWidth: 60},
//                            listeners: {
//                                change: 'cbxDateFromDay_changeHandler'
//                            }
//                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'To',
                            width: 106,
                            labelWidth: 31,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 65,
//                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id+'-cmbDateToDay',
//                            fieldStyle: 'text-align: left;',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable:false,
//                            autoSelect: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            valueField: 'code', displayField: 'name',
//                            emptyText: 'All',
//                            labelWidth: 0,
//                            width: 60,
//                            anchor: '100%',
//                            listConfig: {maxHeight: 111, minWidth: 60}
//                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 110},
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '3 0',
                            width: 101
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCountry',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 219,
                            typeAhead: true,
                            valueField: 'A006PAIS',
                            displayField: 'A006NOMBRE',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Code Bank:',
                            padding: '3 0',
                            width: 80
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBank',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 190,
                            typeAhead: true,
                            valueField: 'CODEBANK',
                            displayField: 'IN_CODE_IN_NAME',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 30}
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Merchant Number :',
                            padding: '3 0',
                            width: 120,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Merchant Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtMERCHN',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 20,
                            width: 200,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtFilterValue_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'IATA Number:',
                            padding: '3 0',
                            width: 100,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSAGENT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            width: 120,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtFilterValue_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Card Number:',
                            padding: '3 0',
                            width: 102,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Number'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCard1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 85,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'tarjeta_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: '*****(*)',
                            padding: '3 0',
                            width: 65,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCard2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 65,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'buscarCard_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Card Type:',
                            padding: '3 0',
                            width: 80,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Credit Card Type'
//                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCardType',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            listConfig: {maxHeight: 111},
                            width: 240,
                            typeAhead: true,
                            valueField: 'CODE',
                            displayField: 'NAME',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Source:',
                            padding: '3 0',
                            width: 120
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFTE',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            listConfig: {maxHeight: 111},
                            width: 100,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'PNR :',
                            padding: '3 0',
                            width: 40,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Merchant Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 6,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'BuscarPNR_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 60},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkADYEN',
                            boxLabel: '<b>ADYEN</b>',
                            checked: false,
                            width: 90,
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 400},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgType',
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Sales</b>', inputValue: 'rbSALES', name: 'rbgType', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                {boxLabel: '<b style="color:#148D28;">Refund</b>', inputValue: 'rbREFUND', name: 'rbgType'}
                            ],
                            listeners: {
                                change: 'cmbTranType_changeHandler'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



