Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: left;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent;"',
                    items: [
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'label',
                            text: 'Select by:',
                            padding: '4 0 0 0',
                            width: 60,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSelectBy',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 150,
                            typeAhead: true,
                            value: 'T',
                            valueField: 'value',
                            displayField: 'description',
                            listeners: {
                                change: 'onChangeSelectBy'
                            },
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
                                    ["T", "Totals by credit card"], ["P", "Pending by credit card"], ["C", "By Clarification"]
                                ]
                            }),
                            listConfig: {maxHeight: 100},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
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

                        {xtype: 'tbspacer', width: 15},

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
                         {xtype: 'tbspacer', width: 20},
                        //</editor-fold>
                        
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '4 0 0 0',
                            width: 60,
                            style: {
                                fontWeight: 'bold'
                            }
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
                            listConfig: {maxHeight: 200},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
//                            style: 'font-weight:bold;color:#0B333C;',
                            padding: '4 0 0 0',
                            text: 'Agent:',
                            width: 40,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAGENCY',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            width: 85,
                            enableKeyEvents: true,
//                            listeners: {
//                                keypress: 'BuscarSAGENT_keyDownHandler'
//                            }
                        },

                        {
                            xtype: 'label',
                            text: 'Percentage:',
                            padding: '4 10 0 20',
                            width: 100,
                            style: {
                                fontWeight: 'bold'
                            }
                        },

                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPercentage',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 50,
                            typeAhead: true,
                            valueField: 'value',
                            value: "",
                            displayField: 'description',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
                                    ["", "All"], ["10", "10%"], ["20", "20%"], ["30", "30%"], ["40", "40%"], ["50", "50%"], ["60", "60%"], ["70", "70%"], ["80", "80%"], ["90", "90%"]
                                ]
                            }),
                            listConfig: {maxHeight: 200},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
//                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Canal:',
                            padding: '4 10 0 20',
                            width: 70,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSource',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["AVCAO", "AVCAO"], ["BSP", "BSP"], ["BSPCO", "BSPCO"],["AMA", "AMA"],["ARC", "ARC"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 70,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
//                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
//                            style: 'font-weight:bold;color:#0B333C;',
                            padding: '4 10 0 20',
                            text: 'Cut.Days:',
                            width: 70,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCUTDAYS',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 60,
                            enableKeyEvents: true,
//                            listeners: {
//                                keypress: 'BuscarSAGENT_keyDownHandler'
//                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Process: ',
                            padding: '4 0 0 0',
                            width: 60,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFECR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
//                            maskRe: /[0-9]/,
                            maxLength: 20,
                            width: 85,
                            enableKeyEvents: true,
                            readOnly: true
//                            listeners: {
//                                keypress: 'BuscarSAGENT_keyDownHandler'
//                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: '-',
                            padding: '4 0 0 0',
                            width: 15,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtHOCR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
//                            maskRe: /[0-9]/,
                            maxLength: 15,
                            width: 85,
                            enableKeyEvents: true,
                            readOnly: true
//                            listeners: {
//                                keypress: 'BuscarSAGENT_keyDownHandler'
//                            }
                        },
//                        {
//                            xtype: 'radiogroup',
////                            fieldLabel: 'Sumary',
//                            padding: '0 0 0 0',
//                            columns: 1,
////                            hidden: true,
//                            vertical: true,
//                            value: '1',
//                            items: [
//                                
//                                { boxLabel: '<b>Sumary</b>',  name: 'opcion', inputValue: '1', checked: true },
//                                { boxLabel: '<b>Detail</b>', name: 'opcion', inputValue: '2' },
//                            ],
//                            listeners: {
//                                change: 'rgChangeReport'
//                            }
//                        },
//                        {xtype: 'tbspacer', width: 15},
                        
                        
                        {xtype: 'tbspacer', width: 1, id: prototype.id + '-hidePENDING',},
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent;"',
                    items: [
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Av Group:',
                            padding: '4 10 0 20',
                            width: 90,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbAviancaGroup',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"],["134", "AVIANCA"],["202", "TACA"],["133", "LACSA"],["547", "AEROGAL"]
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
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Pending',
                            id: prototype.id + '-chkboxTypeRecord',
////                            inputValue: '1', 
//                            uncheckedValue: '0', 
                            margin: '0 0 0 15',
                            listeners: {
                                change: 'onChkboxPending'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Surplus',
                            id: prototype.id + '-chkboxSurplus',
////                            inputValue: '1', 
//                            uncheckedValue: '0', 
                            margin: '0 0 0 15',
                            listeners: {
                                change: 'onChkboxSurplus'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
