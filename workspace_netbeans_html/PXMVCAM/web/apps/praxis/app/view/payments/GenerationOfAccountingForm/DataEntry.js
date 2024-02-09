Ext.define('Ext.Praxis.view.payments.GenerationOfAccountingForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryGenerationOfAccountingForm',
    requires: [
        'Ext.Praxis.controller.payments.GenerationOfAccounting.DataEntryGenerationOfAccountingController'
    ],
    controller: 'DataEntryGenerationOfAccountingController',
    title: 'Generate file interface',
    header: true,
//    height:920,
    width: 550,
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
                    layout: 'hbox',
                    width: '100%',
                    padding: '5 0 0 0',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 5 1 1',                            
                            width: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: prototype.id + '-op01',
                                    name: prototype.id + '-op',
                                    boxLabel: 'File Interface',
                                    margin: '2 2 2 10',
                                    checked: true
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
                                    xtype: 'datefield',
                                    id: prototype.id + '-PSTGD1',
                                    fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 90,
                                    width: 190, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
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
                                                Ext.getCmp(prototype.id + '-PSTGD2').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-PSTGD2',
                                    fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 160, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    hidden:true,
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
                        }
                    ]
                },               
                {
                    xtype: 'label',
                    padding: '0 0 0 5',
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