
prototype.idRefunddownloadForm = 'RefunddownloadForm';
prototype.url = CONTEXTPATH + '/RefunddownloadForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;
 
Ext.define('Ext.Praxis.view.salesaudit.RefunddownloadForm.RefunddownloadForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RefunddownloadForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RefunddownloadForm.RefunddownloadFormController',
    ],

    controller: 'RefunddownloadFormController',

    id: prototype.idRefunddownloadForm + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults: {
        border: false
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
    },

    items: [
        {
            xtype: 'panel',
            id: prototype.idRefunddownloadForm + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRefunddownloadForm + '-contenedor-options',
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
                                    id: prototype.idRefunddownloadForm + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idRefunddownloadForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idRefunddownloadForm + '-lbl-currentPage',
                                        prototype.idRefunddownloadForm + '-lbl-pageCount',
                                        prototype.idRefunddownloadForm + '-lbl-total'
                                    ]
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddownloadForm + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddownloadForm + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddownloadForm + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRefunddownloadForm + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idRefunddownloadForm + '-contenedor-filters',
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding: '5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.idRefunddownloadForm + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRefunddownloadForm + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Processing Date:',
                                            style: 'font-weight:bold;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRefunddownloadForm + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 60,
                                            labelAlign: 'right',
                                            width: 150,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRefunddownloadForm + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Transaction',
                                            id: prototype.idRefunddownloadForm + '-cmbtransaction',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code', 
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 70,
                                            width: 160,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbStatusAfterRender'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            xtype: 'button',
                                            text: 'Processing Data',
                                            id: prototype.idRefunddownloadForm + '-btn-processingdata',
                                            iconCls: 'prx-icon-processing',
                                            tooltip: 'Processing Data',
                                            listeners: {
                                                click: 'Processing_clickHandler'
                                            }
                                        }
                                    ]
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
                            id: prototype.idRefunddownloadForm + '-griddatasale',
                            columnLines: true,
                            autoScroll: true,
                            width: 1360,
                            height: 520,
                            columns: {
                                items: [
                                    {text: 'CCUST', dataIndex: 'A720AIRLIN', width: 30, align: 'center'},
                                    {text: 'TRNC', dataIndex: 'A720TRNCU', width: 50, align: 'center'},
                                    {text: 'SRC', dataIndex: 'FUENT', width: 60, align: 'center'},
                                    {text: 'CHNL', dataIndex: 'SUBFU', width: 60, align: 'center'},
                                    {text: 'AGENT', dataIndex: 'A720AGENTE', width: 60, align: 'center'},
                                    {text: 'NAME AGENT', dataIndex: 'NAGENTE', width: 110, align: 'center', renderer: 'onRendererColumn'},
                                    {text: 'CITY', dataIndex: 'A720CIUVTA', width: 78, align: 'center'},
                                    {text: 'FPROC', dataIndex: 'FPROC', width: 78, align: 'center'},
                                    {text: 'Cia', dataIndex: 'A720CIA', width: 30},
                                    {text: 'Forma', dataIndex: 'A720FORMA', width: 50},
                                    {text: 'Serie', dataIndex: 'A720SERIE', width: 60},
                                    {text: 'CPN1', dataIndex: 'CUPON1', width: 45},
                                    {text: 'CPN2', dataIndex: 'CUPON2', width: 45},
                                    {text: 'CPN3', dataIndex: 'CUPON3', width: 45},
                                    {text: 'CPN4', dataIndex: 'CUPON4', width: 45},
                                    {text: 'CPN4', dataIndex: 'CUPON4', width: 45},
                                    {text: 'SALE<br> SRC', dataIndex: 'FUENTVTA', width: 50},
                                    {text: 'SALE<br> CHNL', dataIndex: 'SUBFUVTA', width: 50},
                                    {text: 'SALE <br>AGENT', dataIndex: 'A720AGENTE', width: 60, align: 'center'},
                                    {text: 'SALE <br>NAGENT', dataIndex: 'NAGENTVTA', width: 110, align: 'center', renderer: 'onRendererColumn'},
                                    {text: 'SALE <br>DATE', dataIndex: 'A720FECVTA', width: 60, align: 'center'},
                                    {text: 'SALE <br>TKT', dataIndex: 'A720TPTKT', width: 60, align: 'center'},
                                    {text: 'SALE <br>COUNTRY', dataIndex: 'A720PAIVTA', width: 60, align: 'center'},
                                    {text: 'NLOTE', dataIndex: 'NLOTE', width: 60, align: 'center'},
                                    {text: 'MDA', dataIndex: 'A720MDACM', width: 60, align: 'center'},
                                    {text: 'TDOC', dataIndex: 'A720TDOC', width: 60, align: 'center'},
                                    {text: 'COMMIS', dataIndex: 'A720COMMIS', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
                                    {text: 'COM1', dataIndex: 'A720LRRCM1', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
                                    {text: 'COM2', dataIndex: 'A720LRRCM2', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
                                    {text: 'COM3', dataIndex: 'A720LRRCM3', width: 80, renderer: 'onColumnAmountRenderer', align: 'right'},
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
                    id: prototype.idRefunddownloadForm + '-pagginator-legend',
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
                            width: prototype.widthContenedor,
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
                                    id: prototype.idRefunddownloadForm + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idRefunddownloadForm + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idRefunddownloadForm + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});



