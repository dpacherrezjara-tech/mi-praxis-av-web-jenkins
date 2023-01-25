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
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsHistorialTKT', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsHistorialTKT',
    controller: 'DataEntryDetailsHistorialTKTController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsHistorialTKTController'
    ],
    title: 'Historial TKT',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 300,
    width: 910,
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
            id: prototype.id7 + '-form',
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
                            id: prototype.id7 + '-griddata',
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
                                    {text: 'Origin', dataIndex: 'A1672TIPOF', align: 'left', flex: 1},
                                    {text: 'User', dataIndex: 'A1672REVIS', align: 'left', flex: 1},
                                    {text: 'Folio', dataIndex: 'A2553FOLIO', align: 'left', flex: 1},
                                    {text: 'Date', dataIndex: 'A1672FREGI', align: 'center', flex: 1},
                                    {text: 'Description', dataIndex: 'A1672ERROR', align: 'center', flex: 1, renderer: 'onRendererColumnAttr'},
                                    {text: 'File', dataIndex: 'A1672RUTAF', align: 'center', flex: 1},
                                    {text: 'Status', dataIndex: 'A1672STAT', align: 'center', flex: 1},
                                    {text: 'File', dataIndex: 'A2553ARCHV', width: 100, renderer: 'OnColumnAuditorRenderer'}

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



