Ext.define('Ext.Praxis.view.payments.BankStatementExtractForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBankStatementExtractForm',
    requires: [
        'Ext.Praxis.controller.payments.BankStatementExtract.DataEntryBankStatementExtractController'
    ],
    controller: 'DataEntryBankStatementExtractController',
    title: 'Log - Data Entry Form',
    width: 950,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    items: [
        {
            xtype: 'form',
            padding: 15,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                margin: '5 0',
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    labelStyle: 'font-size: 13px; font-weight: bold;',
                    fieldStyle: 'text-align: center;',
                    readOnly: true,
                    flex: 1,
                    margin: '0 5',
                    maxLength: 30,
                    enforceMaxLength: true
                }
            },
            items: [
                {
                    items: [
                        { fieldLabel: 'Value Date', id: prototype.id + '-valueDate' },
                        { fieldLabel: 'Host Shipping', id: prototype.id + '-hostShipping' },
                        { fieldLabel: 'Hour Received', id: prototype.id + '-hourReceived' }
                    ]
                },
                {
                    items: [
                        { fieldLabel: 'Processor', id: prototype.id + '-processor' },
                        { fieldLabel: 'Date Create', id: prototype.id + '-dateCreate' },
                        { fieldLabel: 'State', id: prototype.id + '-state'}
                       
                    ]
                },
                {
                    items: [
                        { fieldLabel: 'Creation Time', id: prototype.id + '-creationTime' },
                        { fieldLabel: 'Date Received', id: prototype.id + '-dateReceived' },
                        {
                            fieldLabel: 'Message',
                            id: prototype.id + '-message',
                            readOnly: false
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
            margin: '10 0 10 0',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: { click: 'onSaveClick' }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: { click: 'onUpdateClick' }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: { click: 'onDeleteClick' }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: { click: 'onCancelClick' }
                }
            ]
        }
    ]
});
