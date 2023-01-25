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
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsTaxOnComi', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsTaxOnComi',
    controller: 'DataEntryDetailsTaxOnComiController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsTaxOnComiController'
    ],
    title: 'ORIGINAL DATA OF TAX COMMISSION',
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
            id: prototype.id4 + '-form',
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
                            id: prototype.id4 + '-griddata',
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
                                    {text: 'Ticket', dataIndex: 'A1675TKT', align: 'center', width: 105},
                                    {text: 'Seq', dataIndex: 'A1675SEQ', align: 'center', flex: 1},
                                    {text: 'Coupon', dataIndex: 'A1675CUPON', align: 'center', flex: 1},
                                    {text: 'Transaction', dataIndex: 'A1675TRNCU', align: 'center', flex: 1},
                                    {text: 'Type', dataIndex: 'A1675TIPO', align: 'center', flex: 1},
                                    {text: 'Currency', dataIndex: 'A1675MONED', align: 'center', flex: 1},
                                    {text: 'Airline',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [{text: '%', dataIndex: 'A1675POMIA2', flex: 1},
                                            {text: 'Amount', dataIndex: 'A1675OVMIA2', flex: 1, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Agent',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [{text: '%', dataIndex: 'A1675POAGT2', flex: 1},
                                            {text: 'Amount', dataIndex: 'A1675OVORI2', flex: 1, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Differences',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [{text: '%', dataIndex: 'A1675PVDIF2', flex: 1},
                                            {text: 'Amount', dataIndex: 'A1675OVDIF2', flex: 1, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
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


