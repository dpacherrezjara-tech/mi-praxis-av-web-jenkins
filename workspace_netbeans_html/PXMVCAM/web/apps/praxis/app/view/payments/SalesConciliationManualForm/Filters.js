Ext.define('Ext.Praxis.view.payments.SalesConciliationManualForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contFilter',
            margin: '0 7',
            border: false,
            width: 1700,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
//                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
//                padding: '5px 1px 5px 1px',
//                anchor: '100%',
//                hiddenLabel: false,
//                labelAlign: 'right',
//                hidden: false,
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
//                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 300},

                        {
                            xtype: 'combo',
                            fieldLabel: 'Search By:',
                            labelAlign: 'right',
                            id: prototype.id + '-cmbFecFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
//                            width: 150,
                            labelWidth: 65,
                            width: 210,
                            anchor: '100%',
                            value: "CHGDATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            labelStyle: 'font-weight: bold;',
                            listeners: {
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 50,
                            width: 130,
                            anchor: '100%',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            typeAhead: true,
                            listeners: {
                                change: 'onFromDayChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 50,
                            width: 130,
                            anchor: '100%',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            typeAhead: true,
                            listeners: {
                                change: 'onToDayChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            labelStyle: 'font-weight: bold;',
                            fieldLabel: 'Ticket:',
                            id: prototype.id + '-txtTKT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
//                            maxLength: 13,
                            maxLength: 14,
                            labelWidth: 40,
                            width: 185,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFCONCEP',
                            queryMode: 'local',
                            allowBlank: false,
                            fieldLabel: 'Concep:',
                            labelAlign: 'right',
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 300,
                            labelWidth: 57,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            labelStyle: 'font-weight: bold;',
                            listeners: {
                                change: 'onChangeConcep'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-process',
//                            margin: '6 5 5 0',
                            width: 80,
                            html: '<strong style="color:black;">Process</strong>',
                            style: 'background:#70E3EC;color:white;font-weight:bold;',
                            border: true,
                            hidden: true,
                            listeners: {
                                click: 'onConciliation'
                            }
                        },
//                        {xtype: 'tbspacer', width: 30},
//                        {
//                            xtype:'combo',
//                            id: prototype.id+'-cmbCountry',
//                            queryMode: 'local',
//                            allowBlank: false,
//                            fieldLabel: 'Country',
//                            labelAlign: 'right',
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 300,
//                            labelWidth: 57,
//                            typeAhead: true,
//                            valueField: 'A006PAIS',
//                            displayField: 'A006NOMBRE',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            labelStyle: 'font-weight: bold;',
//                            listeners:{
//                            }
//                        },
//                        {xtype: 'tbspacer', width: 2},
//                         {
//                            xtype:'combo',
//                            id: prototype.id+'-cmbSPAYMENT',
//                            queryMode: 'local',
//                            allowBlank: false,
//                            fieldLabel: 'Payment Methods:',
//                            labelAlign: 'right',
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 250,
//                            labelWidth: 150,
//                            typeAhead: true,
//                            valueField: 'code',
//                            displayField: 'name',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            labelStyle: 'font-weight: bold;',
//                            listeners:{
//                            }
//                        },
//                        {xtype: 'tbspacer', width: 35},
//                        {
//                            xtype: 'textfield',
//                            fieldLabel: 'Agent:',
//                            id: prototype.id + '-txtSAGENT',
//                            fieldStyle: 'text-align:center',
//                            allowBlank: true,
//                            maskRe: /[0-9]/,
//                            enforceMaxLength: true,
//                            maxLength: 14,
//                            labelWidth: 40,
//                            width: 140,
//                            enableKeyEvents: true,
//                            
//                            listeners: {
//                                keypress: 'eventKey'
//                            },
//                            labelStyle: 'font-weight: bold;'
//                        },
//                        {xtype: 'tbspacer', width: 45},
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
//                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [

                        {xtype: 'tbspacer', width: 300},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSTVAL',
                            queryMode: 'local',
                            allowBlank: false,
                            fieldLabel: 'Status:',
                            labelAlign: 'right',
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 210,
                            labelWidth: 80,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            labelStyle: 'font-weight: bold;',
                            listeners: {
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            labelStyle: 'font-weight: bold;',
                            fieldLabel: 'Report Numb:',
                            id: prototype.id + '-txtTRANL',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
//                            maxLength: 13,
                            maxLength: 8,
                            labelWidth: 100,
                            width: 230,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},

                        {
                            xtype: 'textfield',
                            labelStyle: 'font-weight: bold;',
                            fieldLabel: 'Sequence:',
                            id: prototype.id + '-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
//                            maxLength: 13,
                            maxLength: 4,
                            labelWidth: 80,
                            width: 225,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Card Number:',
                            padding: '3 0',
                            width: 80,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Number'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSCARDN1',
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
                        {xtype: 'tbspacer', width: 8},
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
                            id: prototype.id + '-txtSCARDN2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 70,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},

                        {
                            xtype: 'textfield',
                            labelStyle: 'font-weight: bold;',
                            fieldLabel: 'Cod. Author:',
                            id: prototype.id + '-txtSAUTHOC',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z0-9]/,
//                            maxLength: 13,
                            maxLength: 6,
                            labelWidth: 80,
                            width: 177,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'eventKey'
                            }
                        },
                    ]

                }
            ]
        }
    ]
});
