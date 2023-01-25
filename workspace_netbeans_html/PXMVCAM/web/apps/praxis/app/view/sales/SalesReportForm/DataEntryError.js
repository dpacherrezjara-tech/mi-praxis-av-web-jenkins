/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryError', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryError',

    controller: 'DataEntryErrorController',

    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryErrorController',
        'Ext.Praxis.view.sales.SalesReportForm.DataDetailEntryError'
    ],
    id: prototype.iderr + '-winEntryError',

    title: 'Error Summary',
    header: true,
    height: 650,
    scrollable: true,
    width: 700,
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
            id: prototype.iderr + '-contenedor-form',
            width: 700,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.iderr + '-contenedor-options',
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
                                    id: prototype.iderr + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                }, {
                                    xtype: 'Paginator',
                                    id: prototype.iderr + '-pagginator-01',
                                    pagInfo: [
                                        prototype.iderr + '-lbl-currentPage',
                                        prototype.iderr + '-lbl-pageCount',
                                        prototype.iderr + '-lbl-total'
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
                                    id: prototype.iderr + '-btnSearch',
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
                    width: 700,
                    height: 480,
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
                            id: prototype.iderr + '-gridDataError',
                            columnLines: true,
                            autoScroll: true,
                            width: 700,
                            height: 480,
                            columns: {
                                items: [
                                    {text: 'Transaction', width: 100, dataIndex: 'A1724TRANS'},
                                    {text: 'Error', width: 80, dataIndex: 'A1272COD'},
                                    {text: 'Description', width: 335, dataIndex: 'A1272DES', renderer: 'onRendererColumnAttr'},
                                    {text: 'QTY <br>Documents', width: 100, dataIndex: 'A1724QTY'},
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
                    id: prototype.iderr + '-pagginator-legendS',
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
                            width: 700,
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
                                    id: prototype.iderr + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.iderr + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.iderr + '-lbl-total',
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
                    id: prototype.iderr + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});

