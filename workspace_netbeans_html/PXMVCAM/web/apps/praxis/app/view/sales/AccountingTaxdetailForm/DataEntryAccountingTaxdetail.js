/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingTaxdetailForm.DataEntryAccountingTaxdetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idDataEntryAccountingTax + '-DataEntryAccountingTaxdetail',
    controller: prototype.idDataEntryAccountingTax + '-DataEntryAccountingTaxdetailController',
    requires: [
        'Ext.Praxis.controller.sales.AccountingTaxdetailForm.DataEntryAccountingTaxdetailController'
    ],
    title: 'Send Report to the Email',
    header: true,
    width: 650,
    height: 230,    
    id: prototype.idDataEntryAccountingTax + '-DataEntry-center',
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',            
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 600,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">To :</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            id: prototype.idDataEntryAccountingTax + '-txtCorreoPri',
                                            width: 500,
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            listeners: {
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Cc :</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            id: prototype.idDataEntryAccountingTax + '-txtCorreoCopi',
                                            width: 500,
                                            listeners: {
                                            }
                                        }

                                    ]
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
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.idDataEntryAccountingTax + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDataEntryAccountingTax + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDataEntryAccountingTax + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDataEntryAccountingTax + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
                ,
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 400,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:red;font-size:13px;">(*)The emails have to be separated by semicolons ";"</strong>'

                }
            ]
        }
    ]
});