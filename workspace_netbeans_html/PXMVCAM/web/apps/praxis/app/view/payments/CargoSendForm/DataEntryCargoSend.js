prototype.idDE = prototype.id + '-CargoSendDataEntry';

Ext.define('Ext.Praxis.view.payments.CargoSendForm.DataEntryCargoSend', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCargoSendForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoSend.DataEntryCargoSendController'
    ],
    controller: 'DataEntryCargoSendController',
    title: 'Process Accounting - Form',
    header: true,
    width: 640,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5'
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left',
                        align: 'middle'
                    },
                    width: '100%',
                    border: false,
                    padding: '6 8 6 8',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 10 0 10',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: true
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Parameters">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Parameters</span>',
                    items: [
                        // Fila 1: Report Type | Country
                        {
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbReportType',
                                    fieldLabel: 'Report Type',
                                    labelWidth: 85,
                                    width: 210,
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: 'PSE',
                                    margin: '0 10 0 10',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PSE',    'PSE'],
                                            ['NO_PSE', 'NO PSE']
                                        ]
                                    }),
                                    listeners: {
                                        change: 'filterCountriesByReportType'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbCountry',
                                    fieldLabel: 'Country',
                                    labelWidth: 60,
                                    width: 230,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    queryMode: 'local',
                                    editable: true,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    typeAhead: true,
                                    minChars: 1,
                                    anyMatch: true,
                                    caseSensitive: false,
                                    allowBlank: false,
                                    emptyText: 'Select or type...',
                                    listConfig: { maxHeight: 130 }
                                }
                            ]
                        },
                        // Fila 2: Date Type | From | To
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: prototype.idDE + '-cmbDateType',
                                    fieldLabel: 'Date Type',
                                    labelWidth: 85,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    readOnly: true,
                                    value: 'ADATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['ADATE', 'Adate']
                                        ]
                                    })
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.idDE + '-dtFrom',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true,
                                    labelWidth: 40,
                                    width: 145,
                                    value: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.idDE + '-dtTo',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: true,
                                    labelWidth: 25,
                                    width: 125,
                                    value: new Date()
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Process',
                    id: prototype.idDE + '-btn-process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
