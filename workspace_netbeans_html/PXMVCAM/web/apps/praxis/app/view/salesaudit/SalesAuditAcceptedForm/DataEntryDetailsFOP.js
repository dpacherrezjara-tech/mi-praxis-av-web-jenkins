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
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsFOP', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsFOP',
    controller: 'DataEntryDetailsFOPController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsFOPController'
    ],
    title: 'FORM OF PAYMENT',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 300,
    width: 900,
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
            id: prototype.id6 + '-form',
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
                            id: prototype.id6 + '-griddata',
                            width: 890,
                            height: 250,
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Document', dataIndex: 'A2657FO720', align: 'center', width: 100},
                                    {text: 'Transaction', dataIndex: 'A2657TR720', align: 'center', flex: 1},
                                    {text: 'Code', dataIndex: 'A2657TFOP', align: 'center', flex: 1,renderer: 'onRendererColumnAttr'},
                                    {text: 'Card Type', dataIndex: 'A2657TTARJ', align: 'center', flex: 1},
                                    {text: 'Reference </br> Number', dataIndex: 'A2657NREF', align: 'center', flex: 1},
                                    {text: 'Currency', dataIndex: 'A2657MORIG', align: 'center', flex: 1},
                                    {text: 'Amount', dataIndex: 'A2657FPORI', align: 'center', flex: 1,renderer: 'onColumnAmountRenderer'}

                                ]
                            }, viewConfig: {
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






