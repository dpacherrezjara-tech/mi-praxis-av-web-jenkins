prototype.idDEEdit = prototype.id + '-CargoSendEditDataEntry';

Ext.define('Ext.Praxis.view.payments.CargoSendForm.DataEntryEditCargoSend', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryEditCargoSendForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoSend.DataEntryEditCargoSendController'
    ],
    controller: 'DataEntryEditCargoSendController',
    title: 'Edit Send Report - Status',
    header: true,
    width: 500,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: { border: false },
    items: [
        {
            xtype: 'form',
            id: prototype.idDEEdit + '-mainForm',
            layout: { type: 'vbox', pack: 'center' },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: { type: 'vbox', pack: 'center' },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: { backgroundColor: '#efe5e5' },
                defaults: {
                    xtype: 'panel',
                    layout: { type: 'hbox', pack: 'left', align: 'middle' },
                    width: '100%',
                    border: false,
                    padding: '6 8 6 8',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 10 0 10',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                {
                    title: '<span style="font-weight:bold;text-decoration-line:underline;font-size:13px;">Report Info</span>',
                    items: [
                        // Fila 1: SREPID (readonly)
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDEEdit + '-txtSREPID',
                                    fieldLabel: 'Report ID',
                                    labelWidth: 90,
                                    width: 220,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center; background:#e8e8e8;'
                                }
                            ]
                        },
                        // Fila 2: File Name (readonly)
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDEEdit + '-txtNAMEFILE',
                                    fieldLabel: 'File Name',
                                    labelWidth: 90,
                                    width: 380,
                                    readOnly: true,
                                    fieldStyle: 'text-align:left; background:#e8e8e8;'
                                }
                            ]
                        },
                        // Fila 3: Status
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: prototype.idDEEdit + '-cmbSTVAL',
                                    fieldLabel: 'Status',
                                    labelWidth: 90,
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: false,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['0', 'Generated'],
                                            ['1', 'Sent'],
                                            ['2', 'Reverse']
                                        ]
                                    })
                                }
                            ]
                        }
                    ]
                }
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
            layout: { pack: 'center' },
            fieldStyle: 'text-align:center',
            defaults: { scale: 'medium' },
            items: [
                {
                    text: 'Save',
                    id: prototype.idDEEdit + '-btn-process',
                    iconCls: 'prx-icon-image-process',
                    listeners: { click: 'onSaveClick' }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDEEdit + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: { click: 'onCancelClick' }
                }
            ]
        }
    ]
});
