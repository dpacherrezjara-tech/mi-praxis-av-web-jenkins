
prototype.id = 'DocumentsControl';
prototype.id1 = 'ScrFormUnico';

prototype.url = CONTEXTPATH + '/DocumentsControl';
prototype.url2 = CONTEXTPATH + '/DisputeGestionBsplink';
prototype.url03 = CONTEXTPATH + '/ADMReport';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.DocumentsControl.DocumentsControl', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.DocumentsControl',

    requires: [
        'Ext.Praxis.controller.salesaudit.DocumentsControl.DocumentsControlController',
        'Ext.Praxis.view.screens.ScrFormUnico'
    ],

    controller: 'DocumentsControlController',

    id: prototype.id + '-Contenedor',

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

    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: 1366,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'panel', hidden: true,
                            id: prototype.id + '-pripagination',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                style: 'padding: 4px; margin: 1px;'
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                }, {
                                    xtype: 'Paginator',
                                    id: prototype.id + '-pagginator-01',
                                    pagInfo: [
                                        prototype.id + '-lbl-currentPage',
                                        prototype.id + '-lbl-pageCount',
                                        prototype.id + '-lbl-total'
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
                                    id: prototype.id + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-search2',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search', hidden: true,
                                    listeners: {
                                        click: 'searchform_detalle_fin'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button', hidden: true,
                                    id: prototype.id + '-btn-txt',
                                    icon: 'resources/img/botones/txt.png',
                                    tooltip: 'Export to TXT',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.id + '-btn-back',
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
                    id: prototype.id + '-contenedor-filters',
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
                            id: prototype.id + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search',
                                            id: prototype.id + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 50,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Type',
                                            id: prototype.id + '-type',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 170,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                select: 'onCmbSourceSelect',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            width: 15, border: false
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'From month',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            store: win.getStoreYear(false),
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            labelAlign: 'right',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            width: 150,
                                            hidden: true,
                                            listConfig: {
                                                minWidth: 100
                                            },
                                            listeners: {
                                                afterrender: 'onCmbDateAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonth',
                                            store: win.getStoreMonth(false),
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            labelAlign: 'right',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            width: 80,
                                            hidden: true,
                                            listConfig: {
                                                minWidth: 90
                                            },
                                            listeners: {
                                                afterrender: 'onCmbMonthAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'From month',
                                            id: prototype.id + '-txtFilterDateTo',
                                            store: win.getStoreYear(false),
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            labelAlign: 'right',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            width: 150,
                                            editable: false,
                                            hidden: true,
                                            listConfig: {
                                                minWidth: 100
                                            },
                                            listeners: {
                                                afterrender: 'onCmbDateAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonth',
                                            store: win.getStoreMonth(false),
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            labelAlign: 'right',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            width: 80,
                                            hidden: true,
                                            listConfig: {
                                                minWidth: 90
                                            },
                                            listeners: {
                                                afterrender: 'onCmbMonthAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },

                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom2',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateTo2',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-country',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        },
                                        {
                                            width: 5, border: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIATA',
                                            width: 140,
                                            labelWidth: 30,
                                            fieldLabel: 'IATA',
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            enableKeyEvents: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ComboSource',
                                            fieldLabel: 'Source',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 120,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 80
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbArea',
                                            fieldLabel: 'Area',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbOrigin',
                                            fieldLabel: 'Origin',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 145,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbProcess',
                                            fieldLabel: 'Process',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 165,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo', hidden: true,
                                            id: prototype.id + '-CmbReason',
                                            fieldLabel: 'Reasons',
                                            queryMode: 'local',
                                            displayField: 'A2548DESC1',
                                            valueField: 'A2548CODR1',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 500
                                            }
                                        },
                                        {
                                            xtype: 'combo', hidden: true,
                                            id: prototype.id + '-CmbTypeReason',
                                            fieldLabel: 'Type reason',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 200,
                                            labelWidth: 80,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 300
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
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
                    xtype: 'tabpanel', //fullscreen: true,
                    id: prototype.id + '-tabpanelPrincipal',
                    activeItem: 0,
                    autoScroll: false,
                    tabBar: false,
                    defaults: {
                        closable: false,
                        hideMode: 'display',
                        autoScroll: true
                    },
                    border: false,
                    layout: 'fit',
                    tabPosition: 'top',
                    items: [
                        {
                            xtype: 'panel', title: 'Detail Traceability',
                            id: prototype.id + '-contenedor-grid',
                            width: prototype.widthWindow,
                            items: [
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
                                            xtype: 'grid', hidden: true,
                                            id: prototype.id + '-gridReport',
                                            columnLines: true,
                                            autoScroll: true,
                                            width: 1355,
                                            height: 300,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'date',
                                                        dataIndex: 'A2548FREGI',
                                                        width: 80,
                                                        renderer: 'OnColumnApplicationRenderer'
                                                    },
                                                    {
                                                        text: 'Area',
                                                        dataIndex: 'A2548AREADES',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Origin',
                                                        dataIndex: 'A2548BASEDES',
                                                        width: 100
                                                    },
                                                    {
                                                        text: 'Country',
                                                        dataIndex: 'A2548PAIS',
                                                        width: 60
                                                    },
                                                    {text: 'Ticket Qty',
                                                        columns: [
                                                            {
                                                                text: 'ADM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'A2548CATNNTC',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548CATNFAC',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'A2548CATNNTD',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548CATNDOCUM',
                                                                        width: 100,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: '%',
                                                                        dataIndex: '',
                                                                        width: 50,
                                                                        align: 'right'
                                                                    }
                                                                ]
                                                            }, {
                                                                text: 'ACM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'CANTARCACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'CANTASRACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'CANTBSPACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'CANTTOTALACM',
                                                                        width: 100,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: '%',
                                                                        dataIndex: '',
                                                                        width: 50,
                                                                        align: 'right'
                                                                    }
                                                                ]
                                                            }

                                                        ]


                                                    },
                                                    {text: 'Ticket amount USD',
                                                        columns: [
                                                            {
                                                                text: 'ADM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'A2548IVACA',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548IVACS',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'A2548IVACD',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548TOTAA',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    }

                                                                ]
                                                            }, {
                                                                text: 'ACM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'TRFPAG',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548SUMACM',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'TARIFA',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548TOTAD',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    }

                                                                ]
                                                            }

                                                        ]


                                                    },
                                                    {
                                                        text: 'IATA', dataIndex: 'A2548IATA', width: 70, sortable: false
                                                    },
                                                    {text: 'Agency', dataIndex: 'strNombreAgente', width: 70, renderer: 'onRendererColumnAttr'}


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
                                            },
                                            listeners: {
                                                afterrender: 'OnLoadDataPendienteAfterrender'
                                            }
                                        },
                                        {
                                            xtype: 'grid', hidden: true,
                                            id: prototype.id + '-gridReport2',
                                            columnLines: true,
                                            autoScroll: true,
                                            width: 1355,
                                            height: 350,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'date',
                                                        dataIndex: 'A2548FREGI',
                                                        width: 80,
                                                        renderer: 'OnColumnApplicationRenderer'
                                                    },
                                                    {
                                                        text: 'Status',
                                                        dataIndex: 'A2548FLAG',
                                                        width: 120
                                                    },
                                                    {
                                                        text: 'Area',
                                                        dataIndex: 'A2548AREADES',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Origin',
                                                        dataIndex: 'A2548BASEDES',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Country',
                                                        dataIndex: 'A2548PAIS',
                                                        width: 60
                                                    },
                                                    {text: 'Ticket Qty',
                                                        columns: [
                                                            {
                                                                text: 'ADM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'A2548CATNNTC',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548CATNFAC',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'A2548CATNNTD',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548CATNDOCUM',
                                                                        width: 100,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: '%',
                                                                        dataIndex: '',
                                                                        width: 50,
                                                                        align: 'right'
                                                                    }
                                                                ]
                                                            }, {
                                                                text: 'ACM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'CANTARCACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'CANTASRACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'CANTBSPACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'CANTTOTALACM',
                                                                        width: 100,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: '%',
                                                                        dataIndex: '',
                                                                        width: 50,
                                                                        align: 'right'
                                                                    }
                                                                ]
                                                            }

                                                        ]


                                                    },
                                                    {text: 'Ticket amount USD',
                                                        columns: [
                                                            {
                                                                text: 'ADM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'A2548IVACA',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548IVACS',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'A2548IVACD',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548TOTAA',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    }

                                                                ]
                                                            }, {
                                                                text: 'ACM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'TRFPAG',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548SUMACM',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'TARIFA',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548TOTAD',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    }

                                                                ]
                                                            }

                                                        ]


                                                    },
                                                    {text: 'IATA', dataIndex: 'A2548IATA', width: 70, sortable: false},
                                                    {text: 'Agency', dataIndex: 'strNombreAgente', width: 70, renderer: 'onRendererColumnAttr'}


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
                                            },
                                            listeners: {
                                                afterrender: 'OnLoadDataPendienteAfterrender'
                                            }
                                        },
                                        {
                                            xtype: 'grid', hidden: true,
                                            id: prototype.id + '-gridReport3',
                                            columnLines: true,
                                            autoScroll: true,
                                            width: 1355,
                                            height: 350,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            columns: {
                                                items: [
                                                    {
                                                        text: 'date',
                                                        dataIndex: 'A2548FREGI',
                                                        width: 80,
                                                        renderer: 'OnColumnApplicationRenderer'
                                                    },
                                                    {
                                                        text: 'Reason',
                                                        dataIndex: 'A2548DESC2',
                                                        width: 120
                                                    },
                                                    {
                                                        text: 'Area',
                                                        dataIndex: 'A2548AREADES',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Origin',
                                                        dataIndex: 'A2548BASE',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Country',
                                                        dataIndex: 'A2548PAIS',
                                                        width: 60
                                                    },
                                                    {text: 'Ticket Qty',
                                                        columns: [
                                                            {
                                                                text: 'ADM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'A2548CATNNTC',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548CATNFAC',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'A2548CATNNTD',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548CATNDOCUM',
                                                                        width: 100,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: '%',
                                                                        dataIndex: '',
                                                                        width: 50,
                                                                        align: 'right'
                                                                    }
                                                                ]
                                                            }, {
                                                                text: 'ACM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'CANTARCACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'CANTASRACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'CANTBSPACM',
                                                                        width: 80,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'CANTTOTALACM',
                                                                        width: 100,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountInteger', renderer: 'onColumnIntegerRenderer'
                                                                    },
                                                                    {
                                                                        text: '%',
                                                                        dataIndex: '',
                                                                        width: 50,
                                                                        align: 'right'
                                                                    }
                                                                ]
                                                            }

                                                        ]


                                                    },
                                                    {text: 'Ticket amount USD',
                                                        columns: [
                                                            {
                                                                text: 'ADM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'A2548IVACA',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548IVACS',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'A2548IVACD',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548TOTAA',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    }

                                                                ]
                                                            }, {
                                                                text: 'ACM',
                                                                columns: [
                                                                    {
                                                                        text: 'ARC',
                                                                        dataIndex: 'TRFPAG',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'ASR',
                                                                        dataIndex: 'A2548SUMACM',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'BSP',
                                                                        dataIndex: 'TARIFA',
                                                                        width: 120,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        dataIndex: 'A2548TOTAD',
                                                                        width: 130,
                                                                        align: 'right',
                                                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                                                    }

                                                                ]
                                                            }

                                                        ]


                                                    },
                                                    {
                                                        text: 'IATA', dataIndex: 'A2548IATA', width: 70, sortable: false
                                                    },
                                                    {text: 'Agency', dataIndex: 'strNombreAgente', width: 70, renderer: 'onRendererColumnAttr'}



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
                                            },
                                            listeners: {
                                                afterrender: 'OnLoadDataPendienteAfterrender'
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridAdmreport', hidden: true,
                                            width: 1360,
                                            autoScroll: true,
                                            height: 480,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Ticket', dataIndex: 'A2548TIKET', width: 100},
                                                    {text: 'Memo<br>Number', dataIndex: 'A2548NMEMO', width: 80},
                                                    {text: 'Amount', dataIndex: 'A2548NETO', width: 100, renderer: 'onColumnAmountRenderer'},
                                                    {text: 'IATA', dataIndex: 'A2548IATA', width: 70, sortable: false},
                                                    {text: 'Agency', dataIndex: 'AGENCY', width: 120, renderer: 'onRendererColumnAttr'},
                                                    {text: 'Cur.', dataIndex: 'A2548MDA', width: 40, sortable: false},
                                                    {text: 'Country', dataIndex: 'A2548PAIS', width: 60, sortable: false},
                                                    {text: 'Source', dataIndex: 'A2548FTE', width: 60, sortable: false},
                                                    {text: 'Transaction', dataIndex: 'A2548TRNCO', width: 80, sortable: false},
                                                    {
                                                        text: 'Types', dataIndex: 'A2548TRNCU', width: 50, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'System<br>Date', dataIndex: 'A2548FREGI', width: 70, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Accounting<br>Date', dataIndex: 'A2548FCONT', width: 90, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Issued<br>Date', dataIndex: 'A2548FVTA', width: 90, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Bsplink <br> Date', dataIndex: 'A2548FFILE', width: 85, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'User', dataIndex: 'A2548REGIS', width: 100, sortable: false},
                                                    {text: 'Reason 1', dataIndex: 'A2548DESC1', width: 70, renderer: 'onRendererColumnAttr'},
                                                    {text: 'Origin', dataIndex: 'A2548BASE', width: 100, sortable: false, renderer: 'onRendererColumnBase'},
                                                    {
                                                        text: 'Area', dataIndex: 'A2548AREA', width: 100, sortable: false,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Status', dataIndex: 'A2548FLAG', width: 120, sortable: false, renderer: 'onRendererColumnStatus'},
                                                    {text: 'Connexion', dataIndex: 'A2548NMERF', width: 120, renderer: 'onRendererColumnAttr'},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 50,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-detail',
                                                                tooltip: 'Detail',
                                                                handler: 'onDetailClick'
                                                            }
                                                        ]
                                                    }

                                                ]
                                            }, viewConfig: {
                                                //trackOver: false,
                                                stripeRows: true,
                                                enableTextSelection: true
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    id: prototype.id + '-panelPrinPagi',
                                    border: true, hidden: true,
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
                                                    id: prototype.id + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }


                            ]
                        },
                        {
                            xtype: 'panel', title: 'Detail of Documents Control and status graphics',
                            id: prototype.id + '-graficos', hidden: true,
                            border: true, width: prototype.widthContenedor, autoScroll: true, height: prototype.heightWindow,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-aaa-form',
                                    width: prototype.widthContenedor,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart',
                                            width: prototype.widthContenedor
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-chart2',
                                            width: prototype.widthContenedor
                                        }
                                    ]
                                }

                            ]//, listeners: {show: 'onclickshow'}
                        }


                    ]
                }
            ]
        }
    ]
});

