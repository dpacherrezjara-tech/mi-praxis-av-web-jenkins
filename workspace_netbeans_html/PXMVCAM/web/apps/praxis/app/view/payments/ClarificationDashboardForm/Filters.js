Ext.define('Ext.Praxis.view.payments.ClarificationDashboardForm.Filters', {
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
            margin: '0 40',
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
                            xtype:'combo',
                            id: prototype.id+'-cmbFecFiltro',
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
                            listeners:{
                            }
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
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateToYear',
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
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgTDOC',
                            items: [
                                { boxLabel: '<b style="color:#14478D;">Sales</b>', inputValue: 'S', name: 'rbgTDOC', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#14478D;">Refund</b>', inputValue: 'R', name: 'rbgTDOC'}
                            ],
                            listeners: {
                                change: 'cmbTDOC_changeHandler' 
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
                            text: 'Show By :',
                            padding: '3 0',
                            width: 100,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Merchant Number'
//                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgType',
                            items: [
                                { boxLabel: '<b style="color:#148D28;">Month</b>', inputValue: 'MONTH', name: 'rbgType', checked: true },
                                {xtype: 'tbspacer', width: 55},
                                { boxLabel: '<b style="color:#148D28;">Card Type</b>', inputValue: 'SCARCOD', name: 'rbgType',width: 80},
                                {xtype: 'tbspacer', width: 50},
                                { boxLabel: '<b style="color:#148D28;">Bank</b>', inputValue: 'CODEBANK', name: 'rbgType' },
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



