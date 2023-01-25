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
Ext.define('Ext.Praxis.view.salesaudit.RFNDTicketcontrolForm.DetailRFNDTicketcontrolTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailRFNDTicketcontrolTicket',
    controller: 'DetailRFNDTicketcontrolTicketController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDTicketcontrolForm.DetailRFNDTicketcontrolTicketController'
    ],
    title: 'LIST OF RELATED TICKETS',
    header: true,
    height: 430,
    width: 900,
    id: prototype.id1 + '-form',
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
                            xtype: 'textfield',
                            id: prototype.id1 + '-MemoNumber',
                            fieldLabel: 'Folio',
                            maskRe: /[0-9]/,
                            width: 210,
                            readOnly: true,
                            labelWidth: 90
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id1 + '-gridTKT',
                            width: 850,
                            height: 300,
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'A3648TKT', align: 'center', width: 120},
                                    {text: 'System </br> date', dataIndex: 'A3648FREGI', align: 'center', width: 80},
                                    {text: 'Status', dataIndex: 'A3648FLAG', align: 'center', width: 120 },
                                    {text: 'Razon', dataIndex: 'A3648DESTI', flex: 1, renderer: 'onRendererColumnAttr'}
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




