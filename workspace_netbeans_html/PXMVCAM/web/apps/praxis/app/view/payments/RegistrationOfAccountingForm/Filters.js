Ext.define('Ext.Praxis.view.payments.RegistrationOfAccountingForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter1',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            hidden: false,
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
                    xtype: 'combo',
                    id: prototype.id + '-cmbAirline',
                    fieldLabel: 'Client', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["133", "Lacsa"],
                            ["134", "Avianca"],
                            ["202", "Taca"],
                            ["547", "Aerogal"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    width: 240,
                    //height: 26,
                    value: "134",
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    padding: '6 0',
                    listeners: {
                        //change: 'cmbfiltro_clickHandler'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbMode',
                    fieldLabel: 'Mode', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            [" ", "Todos"],
                            ["P", "Pasaje"],
                            ["A", "Carga"],
                            ["C", "Correo"],
                            ["J", "Ajuste"],
                            ["D", "Debito"],
                            ["E", "Exterior"],
                            ["F", "FP"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    width: 200,
                    //height: 26,
                    value: " ",
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    padding: '6 0',
                    listeners: {
                        //change: 'cmbfiltro_clickHandler'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbProcessor',
                    fieldLabel: 'Processor', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["   ", "Todos"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    width: 240,
                    //height: 26,
                    value: "   ",
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    padding: '6 0',
                    listeners: {
                        //change: 'cmbfiltro_clickHandler'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAccountingId',
                    fieldLabel: 'Accounting Id', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    autoSelect: false,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    typeAhead: true,
                    width: 300,
                    //height: 26,
                    value: "",
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    padding: '6 0',
                    listeners: {
                        //change: 'cmbfiltro_clickHandler'
                    }
                }
            ]
        },
        {
            xtype: 'form',
            id: prototype.id + '-contFilter2',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            hidden: false,
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
                    xtype: 'combo',
                    id: prototype.id + '-cmbdateType',
                    fieldLabel: 'Filter By', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["1", "Processing Date"],
                            ["2", "Generation Date"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    width: 240,
                    //height: 26,
                    value: "1",
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    padding: '6 0',
                    listeners: {
                        //change: 'cmbfiltro_clickHandler'
                    }
                },
                {
                    xtype: 'datefield',
                    id: prototype.id + '-fecha1',
                    fieldLabel: 'Date from', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    width: 200,
                    format: 'Ymd', value: new Date(),
                    minValue: new Date(1990, 00, 01),
                    maskRe: /[0-9/]/,
                    editable: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 10,
                    listeners: {
                        keypress: function (obj, e) {
                            if (e.getKey() === e.ENTER) {
                                Ext.getCmp(prototype.id + '-fecha2').focus();
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    id: prototype.id + '-fecha2',
                    fieldLabel: 'Date to', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                    width: 200,
                    format: 'Ymd', value: new Date(),
                    minValue: new Date(1990, 00, 01),
                    maskRe: /[0-9/]/,
                    editable: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 10,
                    listeners: {
                        keypress: function (obj, e) {
                            if (e.getKey() === e.ENTER) {
                                //Ext.getCmp(prototype.id + '-fecha2').focus();
                            }
                        }
                    }
                }
            ]
        }
    ]
});
