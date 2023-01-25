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
Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsTaxes', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsTaxes',
    controller: 'DataEntryDetailsTaxesController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsTaxesController'
    ],
    title: 'ORIGINAL DATA OF TAXES',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 430,
    width: 1020,
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
                            id: prototype.id2 + '-griddata1',
                            width: 1000,
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
                                    {text: 'Country', dataIndex: 'A1673PAIS', align: 'center', width: 60, sortable: false},
                                    {text: 'Currency', dataIndex: 'A1673MORIG', align: 'center', width: 60, sortable: false},
                                    {text: 'Tax</br>Code', dataIndex: 'A1673CDTAX', align: 'center', width: 60, sortable: false},
                                    {text: 'Description', dataIndex: 'A1673HREGI', align: 'center', width: 120, sortable: false},
                                    {text: 'Ato', dataIndex: 'A1673CDATO', align: 'center', width: 40, sortable: false},

                                    {text: 'Airline', dataIndex: 'A1673TXMIA', width: 120, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Agent', dataIndex: 'A1673TXORI', width: 120, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Diferences</br> ADM', dataIndex: 'A1673TXDIF', width: 120, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Diferences</br> ACM', dataIndex: 'A1673RATE', width: 120, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ]
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
                        {
                            xtype: 'grid', hidden: true,
                            id: prototype.id2 + '-griddata2',
                            width: 1000,
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
                                    {text: 'Cur.', dataIndex: 'A1673MORIG', align: 'center', width: 40, sortable: false},
                                    {text: 'Tax<br> Code', dataIndex: 'A1673CDTAX', align: 'center', width: 50, sortable: false},
                                    {text: 'Description', dataIndex: 'A1673HREGI', align: 'center', width: 165, sortable: false},
                                    {text: 'Ato', dataIndex: 'A1673CDATO', align: 'center', width: 40, sortable: false},
                                    {text: 'Airline',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'New', dataIndex: 'A1673TXMIA', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                            {text: 'Old', dataIndex: 'A1673OLDAI', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Agent',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'New', dataIndex: 'A1673TXORI',width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                            {text: 'Old', dataIndex: 'A1673OLDAG', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    {text: 'Diff',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Airline', dataIndex: 'A1673DIFAI', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                            {text: 'Agent', dataIndex: 'A1673DIFAG', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                        ]
                                    },
                                    //{text: 'New</br>Airline', dataIndex: 'A1673TXMIA', flex: 1, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    //{text: 'Old</br>Airline', dataIndex: 'A1673OLDAI', flex: 1, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    //{text: 'New</br>Agent', dataIndex: 'A1673TXORI', flex: 1, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    //{text: 'Old</br>Agent', dataIndex: 'A1673OLDAG', flex: 1, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    //{text: 'Diff</br>Airline', dataIndex: 'A1673DIFAI', flex: 1, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    //{text: 'Diff</br>Agent', dataIndex: 'A1673DIFAG', flex: 1, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Differences', dataIndex: 'A1673TXDIF', width: 100, align: 'right', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
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
