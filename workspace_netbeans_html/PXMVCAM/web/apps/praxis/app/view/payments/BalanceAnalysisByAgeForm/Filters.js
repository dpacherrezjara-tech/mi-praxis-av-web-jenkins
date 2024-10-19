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

                        //</editor-fold>
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '4 10 0 20',
                            width: 80,
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
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
//                            style: 'font-weight:bold;color:#0B333C;',
                            padding: '4 10 0 20',
                            text: 'Agent:',
                            width: 55,
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
                            width: 100,
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
                                    ["", "All"], ["AVCAO", "AVCAO"], ["BSP", "BSP"], ["BSPCO", "BSPCO"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                    ]
                },
            ]
        }
    ]
});
