Ext.define('Ext.Praxis.view.payments.ClarificationFileLinkForm.Filters', {
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
            width: 1200,
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
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["IATADATE", "Sending Date (to Office)"], ["SENTDATE", "Remittance Date"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 150,
                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
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
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
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
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 60,
                            anchor: '100%',
                            listConfig: {maxHeight: 111, minWidth: 60},
                            listeners: {
                                change: 'cbxDateFromDay_changeHandler'
                            }
                        },
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
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 60,
                            anchor: '100%',
                            listConfig: {maxHeight: 111, minWidth: 60}
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBank',
                            fieldStyle: 'text-align: left;',
                            fieldLabel: 'Code Bank',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'CODEBANK',
                            displayField: 'IN_CODE_IN_NAME',
                            emptyText: 'All',
                            labelWidth: 90,
                            width: 260
                        },
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
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Card Number:',
                            padding: '3 0',
                            width: 102,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Card Number'
                            }
                        },
                         {xtype: 'tbspacer', width: 60},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCardF1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 85,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'tarjeta_keyDownHandler',
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
                            id: prototype.id + '-txtCardF2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 65,
                            enableKeyEvents: true,
                            listeners: {
//                                keypress: 'BuscarTKT_keyDownHandler'
                                keypress: 'buscarCard_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '3 0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 10},
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
                            width: 236,
                            typeAhead: true,
                            valueField: 'A006PAIS', displayField: 'A006NOMBRE',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgType',
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Pending</b>', inputValue: 'PENDING', name: 'rbgType', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                {boxLabel: '<b style="color:#148D28;">Linked</b>', inputValue: 'LINKED', name: 'rbgType'}
                            ],
                            listeners: {change: 'btnSearch_click'}
                        }
                    ]
                }

            ]
        }
    ]
});



