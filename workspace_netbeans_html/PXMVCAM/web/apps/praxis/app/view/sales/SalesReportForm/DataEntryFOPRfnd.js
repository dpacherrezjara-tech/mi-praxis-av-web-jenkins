/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPRfnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryFOPRfnd',
    controller: 'DataEntryFOPController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFOPRfndController'
    ],
    id: prototype.idRfndFOP + '-winDataEntryFOPRfnd',
    title: 'Form of Payment',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 310,
    width: 620,
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
            id: prototype.idRfndFOP + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idRfndFOP + '-det-gridDataTktFOP',
                    columnLines: true,
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    },
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add Fop',
                                    id: prototype.idRfndFOP + '-gridFopADD',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddFopClick'
                                }, '-']
                        }],
                    autoScroll: true,
                    columns: {
                        items: [//maxLength: 3,enforceMaxLength: 3,
                            {text: 'Code', width: 50, dataIndex: 'A1731CFOP', editor: {
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
                            {text: 'Card<br>Type', width: 45, dataIndex: 'A1731TTARJ', editor: {
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
                            {text: 'Ref Number', width: 150, dataIndex: 'A1731NREF', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 19, enforceMaxLength: 19
                                    }
                                }},
                            {text: 'Curr', width: 40, dataIndex: 'A1731MFOP'},
                            {text: 'Amount', dataIndex: 'A1731VFOP', width: 120, align: 'right', editor: 'numberfield',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A1731FEXP', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 8, enforceMaxLength: 8,
                                        format: 'Y/m/d', maskRe: /[0-9]/
                                    }
                                }},
                            {text: 'Approval<br>Card', width: 70, dataIndex: 'A1731CAPL', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 6, enforceMaxLength: 6,
                                        maskRe: /[0-9]/
                                    }
                                }},
                            /*{text: 'Curr Net<br>Rem', width: 70, dataIndex: 'A1731MNETR', editor: {
                                    completeOnEnter: false,
                                    field: {
                                        xtype: 'textfield',
                                        maxLength: 3, enforceMaxLength: 3,
                                        maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                        listeners: {
                                            change: 'onchange'
                                        }
                                    }
                                }},*/
                            /*{text: 'Net Rem<br>Amount', dataIndex: 'A1731VNETR', width: 120, align: 'right',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer', editor: 'numberfield'},*/
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        handler: 'OnFopRemove'
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
                    flex: 1
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
                    id: prototype.idRfndFOP + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRfndFOP + '-gridFopSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveFopClick'
                    }
                }
            ]
        }
    ]

});

