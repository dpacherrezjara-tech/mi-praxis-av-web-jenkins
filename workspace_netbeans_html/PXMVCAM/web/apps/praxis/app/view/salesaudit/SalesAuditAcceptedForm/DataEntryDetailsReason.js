/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.DataEntryDetailsReason
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsReason', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsReason',
    controller: 'DataEntryDetailsReasonController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsReasonController'
    ],
    title: 'TICKET REASONS',
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
            id: prototype.id5 + '-form',
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
                            id: prototype.id5 + '-griddata',
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
                                    {text: 'Seq', dataIndex: 'OPCION', align: 'center', flex: 1},
                                    {text: 'Reason </br> Code', dataIndex: 'A1672ERROR', align: 'center', flex: 1},
                                    {text: 'Description', dataIndex: 'REASONS', align: 'center', flex: 1,renderer: 'onRendererColumnAttr'},
                                    {text: 'Type', dataIndex: 'A1663TYPE', align: 'center', flex: 1}

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



