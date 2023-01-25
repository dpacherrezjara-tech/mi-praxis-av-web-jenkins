/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryCOMMRfnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCOMMRfnd',
    controller: 'DataEntryCOMMRfndController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryCOMMRfndController'
    ],
    id: prototype.idRfndCOMM + '-winDataEntryRfndCOMM',
    title: 'Commission',
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
            id: prototype.idRfndCOMM + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idRfndCOMM + '-det-gridDataRfndCOMM',
                    columnLines: true,
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add Commission',
                                    id: prototype.idRfndCOMM + '-gridaddRfndCOMM',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddRfndCOMMClick'
                                }, '-']
                        }],
                    autoScroll: true,
                    columns: {
                        items: [
                            {text: 'Code', width: 80, dataIndex: 'A1733CCOM', editor: {
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
                            {text: 'Type', width: 45, dataIndex: 'A1733TIPO', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Rate', dataIndex: 'A1733RATE', width: 120, align: 'right',editor: 'numberfield', summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {text: 'Curr', width: 40, dataIndex: 'A1733MCOM'},
                            {text: 'Amount', dataIndex: 'A1733VCOM', width: 120, align: 'right', editor: 'numberfield',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        handler: 'OnRfndCOMMRemove'
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
                    id: prototype.idRfndCOMM + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRfndCOMM + '-gridRfndCOMMSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveRfndCOMMClick'
                    }
                }
            ]
        }
    ]

});

