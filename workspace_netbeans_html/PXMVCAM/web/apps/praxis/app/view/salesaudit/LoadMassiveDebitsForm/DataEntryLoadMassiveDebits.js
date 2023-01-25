/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.LoadMassiveDebitsForm.DataEntryLoadMassiveDebits', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadMassiveDebits',
    controller: 'DataEntryLoadMassiveDebitsController',
    requires: [
        'Ext.Praxis.controller.salesaudit.LoadMassiveDebitsForm.DataEntryLoadMassiveDebitsController'
    ],
    title: 'Pending by Debit Massive',
    header: true,
    height: 700,
    width: 1300,
    border: false,
     id: prototype.id2 + '-win',
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id2 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id2 + '-gridgrouping',
                            columnLines: true,
                            autoScroll: true,
                            features: [{ftype: 'grouping', startCollapsed: false}],
                            width: 1270,
                            height: 600,
                            selModel: {
                                check: true,
                                selType: 'checkboxmodel'

                            },
                            columns: {
                                items: [
                                    {text: 'GROUPED', dataIndex: 'A2552TKT', width: 110},
                                    {text: 'AGEN', dataIndex: 'A2552IATA', width: 80},
                                    {text: 'SOURCE', dataIndex: 'A2552FUENT', width: 50},
                                    {text: 'TRNCU', dataIndex: 'A2552TRNCU', width: 50},

                                    {text: 'FARE', dataIndex: 'A2552TARIF', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'TAX', dataIndex: 'A2552TAX', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'COMI', dataIndex: 'A2552COMI', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'S. COMI', dataIndex: 'A2552SCMII', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'TOCA', dataIndex: 'A2552TAXCM', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'CHARGE', dataIndex: 'A2552CARGO', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'IVA', dataIndex: 'A2552IVA', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Provisions', dataIndex: 'A2552PROVI', width: 105, renderer: 'onColumnAmountRenderer'},
                                    {text: 'NET', dataIndex: 'A2552NETO', width: 105, renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [

                {
            xtype: 'displayfield',
            labelAlign: 'left',
            labelWidth: 300,
            fieldLabel: '(*) Grouped Tickets Pending to Approve - ADM',
            labelStyle: 'font-weight: bold; color:red;'
        }, {
                    text: 'Save',
                    id: prototype.id01 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'img_clickHandler_save_List'
                    }
                },
                {
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    text: 'Close',
                    height: 30,
                    scale: 'medium',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
