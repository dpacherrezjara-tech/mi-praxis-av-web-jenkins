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
Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.FormOfProvisions', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormOfProvisions',
    controller: 'FormOfProvisionsController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReport.FormOfProvisionsController'
    ],
    title: 'PROVISIONS DETAILS',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 300,
    width: 500,
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
                            id: prototype.id3 + '-gridProvisions',
                            width: 470,
                            height: 200,
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
                                    {
                                        text: 'Currency', dataIndex: 'A1673MONED', align: 'center', flex: 1, sortable: false
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'A1673MONED', align: 'center', flex: 1, sortable: false
                                    },
                                    {text: 'Month', dataIndex: 'DIREC', width: 200, align: 'left',
                                        renderer: function(value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {text: 'Amount', dataIndex: 'A1673TXMIA', flex: 1, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ]
                            }, viewConfig: {
                                trackOver: false,
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
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]
});


