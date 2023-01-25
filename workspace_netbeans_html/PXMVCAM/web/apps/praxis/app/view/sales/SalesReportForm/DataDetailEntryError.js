/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataDetailEntryError', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataDetailEntryError',

    controller: 'DataEntryErrorDetailController',

    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryErrorDetailController',
        'Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt'
    ],
    id: prototype.ideterr + '-winEntryDetailEntryError',

    title: 'Detail Error Summary',
    header: true,
    height: 700,
    scrollable: true,
    width: 1150,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'panel',
            id: prototype.ideterr + '-contenedor-form',
            width: 1150,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.ideterr + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    id: prototype.ideterr + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                }, {
                                    xtype: 'Paginator',
                                    id: prototype.ideterr + '-pagginator-01',
                                    pagInfo: [
                                        prototype.ideterr + '-lbl-currentPage',
                                        prototype.ideterr + '-lbl-pageCount',
                                        prototype.ideterr + '-lbl-total'
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button', width: 50,
                                    id: prototype.ideterr + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onClickBtnSearch'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    width: 1150,
                    height: 550,
                    border: true,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.ideterr + '-gridDetailError',
                            columnLines: true,
                            autoScroll: true,
                            width: 1150,
                            height: 550,
                            columns: {
                                items: [
                                    {text: 'Air', width: 40, dataIndex: 'A720AIRLIN'},
                                    {text: 'Document', width: 90, dataIndex: 'DOCUMENTO'},
                                    {text: 'Issue <br>date', width: 80, dataIndex: 'A720FECVTA'},
                                    {text: 'CNJ', width: 30, dataIndex: 'CNJ'},
                                    {text: 'Transaction', width: 80, dataIndex: 'A720TRNCU'},
                                    {text: 'Document <br> type', width: 100, dataIndex: 'A720TDOC'},
                                    {text: 'type', width: 40, dataIndex: ''},
                                    {text: 'Fare <br> Cur', width: 40, dataIndex: 'A720MONEDA'},
                                    {text: 'Fare <br> Amount', dataIndex: 'A720TARIFA', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Equicalent<br> Cur', width: 40, dataIndex: 'A720MDAPAG'},
                                    {text: 'Equicalent<br>fare<br> Amount', dataIndex: 'A720TRFPAG', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'ADC <br> Cur', width: 40, dataIndex: 'A720MDAAD'},
                                    {text: 'ADC <br> Amount', dataIndex: 'A720ADC', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Error', width: 80, dataIndex: 'A720MIAERR', renderer: 'onRendererColumnAttr'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: 'Search',
                                        width: 60,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-search',
                                                tooltip: 'Search',
                                                handler: 'onDetailClick'
                                            }
                                        ]
                                    }


                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.ideterr + '-pagginator-legend',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1110,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.ideterr + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.ideterr + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.ideterr + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.ideterr + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});

