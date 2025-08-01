Ext.define('Ext.Praxis.view.payments.BankStatementExtractForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryBankStatementExtractForm',
    requires: [
        'Ext.Praxis.controller.payments.BankStatementExtract.DataEntryBankStatementExtractController'
    ],
    controller: 'DataEntryBankStatementExtractController',
    title: 'Log - Data Entry Form',
    width: 895,
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
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    width: 870,
                    defaults: {
                        layout: 'hbox',
                        margin: '5 0 0 0',
                        defaults: {
                            margin: '0 5 0 0',
                            labelWidth: 109,
                            width: 400,
                            readOnly: true,
                            xtype: 'textfield',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 30
                        }
                    },
                    items: [
                        {
                            items: [
                                { fieldLabel: 'Value Date', id: prototype.id + '-valueDate' },
                                { fieldLabel: 'Processor', id: prototype.id + '-processor' }
                            ]
                        },
                        {
                            items: [
                                { fieldLabel: 'State', id: prototype.id + '-state' },
                                { fieldLabel: 'Message', id: prototype.id + '-message' ,readOnly: false}
                            ]
                        },
                        {
                            items: [
                                { fieldLabel: 'Host Shipping', id: prototype.id + '-hostShipping' },
                                { fieldLabel: 'Date Create', id: prototype.id + '-dateCreate' }
                            ]
                        },
                        {
                            items: [
                                { fieldLabel: 'Creation Time', id: prototype.id + '-creationTime' },
                                { fieldLabel: 'Date Received', id: prototype.id + '-dateReceived' }
                            ]
                        },
                        {
                            items: [
                                { fieldLabel: 'Hour Received', id: prototype.id + '-hourReceived' },
                                { xtype: 'displayfield', width: 400 } // espacio vacío para emparejar filas
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
            margin: '3 0 20 0',
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
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }   
                },
                { xtype: 'tbspacer', width: 30 }
            ]
        }
    ]
});