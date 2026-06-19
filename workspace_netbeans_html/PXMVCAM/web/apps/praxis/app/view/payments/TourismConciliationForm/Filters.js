Ext.define('Ext.Praxis.view.payments.TourismConciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
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
            hidden: true,
            defaults:  {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
            },
            items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Sale Date</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '8px 30px 0px 10px',
                            hidden: false
                        },
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
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            disabled: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
//                            hidden: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%',
                            listener: {
                                change: 'onDateFromDaySelect',
                                expand: 'eventSelectFromDay'

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
                        {xtype: 'tbspacer', width: 10},

                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            disabled: true,
//                            hidden: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%',
                            listener: {
                                change: 'onDateToDaySelect',
                                expand: 'eventSelectToDay'
                            }
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 15},

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Refer:',
                            id: prototype.id+'-txtReferTur',                                   
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            maxLength:8,
                            labelWidth: 70,
                            width: 180,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            },
                            margin: '0 0 0 5'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Agent:',
                            id: prototype.id+'-txtAGENTE',                                   
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            maxLength:8,
                            labelWidth: 70,
                            width: 180,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            },
                            margin: '0 0 0 5'
                        },

                        {
                            xtype: 'combo',
                            fieldLabel: 'Status: ',
                            id: prototype.id + '-cmbStatus',
                            labelWidth: 70,
                            width: 180,

        //                            fieldLabel: 'Doc',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
        //                            ["", "All"],["72", "Match"], ["73", "Surpluses"], ["74", "Shortages"]
                                    ["", "All"],["3", "Pending"], ["1", "Match"]
                                ]
                            }),
        //                    width: 100,
                            emptyText: 'All',
                            value: '',
                            displayField: 'description',
                            valueField: 'value',
                            queryMode: 'local',
        //                    filterPickList: true,
                            editable: true,
        //                    multiSelect: true,
                            forceSelection: true,

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            fieldLabel: 'Comments: ',
                            id: prototype.id + '-cmbComment',
                            labelWidth: 70,
                            width: 180,

        //                            fieldLabel: 'Doc',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
                                    ["", "All"],["72", "Match"], ["73", "Surpluses"], ["74", "Shortages"]
                                ]
                            }),
        //                    width: 100,
                            emptyText: 'All',
                            value: '',
                            displayField: 'description',
                            valueField: 'value',
                            queryMode: 'local',
        //                    filterPickList: true,
                            editable: true,
        //                    multiSelect: true,
                            forceSelection: true,

                        },
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rgConsulta',
                            fieldLabel: 'View',
                            labelWidth: 60,
                            width: 220,
                            items: [
                                {
                                    boxLabel: 'Detail',
                                    name: 'opcionConsulta',
                                    inputValue: '1',
                                    checked: true, // Seleccionado por defecto
                                    margin: '0 10 0 0' // Separación entre los radios
                                },
                                {
                                    boxLabel: 'Report',
                                    name: 'opcionConsulta',
                                    inputValue: '2'
                                }
                            ],
                            listeners: {
                                change: 'onSwitchView'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},


            ]
        },
        

    ]
});
