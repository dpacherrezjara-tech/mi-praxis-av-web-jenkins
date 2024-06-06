Ext.define('Ext.Praxis.view.payments.ForecastPaymentForm.Filters', {
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
                        {xtype: 'tbspacer', width: 100},
//                        {
//                            xtype: 'label',
//                            text: 'Search By:',
////                            padding: '8 0 0 0',
//                            width: 65,
//                            style: {
//                                fontWeight: 'bold'
//                            }
//                        },
//                        {
//                            xtype: 'combo',
//                            fieldLabel: 'Search By:',
//                            labelAlign: 'right',
//                            id: prototype.id + '-cmbFecFiltro',
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
////                            width: 150,
//                            labelWidth: 65,
//                            width: 210,
//                            anchor: '100%',
//                            value: "CHGDATE",
//                            typeAhead: true,
//                            valueField: 'code',
//                            displayField: 'name',
////                            listConfig: {minWidth: 130},
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            labelStyle: 'font-weight: bold;',
//                            listeners: {
//                            }
//                        },
//                        {xtype: 'tbspacer', width: 40},
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
                        {xtype: 'tbspacer', width: 30},
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbDateToYear',
//                            fieldLabel: 'To',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            editable: false,
//                            triggerAction: 'all',
//                            autoSelect: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            hidden: false,
//                            valueField: 'code',
//                            displayField: 'name',
//                            emptyText: 'All',
//                            labelWidth: 50,
//                            width: 130,
//                            anchor: '100%',
//                            labelStyle: 'font-weight: bold;'
//                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbDateToMonth',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable: false,
//                            autoSelect: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            hidden: false,
//                            valueField: 'code',
//                            displayField: 'name',
//                            emptyText: 'All',
//                            width: 60,
//                            anchor: '100%'
//                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbDateToDay',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable: false,
//                            autoSelect: true,
//                            enableKeyEvents: true,
//                            forceSelection: true,
//                            caseSensitive: false,
//                            valueField: 'code', displayField: 'name',
//                            emptyText: 'All',
//                            width: 60,
//                            typeAhead: true,
//                            listeners: {
//                                change: 'onToDayChange',
//                                keypress: 'onTextKeypress'
//                            }
//                        },
//                        {
//                            xtype: 'combo',
//                            fieldLabel: 'Source Code',
//                            id: prototype.id + '-cmbIN_FTE',
//                            fieldStyle: 'text-align: left;',
//                            queryMode: 'local',
//                            editable: false,
//                            valueField: 'code',
//                            hidden:true,
//                            displayField: 'name',
//                            labelWidth: 110,
//                            width: 220
//                        },
//                        {xtype: 'tbspacer', width: 30},
//                        {
//                            xtype: 'label',
//                            text: 'Country:',
//                            allowBlank: true,
////                            padding: '8 0 0 0',
//                            style: {
//                                fontWeight: 'bold'
//                            },
//                            width: 57
//                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCountry',
                            queryMode: 'local',
                            allowBlank: false,
                            fieldLabel: 'Country',
                            labelAlign: 'right',
                            forceSelection: true,
                            selectOnFocus: true,
        //                          maskRe: /[0-9]/,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 300,
                            labelWidth: 57,
                            typeAhead: true,
                            valueField: 'A006PAIS',
                            displayField: 'A006NOMBRE',
                            //listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            labelStyle: 'font-weight: bold;',
                            listeners:{
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
//                        {
//                            xtype: 'label',
//                            text: 'CC Type:',
////                            padding: '8 0',
//        //                    fieldStyle: 'font-weight: bold;',
//                            width: 66,
//                            style: {
//                                fontWeight: 'bold'
//                            },
//                            autoEl: {
//                            tag: 'label',
//                            'data-qtip': 'Credit Card Type'
//                            }
//                        },
//                        {
//                            xtype:'combo',
//                            id: prototype.id+'-cmbCardType',
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            fieldLabel: 'Card Type',
//                            labelAlign: 'right',
//                            width: 300,
//                            labelWidth: 66,
//                            typeAhead: true,
//                            valueField: 'CODE', displayField: 'NAME',
////                            listConfig: {maxHeight: 111},
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            labelStyle: 'font-weight: bold;',
//                            listeners:{
//                            }
//                        },
                        
                        
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
                        {xtype: 'tbspacer', width: 100},
                        
        //                {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Payment Methods:',
                            id: prototype.id + '-txtSAUTHOC',
                            allowBlank: true,
        //                    maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            maxLength: 6,
                            labelWidth: 80,
                            width: 210,
        //                    hidden:true,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            },
                            labelStyle: 'font-weight: bold;'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Agent:',
                            id: prototype.id + '-txtMERCHN',
                            allowBlank: true,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            maxLength: 14,
                            labelWidth: 100,
                            width: 250,
        //                    hidden:true,
                            enableKeyEvents: true,
                            
                            listeners: {
                                keypress: 'eventKey'
                            },
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Status',
                            id: prototype.id + '-cmbSTATT',
                            fieldStyle: 'text-align: left;',
                            queryMode: 'local',
                            editable: false,
                            valueField: 'code',
                            hidden:true,
                            displayField: 'name',
                            labelWidth: 80,
                            width: 270
                        }
                    ]
                }
                
            ]
        }
    ]
});
