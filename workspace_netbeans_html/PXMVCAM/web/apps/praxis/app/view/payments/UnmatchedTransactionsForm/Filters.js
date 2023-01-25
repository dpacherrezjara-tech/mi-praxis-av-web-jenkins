Ext.define('Ext.Praxis.view.payments.UnmatchedTransactionsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter',
            margin: '0 50',
            border: false,
            width: 1210,
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
                            xtype: 'label',
                            id: prototype.id + '-lblFechaFiltro',
                            labelAlign: 'center',
                            labelStyle: 'color:#231223',
                            align: 'center',
                            style: 'font-weight:bold;',
                            margin: '10 0 0 0',
                            hide: true
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateFromYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 130,
                            labelWidth: 45,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', 
                            displayField: 'name',
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
                            id: prototype.id+'-cmbDateFromMonth',
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
//                      
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateToYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'To',
                            width: 105,
                            labelWidth: 20,
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
                            id: prototype.id+'-cmbDateToMonth',
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
//                        
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Reconciliation:',
                            padding: '3 0',
                            width: 74
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbPhase',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 101,
                            typeAhead: true,
                            listConfig: {minWidth: 140},
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                change: 'cmbPhase_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            text: 'Status:',
                            padding: '3 0',
                            width: 40,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Credit Card Type'
//                            }
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbSTVAL',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            listConfig: {maxHeight: 111},
                            width: 190,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgType',
                            items: [
                                { boxLabel: '<b style="color:#148D28;">Sales</b>', inputValue: 'Sales', name: 'rbgType', checked: true },
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#148D28;">Refund</b>', inputValue: 'Refund', name: 'rbgType' }
                            ],
                            listeners: {
                                change: 'cmbTranType_changeHandler' 
                            }
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
                            text: 'CC Type:',
                            padding: '3 0',
                            width: 65,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Type'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCardType',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 225,
                            typeAhead: true,
                            valueField: 'CODE', displayField: 'NAME',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 45},
                        {
                            xtype: 'label',
                            text: 'CC Number:',
                            padding: '3 0',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Number'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtCard',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 19,
                            width: 245,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'txtFilterValue_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            text: 'Merchant:',
                            padding: '3 0',
                            width: 65
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtMERCHN',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9a-zA-Z]/,      
                            maxLength: 20,
                            width: 190,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'txtFilterValue_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},  
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-chkControl',
                            boxLabel: 'Control',
                            checked: false,
                            width: 90,
                            listeners:{
                                change: 'btnSearch_click'
                            }
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    id: prototype.id+'-boxVenta',
                    hidden: true,
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ticket Number:',
                            padding: '3 0',
                            width: 85
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtTicket',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 13,
                            width: 225,
//                            value: '1391510480101',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            }  
                        },                       
                        {xtype: 'tbspacer', width: 45},
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '3 0',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCountry',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 245,
                            typeAhead: true,
                            valueField: 'A006PAIS', displayField: 'A006NOMBRE',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                            }
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            text: 'FOP:',
                            padding: '3 0',
                            width: 55
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbFOP',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    ["", "All"], ["CC", "Credit Card"], ["CA", "Cash"]
//                                ]
//                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 110,
//                            value: "CC",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'label',
                            text: 'Source:',
                            padding: '3 0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbSource',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    ["", "All"], ["B", "BSP"], ["S", "ASR"], ["A", "ARC"]
//                                ]
//                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
//                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                    ]
                }
            ]
        }
    ]
});



