/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.DataEntryDetailsFOP
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.SalesMasterReportForm.SalesMasterDataEntryEmail', {
    extend: 'Ext.window.Window',
    alias: 'widget.SalesMasterDataEntryEmail',
    controller: 'SalesMasterDataEntryEmailController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesMasterReportForm.SalesMasterDataEntryEmailController'
    ],
    title: 'Send Report to the Email',
    header: true,
    width: 650,
    id: prototype.idSalesMasterEmail + '-DataEntry-principal',
    height: 230,
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
            id: prototype.idSalesMasterEmail + '-DataEntry-center',
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
                                            id: prototype.idSalesMasterEmail + '-txtCorreoPri',
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
                                            id: prototype.idSalesMasterEmail + '-txtCorreoCopi',
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
                    id: prototype.idSalesMasterEmail + '-btn-save',
                    iconCls: 'prx-icon-process-send',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idSalesMasterEmail + '-btn-cancel',
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