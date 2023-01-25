/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXRfnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTAXRfnd',
    controller: 'DataEntryTAXRfndController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryTAXRfndController'
    ],
    id: prototype.idRfndTAX + '-winDataEntryTAXRfnd',
    title: 'Taxes',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 400,
    width: 520,
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
            id: prototype.idRfndTAX + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idRfndTAX + '-det-gridDataTktTAX',
                    columnLines: true,
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add TAX',
                                    id: prototype.idRfndTAX + '-gridTAXADD',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddTAXClick'
                                }, '-']
                        }],
                    autoScroll: true,
                    columns: {
                        items: [//maxLength: 3,enforceMaxLength: 3,
                            {text: 'Code', width: 50, dataIndex: 'A1732CTAX', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 3, enforceMaxLength: 3,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Curr', width: 40, dataIndex: 'A1732MTAX'},
                            {text: 'Tax Fee<br>Amount', dataIndex: 'A1732VTAX', width: 120, align: 'right', editor: 'numberfield',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},

                            {text: 'Airport<br>PFC', width: 60, dataIndex: 'A1732APFC', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 3, enforceMaxLength: 3,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},
                            {text: 'Country<br>Code', width: 60, dataIndex: 'A1732PSTAX'/*, editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }*/},
                            {text: 'Tax<br>Type', width: 50, dataIndex: 'A1732TIPO'/*, editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 2, enforceMaxLength: 2,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }*/},

                            {text: 'Tax<br>Ext/Ctrl', width: 55, dataIndex: 'A1732TCTR'/*, editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 1, enforceMaxLength: 1,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }*/},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        handler: 'OnTAXRemove'
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
                    height: 350,
                     width: 500,
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
                    id: prototype.idRfndTAX + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRfndTAX + '-gridTAXSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveTAXClick'
                    }
                }
            ]
        }
    ]

});

