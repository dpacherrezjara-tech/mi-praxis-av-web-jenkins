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
Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.FormformateoCta', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormformateoCta',
    controller: 'FormformateoCtaController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReport.FormformateoCtaController'
    ],
    title: 'FORMAT IVA',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 430,
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
            id: prototype.idformateoCta + '-form',
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
                            id: prototype.idformateoCta + '-MemoNumber',
                            fieldLabel: 'Memo Number',
                            maskRe: /[0-9]/,
                            width: 210,
                            readOnly: true,
                            labelWidth: 90
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idformateoCta + '-txtTicket',
                            fieldLabel: 'Ticket',
                            maskRe: /[0-9]/,
                            width: 210,
                            readOnly: true,
                            labelWidth: 70
                        }
                    ]
                },
                {
                            xtype: 'grid',
                            id: prototype.idformateoCta + '-gridTKT',
                            //width: 350,
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
                                    {text: 'Type', dataIndex: 'A3807TYPE', align: 'center', width: 50},
                                    {text: 'State', dataIndex: 'A3807FLAG', align: 'center', width: 50},
                                    {text: 'Rango', dataIndex: 'A3807RANGO', align: 'center', width: 50},
                                    {text: 'Fare', dataIndex: 'A3807FARE', width: 120, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Iva', dataIndex: 'A3807IVA', width: 120, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Tasa <br>%', dataIndex: 'A3807IFA16', align: 'center', width: 50},
                                    {text: 'Amount', dataIndex: 'A3807FA16L', width: 120, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Tasa <br>%', dataIndex: 'A3807IFA00', align: 'center', width: 50},
                                    {text: 'Amount', dataIndex: 'A3807FA00L', width: 120, align: 'right',summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Reason', dataIndex: 'A3807DESC', width: 130, renderer: 'onRendererColumnAttr'},
                                ]
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
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
