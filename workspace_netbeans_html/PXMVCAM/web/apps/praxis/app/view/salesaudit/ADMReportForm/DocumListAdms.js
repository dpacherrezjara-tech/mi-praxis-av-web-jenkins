/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.DocumListAdms
 */
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
Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.DocumListAdms', {
    extend: 'Ext.window.Window',
    alias: 'widget.DocumListAdms',
    controller: 'DocumListAdmsController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReport.DocumListAdmsController'
    ],
    title: 'DOCUMENTOS RELACIONADOS',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 430,
    width: 900,
    id: prototype.id0 + '-form',
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
                            id: prototype.id0 + '-MemoNumber',
                            fieldLabel: 'Memo Number',
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
                            id: prototype.id0 + '-gridTKT',
                            width: 890,
                            height: 300,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Document', dataIndex: 'A2548TIKET', align: 'center', flex: 1, renderer: 'onRendererColumnOnTicket'},
                                    {text: 'Trans.', dataIndex: 'A2548TRNCO', align: 'center', flex: 1},
                                    {text: 'Memo Number', dataIndex: 'A2548NMEMO', align: 'center', flex: 1},
                                    {text: 'Cur.', dataIndex: 'A2548MDA', align: 'center', flex: 1},
                                    {text: 'Amount', dataIndex: 'A2548NETO', flex: 1, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Razon', dataIndex: 'A2548DESC1', width: 120,renderer: 'onRendererColumnAttr'}
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



