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
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsCommis', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsCommis',
    controller: 'DataEntryDetailsCommisController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsCommisController'
    ],
    title: 'ORIGINAL DATA OF COMMISSION',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 430,
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
            id: prototype.id3 + '-form',
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
                            id: prototype.id3 + '-griddata',
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
                                    {text: 'Ticket', dataIndex: 'A1674TKT', align: 'center', width: 105},
                                    {text: 'Seq', dataIndex: 'A1674SEQ', align: 'center', flex: 1},
                                    {text: 'Coupon', dataIndex: 'A1674CUPON', align: 'center', flex: 1},
                                    {text: 'Transaction', dataIndex: 'A1674TRNCU', align: 'center', flex: 1},
                                    {text: 'Type', dataIndex: 'A1674TIPO', align: 'center', flex: 1},
                                    {text: 'Currency', dataIndex: 'A1674MORIG', align: 'center', flex: 1},
                                    {text: 'Flag', dataIndex: 'A1674FLAG', align: 'center', flex: 1},
                                    {text: 'Airline',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [{text: '%', dataIndex: 'A1674PCMIA2', flex: 1},
                                            {text: 'Amount', dataIndex: 'A1674COMIA2', flex: 1, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Agent',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [{text: '%', dataIndex: 'A1674PCAGT2', flex: 1},
                                            {text: 'Amount', dataIndex: 'A1674CORIG2', flex: 1, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Differences',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [{text: '%', dataIndex: 'A1674PODIF2', flex: 1},
                                            {text: 'Amount', dataIndex: 'A1674CODIF2', flex: 1, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    }
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
