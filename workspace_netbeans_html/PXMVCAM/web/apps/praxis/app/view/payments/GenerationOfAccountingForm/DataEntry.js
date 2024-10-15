Ext.define('Ext.Praxis.view.payments.GenerationOfAccountingForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryGenerationOfAccountingForm',
    requires: [
        'Ext.Praxis.controller.payments.GenerationOfAccounting.DataEntryGenerationOfAccountingController'
    ],
    controller: 'DataEntryGenerationOfAccountingController',
    title: 'Processing',
    header: true,
//    height:920,
    width: 650,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            padding: '5 0 0 0',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-form01',
                    layout: 'vbox',
                    width: '100%',
                    padding: '5 0 0 0',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '5 5 1 1',
                            //width: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: prototype.id + '-op00',
                                    name: prototype.id + '-op',                                    
                                    boxLabel: 'Accounting',
                                    margin: '2 2 2 10',
                                    checked: false,
                                    disabled:true,
                                    hidden:true
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '5 5 1 1',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CCUST',
                                            fieldLabel: 'Airline', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["133", "LACSA"],
                                                    ["134", "AVIANCA"],
                                                    ["202", "TACA"],
                                                    ["547", "AEROGAL"]
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
                                            labelWidth: 80,
                                            padding: '6 0',
                                            width: 200,
                                            value: "134",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '5 5 1 1',
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lbl01',
                                            name: prototype.id + '-lbl01',
                                            text: 'Mode:', style: 'font-weight: bold; display: inline-block; text-align: right',
                                            width: 80,
                                            padding: '6 0',
                                            labelAlign: 'right'                                     
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: prototype.id + '-op01',
                                            name: prototype.id + '-mod',
                                            boxLabel: 'Colombia',
                                            margin: '2 2 2 10',
                                            checked: true,
                                            listeners: {
                                                change: 'cmbModo_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: prototype.id + '-op02',
                                            name: prototype.id + '-mod',
                                            boxLabel: 'Exterior',
                                            margin: '2 2 2 10',
                                            checked: false,
                                            listeners: {
                                                change: 'cmbModo_clickHandler'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '5 5 1 1',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmb01',
                                            fieldLabel: 'Additonal', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["X", "Normal"],
                                                    ["J", "Adjustment"],
                                                    ["D", "Debit"],
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
                                            labelWidth: 80,
                                            width: 200,
                                            //height: 26,
                                            value: "X",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmb02',
                                            fieldLabel: 'Processor', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["   ", "All"]
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
                                            labelWidth: 80,
                                            width: 220,
                                            value: "   ",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            hidden: true
                                        }
                                    ]

                                }
                            ]
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 0 10 0', //top left bottom  righ
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-PSTGD',
                                    fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', 
                                    labelWidth: 80,
                                    width: 200, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id + '-PSTGD').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'label',
                    padding: '10 0 10 0',                    
                    html: '<font color="green"><h3 id="GenerationOfAccountingFormMsg">...</h3></font>'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Process',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);