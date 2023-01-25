Ext.define('Ext.Praxis.view.program.ProPaymentsControlForm.Filters', {
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
                    margin: '0 0 2 0',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbType',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 125,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                select: 'cmbType_clickHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Sales Date',
                            padding: '3 0',
                            width: 60,
                            id: prototype.id+'-lblDate'
                        },
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
                            width: 125,
                            hidden: true,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {xtype: 'tbspacer', width: 5},
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
                            listConfig: {maxHeight: 111, minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true,
                            listeners: {
                                change: 'cbxDateFromMonth_changeHandler'
                            }
                        },
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
                            listConfig: {maxHeight: 111, minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Source:',
                            id: prototype.id+'-lblFTE',
                            padding: '3 0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbFTE',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 80,
//                            readOnly: true,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                select: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Type of Sale:',
                            id: prototype.id+'-lblTARJ',
                            padding: '3 0',
                            width: 75
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbTARJ',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 90,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                select: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgType',
                            items: [
                                { boxLabel: '<b style="color:#148D28;">Sales</b>', inputValue: 'S', name: 'rbgTDOC', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#148D28;">Refund</b>', inputValue: 'R', name: 'rbgTDOC'}
                            ],
                            listeners: {
                                change: 'btnSearch_click' 
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    id: prototype.id+'-hboxFilter2',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '3 0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbPais',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 180,
//                            readOnly: true,
                            typeAhead: true,
                            valueField: 'A006PAIS', 
                            displayField: 'A006NOMBRE',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {xtype: 'tbspacer', width: 75},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-chkEECC',
                            boxLabel: '<b>Statement</b>',
                            checked: false,
                            width: 90,
                            listeners:{
                                change: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 56},
                        {
                            xtype: 'label',
                            text: 'Bank Status:',
                            id: prototype.id+'-lblFINSUMO',
                            padding: '3 0',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbFINSUMO',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 120,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                select: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 35},
                        {
                            xtype: 'label',
                            text: 'Code Bank:',
                            padding: '3 0',
                            width: 70
                        },
                        {xtype: 'tbspacer', width: 10},
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
                            width: 202,
                            typeAhead: true,
                            valueField: 'CODEBANK', 
                            displayField: 'NAMEBANK',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter1',
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
                    margin: '0 0 2 0',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Select by :',
                            style: 'font-weight:bold;',
                            padding: '3 0',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgSELEC',
                            items: [
                                { boxLabel: '<b style="color:#046AAA;">Month</b>', inputValue: 'MONTH', name: 'rbgSELEC', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#046AAA;">Country</b>', inputValue: 'COUNTRY', name: 'rbgSELEC'},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#046AAA;">Card</b>', inputValue: 'CARD', name: 'rbgSELEC'}
                            ],
                            listeners: {
                                change: 'btnSearch_click' 
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Show by:',
                            id:prototype.id+'-lblShow',
                            padding: '3 0',
//                            hidden: true,
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCASH',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
//                            hidden: true,
                            width: 100,
//                            readOnly: true,
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                select: 'btnSearch_click'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter2',
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
                    margin: '0 0 2 0',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Select by :',
                            style: 'font-weight:bold;',
                            padding: '3 0',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgPEM',
                            items: [
                                { boxLabel: '<b style="color:#046AAA;">POS</b>', inputValue: 'POS', name: 'rbgPEM', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#046AAA;">Month</b>', inputValue: 'MONTH', name: 'rbgPEM'}
                            ],
                            listeners: {
                                change: 'btnSearch_click' 
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter3',
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
                    margin: '0 0 2 0',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Show by:',
                            style: 'font-weight:bold;',
                            padding: '3 0',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'radiogroup',
                            id:prototype.id+'-rbgFlag',
                            items: [
                                { boxLabel: '<b style="color:#046AAA;">Month</b>', inputValue: 'MONTH', name: 'rbgFlag', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#046AAA;">Card Type</b>', inputValue: 'SCARCOD', name: 'rbgFlag',width: 80},
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#046AAA;">Bank</b>', inputValue: 'CODEBANK', name: 'rbgFlag'}
                            ],
                            listeners: {
                                change: 'btnSearch_click' 
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkTOT',
//                            margin: '0 20 0 30',
                            width: 80,
                            boxLabel: '<b>Detail</b>',
                            inputValue: '1',
                            listeners: {
                                change: 'ChangeCheckTotal' 
                            }
                        }
                        
                        
                    ]
                }
            ]
        }
    ]
});



