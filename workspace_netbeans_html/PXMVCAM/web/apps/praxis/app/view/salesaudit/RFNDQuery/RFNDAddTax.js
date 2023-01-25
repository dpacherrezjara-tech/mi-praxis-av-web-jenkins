/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.RFNDAddTax', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailTicket',
    controller: 'RFNDAddTaxController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.RFNDAddTaxController'
    ],
    id: prototype.id3 + '-win2',
    title: 'ADD TAXES',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 200,
    width: 300,
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
            id: prototype.id3 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id3 + '-txttax',
                            fieldLabel: 'Tax',
                            labelWidth: 50,
                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                            maxLength: 3,
                            enforceMaxLength: 3,
                            value: 'xxx',
                            width: 150,
                            listeners: {
                                change: 'onchange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id3 + '-txttaxamount',
                            fieldLabel: 'Amount',
                            maskRe: /^-?[0-9]*(\.[0-9]{0,2})?$/,
                            labelWidth: 50,
                            width: 190,
                            value: '00.00',
                            listeners: {
                                onAmountRenderer: 'onchange'
                            }
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
                    text: 'Add',
                    id: prototype.id3 + '-btn-add',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onClickAdd'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id3 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

