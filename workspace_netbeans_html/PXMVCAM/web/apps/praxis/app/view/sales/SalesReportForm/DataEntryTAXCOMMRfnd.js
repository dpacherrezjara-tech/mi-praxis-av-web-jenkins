/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXCOMMRfnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTAXCOMMRfnd',
    controller: 'DataEntryTAXCOMMRfndController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryTAXCOMMRfndController'
    ],
    id: prototype.idRfndTAXCOMM + '-winDataEntryTAXCOMMRfnd',
    title: 'Tax On Commission',
    header: true,
    height: 310,
    width: 490,
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
            id: prototype.idRfndTAXCOMM + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idRfndTAXCOMM + '-det-gridDataTAXCOMMRfnd',
                    columnLines: true,
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add TAXCOMM',
                                    id: prototype.idRfndTAXCOMM + '-gridAddTAXCOMMRfnd',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddTAXCOMMRfndClick'
                                }, '-']
                        }],
                    autoScroll: true,
                    columns: {
                        items: [
                            {text: 'Code', width: 80, dataIndex: 'A1734CTCOM', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 6, enforceMaxLength: 6,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Type', width: 45, dataIndex: 'A1734TIPO'},
                            {text: 'Rate', dataIndex: 'A1734RATE', width: 120, align: 'right', summaryType: 'sum', editor: 'numberfield', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {text: 'Curr', width: 40, dataIndex: 'A1734MTXC'},
                            {text: 'Amount', dataIndex: 'A1734VTXCR', width: 120, align: 'right', editor: 'numberfield',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        handler: 'OnTAXCOMMRfndRemove'
                                    }
                                ]
                            }
                        ],
                        defaults: {
                            sortable: false,
                            menuDisabled: true,
                            align: 'center'
                        }
                    },
                    height: 300,
                    width: 480
                }

            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idRfndTAXCOMM + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRfndTAXCOMM + '-gridTAXCOMMSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveTAXCOMMClick'
                    }
                }
            ]
        }
    ]

});

