/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.DocumListAdms
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.ADMManualForm.FormListTKTADManual', {
    extend: 'Ext.window.Window',
    alias: 'widget.DocumListAdms',
    controller: 'FormListTKTADManualController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMManualForm.FormListTKTADManualController'
    ],
    title: 'RELATED DOCUMENTS',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 430,
    width: 900,
    id: prototype.id5 + '-form',
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
                            id: prototype.id5 + '-MemoNumber',
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
                            id: prototype.id5 + '-gridTKT',
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
                                    {text: 'Document', dataIndex: 'A2560TKT', align: 'center',  width: 100},
                                    {text: 'Trans.', dataIndex: 'A2560TRNCO', align: 'center',  width: 50},
                                    {text: 'Memo Number', dataIndex: 'A2560NMEMO', align: 'center',  width: 100},
                                    {text: 'Cur.', dataIndex: 'A2560MDA', align: 'center', width: 50},
                                    {text: 'Amount', dataIndex: 'A2560AMOUNT', width: 120, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Cod.Razon', dataIndex: 'A2560CODRZ',width: 80},
                                    {text: 'Family', dataIndex: 'A2560FAMIL', width: 80},
                                    {text: 'Razon', dataIndex: 'A2560COMES', flex: 1,renderer: 'onRendererColumnAttr'}
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





