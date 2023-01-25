
prototype.idbspdescarga = 'DownloadbsplinkForm';
prototype.idDataEntryDownload = 'DataEntryDownloadbsplink';
prototype.url = CONTEXTPATH + '/DownloadbsplinkForm';
prototype.widthWindow = 1000;
prototype.heightWindow = 768;


Ext.define('Ext.Praxis.view.salesaudit.DownloadbsplinkForm.DownloadbsplinkForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.DownloadbsplinkForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.DownloadbsplinkForm.DownloadbsplinkFormController',
        'Ext.Praxis.view.salesaudit.DownloadbsplinkForm.DataEntryDownloadbsplink'
    ],

    controller: 'DownloadbsplinkFormController',

    id: prototype.idbspdescarga + '-Contenedor',

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
            id: prototype.idbspdescarga + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idbspdescarga + '-contenedor-options',
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
                                    id: prototype.idbspdescarga + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idbspdescarga + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idbspdescarga + '-lbl-currentPage',
                                        prototype.idbspdescarga + '-lbl-pageCount',
                                        prototype.idbspdescarga + '-lbl-total'
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
                                    id: prototype.idbspdescarga + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idbspdescarga + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idbspdescarga + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idbspdescarga + '-btn-excel',
                                    iconCls: 'prx-icon-excel',hidden:true,
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idbspdescarga + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.idbspdescarga + '-btn-back',
                                    tooltip: 'Back',
                                    hidden: true,
                                    listeners: {
                                        click: 'onBackClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idbspdescarga + '-contenedor-filters',
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
                            id: prototype.idbspdescarga + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idbspdescarga + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Processing Date',
                                            labelWidth: 120
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idbspdescarga + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
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
                                            xtype: 'datefield',
                                            id: prototype.idbspdescarga + '-txtFilterDateTo',
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
                            id: prototype.idbspdescarga + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            width: 990,
                            height: 520,
                            columns: {
                                items: [
                                    {text: 'Processing<br>Date', dataIndex: 'FPROC', width: 100, align: 'center',
                                        renderer: 'onRendererColumnOnPais'
                                    },
                                    {text: 'Quantity', dataIndex: 'CANTI', width: 80, align: 'center' },
                                    {text: 'Processing<br>User', dataIndex: 'USER', width: 100},
                                    {text: 'Status', dataIndex: 'ESTADO', width: 120, align: 'center', renderer: 'onRendererColumnStatus'}

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
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idbspdescarga + '-gridDetalle',
                            width: 990,
                            height: 520,
                            hidden: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Processing<br>Date', dataIndex: 'FPROC', width: 100, align: 'center'},
                                    {text: 'Country', dataIndex: 'COUNTRY', align: 'center', width: 80, sortable: false},
                                    {text: 'Quantity', dataIndex: 'CANTI', width: 80, align: 'center'},
                                    {text: 'Processing<br>User', dataIndex: 'USER', width: 100, align: 'center'},
                                    {text: 'Status', dataIndex: 'ESTADO', width: 120, renderer: 'onRendererColumnStatus', align: 'center'}
                                ]
                            }, viewConfig: {
                                // trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idbspdescarga + '-pagginator-legend',
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
                                    id: prototype.idbspdescarga + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idbspdescarga + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idbspdescarga + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {
                                    id: prototype.idbspdescarga + '-lbl-totalDeta',
                                    text: '0',
                                    width: 50,
                                    hidden: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

