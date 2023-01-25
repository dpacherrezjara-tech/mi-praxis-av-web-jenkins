/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.MasterTaxdigitsForm.DataEntryMasterTaxdigitsForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryControlBsplinkForm',

    controller: 'DataEntryMasterTaxdigitsFormController',

    requires: [
        'Ext.Praxis.controller.salesaudit.MasterTaxdigitsForm.DataEntryMasterTaxdigitsFormController',
    ],
    id: prototype.idDataEntryMasterTaxdigitsForm + '-win',

    title: 'Maintenance Master Tax 3 Digits',
    header: true,
    height: 430,
    width: 550,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idDataEntryMasterTaxdigitsForm + '-form',
            defaults: {
                style: 'margin: 5px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTax',
                            fieldLabel: 'Cod. Tax',
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 130,
                            maxLength: 3,
                            enforceMaxLength: 3,
                            width: 200,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTaxUse',
                            fieldLabel: 'Cod. Tax to Use',
                            maxLength: 2,
                            enforceMaxLength: 2,
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            labelWidth: 130,
                            width: 300,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textareafield',
                            id: prototype.idDataEntryMasterTaxdigitsForm + '-txtDescription',
                            //name: 'message',
                            fieldLabel: 'Description',
                            maxLength: 45,
                            enforceMaxLength: 45,
                            labelWidth: 130,
                            width: 500,
                            afterLabelTextTpl: '<b style="color: #BF6868;float: right;"> (*)</b>',
                            anchor: '100%'
                        }

                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields</b>',
                    labelWidth: 200,
                    labelSeparator: ''
                },
                {
                    xtype: 'fieldset',
                    title: 'Control data',
                    border: true,
                    defaults: {
                        border: false,
                        margin: 3
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryMasterTaxdigitsForm + '-txtREGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryMasterTaxdigitsForm + '-txtFREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryMasterTaxdigitsForm + '-txtHREGI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryMasterTaxdigitsForm + '-txtREVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryMasterTaxdigitsForm + '-txtFREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryMasterTaxdigitsForm + '-txtHREVI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.idDataEntryMasterTaxdigitsForm + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDataEntryMasterTaxdigitsForm + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDataEntryMasterTaxdigitsForm + '-btn-delete',
                    iconCls: 'prx-icon-delete', hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDataEntryMasterTaxdigitsForm + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});