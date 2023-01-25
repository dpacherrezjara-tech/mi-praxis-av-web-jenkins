Ext.define('Ext.Praxis.view.payments.BankAccountingVoucherForm.Filters', {
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
                            xtype: 'label',
                            text: 'Transaction Month : ',
                            padding: '3 0',
                            width: 137
                        },
                        {xtype: 'tbspacer', width: 10},
                        //<editor-fold defaultstate="collapsed" desc="cmbDate">
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateFromYear',
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
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Bank Code : ',
                            padding: '3 0',
                            width: 80
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbBank',
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
                            displayField: 'NAMEBANK',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Authorization Code : ',
                            padding: '3 0',
                            width: 140
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtAUTHOC',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9a-zA-Z]/,      
                            maxLength: 8,
                            width: 100,
                            enableKeyEvents: true,
//                            listeners:{
//                                keypress: 'txtFilterValue_keyDownHandler'
//                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Merchant Nbr. : ',
                            padding: '3 0',
                            width: 105
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtMER',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 13,
                            width: 120,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarMER_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Currency : ',
                            padding: '3 0',
                            width: 90
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtSCURRENCY',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[a-zA-Z]/,      
                            maxLength: 3,
                            width: 50,
                            enableKeyEvents: true,
                            listeners:{
                                change: function(field, newValue){
                                    field.setValue(newValue.toUpperCase());
                                 } 
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id+'-boxSubFilter',
                    hidden:true,
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        
                        {
                            xtype: 'label',
                            text: 'Transaction Code : ',
                            padding: '3 0',
                            width: 137
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCTRAN',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 190,
                            typeAhead: true,
                            valueField: 'CTRAN', 
                            displayField: 'DESCEECC',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Policy : ',
                            padding: '3 0',
                            width: 137
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbPolicy',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 190,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                    ]
                }
            ]
        }
    ]
});



