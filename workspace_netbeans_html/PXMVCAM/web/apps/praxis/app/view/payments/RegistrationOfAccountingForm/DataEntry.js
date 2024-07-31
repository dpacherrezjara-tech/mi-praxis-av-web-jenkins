Ext.define('Ext.Praxis.view.payments.RegistrationOfAccountingForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRegistrationOfAccountingForm',
    requires: [
        'Ext.Praxis.controller.payments.RegistrationOfAccounting.DataEntryRegistrationOfAccountingController'
    ],
    controller: 'DataEntryRegistrationOfAccountingController',
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
                                    //width: 150,
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lbl01',
                                            name: prototype.id + '-lbl01',
                                            text: 'Mode:', style: 'font-weight: bold; display: inline-block; text-align: right',
                                            width: 80,
                                            padding: '6 0',
                                            labelAlign: 'right',
                                            //margin: '2 2 2 10',                                         
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
                                    //width: 150,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmb01',
                                            fieldLabel: 'Additonal', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["X", "Normal"],
                                                    ["A", "All"],
                                                    ["J", "Adjustment"],
                                                    ["J", "Other Adjustments"],
                                                    ["D", "Debit"],
                                                    ["F", "FP"],
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
                                                    ["  ", "All"],
                                                    ["AX ", "American Express"],
                                                    ["CT ", "Cardnet"],
                                                    ["CO ", "Banco de Bogota"],
                                                    ["BP ", "Banco Pichincha"],
                                                    ["BG ", "Banco Guayaquil"],
                                                    ["PF ", "Banco Pacificar"],
                                                    ["ET ", "Expressnet"],
                                                    ["DC ", "Banco Diners"],
                                                    ["CM ", "Credomatic SV"],
                                                    ["SK ", "Scotiabank"],
                                                    ["WP ", "Worldpay"],
                                                    ["WPP", "Worldpay Pazien"],
                                                    ["BM ", "Banco Maduro"],
                                                    ["LK ", "Linkser"],
                                                    ["IP ", "Izipay"],
                                                    ["CE ", "Cielo"],
                                                    ["DS ", "Discover"],
                                                    ["CO ", "Bancolombia"],
                                                    ["NB ", "Niubiz"],
                                                    ["CO ", "Bancos de Bogota"],
                                                    ["FD ", "First Data"],
                                                    ["CO ", "Banco Davivienda"],
                                                    ["VN ", "Visanet"],
                                                    ["TB ", "Transback"],
                                                    ["CO ", "Banco Colpatria"],
                                                    ["EV ", "Elavon"],
                                                    ["SD ", "Santander"],
                                                    ["BD ", "Bancard"],
                                                    ["PB ", "Banco Produbanco"],
                                                    ["CM ", "Credomatic"],
                                                    ["CM ", "Credomatic GT"],
                                                    ["PM ", "Prisma"],
                                                    ["CO ", "Banco de Occidente"],
                                                    ["CM ", "Credomatic CR"],
                                                    ["IG ", "Ingenico"],

                                                    
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
                                            //height: 26,
                                            value: "  ",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            hidden: true,
                                            listeners: {
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        },
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
                                    id: prototype.id + '-PSTGD1',
                                    fieldLabel: 'Start Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', 
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
                                                Ext.getCmp(prototype.id + '-PSTGD1').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-PSTGD2',
                                    fieldLabel: 'End Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', 
                                    labelWidth: 80,
                                    width: 200, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    hidden: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id + '-PSTGD2').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-PSTGD3',
                                    fieldLabel: 'Closing Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', 
                                    labelWidth: 100,
                                    width: 220, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
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
                                                Ext.getCmp(prototype.id + '-btn-save').focus();
                                            }
                                        }
                                    }
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
                                    xtype: 'textfield',
                                    id: prototype.id + '-USER',
                                    fieldLabel: 'Accountant', labelAlign: 'right', labelStyle: 'font-weight: bold;', 
                                    labelWidth: 80,
                                    width: 200, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    invalidText: 'Ingrese usuario contable',
                                    value: "LUMIRANDA",
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
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