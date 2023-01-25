
prototype.id = 'BsplinkReportsStatistics';
prototype.id2 = 'DetailBsplinkReportsStatistics';
prototype.url = CONTEXTPATH + '/BsplinkReportsStatistics';
prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
prototype.widthWindow = 1200;
prototype.heightWindow = 768;
Ext.define('Ext.Praxis.view.salesaudit.BsplinkReportsStatistics.BsplinkReportsStatistics', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.BsplinkReportsStatistics',
    requires: [
        'Ext.Praxis.controller.salesaudit.BsplinkReportsStatistics.BsplinkReportsStatisticsController'
    ],
    controller: 'BsplinkReportsStatisticsController',
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
    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [{
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: 1200, //prototype.widthContenedor,
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
                                    xtype: 'button',
                                    id: prototype.id + '-btn-clear',
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
                                            fieldLabel: 'Search Type',
                                            id: prototype.id + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 275,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender'
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
                                            //editable: false,
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
                                            //editable: false,
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
                                            //editable: false,
                                            listConfig: {
                                                minWidth: 90
                                            },
                                            listeners: {
                                                afterrender: 'onCmbMonthAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },

                                        /*{
                                         xtype: 'datefield',
                                         id: prototype.id + '-txtFilterDateFrom',
                                         fieldLabel: 'From month',
                                         format: 'Y/m',
                                         maxLength: 7,
                                         value:new Date(),
                                         enforceMaxLength: 7,
                                         maxValue: Ext.Date.format(new Date(), 'Y/m'),
                                         labelWidth: 70,
                                         labelAlign: 'right',
                                         width: 150
                                         ,
                                         listeners: {
                                         specialkey: 'onSearchkey'
                                         }
                                         }
                                         {
                                         xtype: 'datefield',
                                         id: prototype.id + '-txtFilterDateTo',
                                         fieldLabel: 'To month',
                                         format: 'Y/m',
                                         maxLength: 7,
                                         value: new Date(),
                                         enforceMaxLength: 7,
                                         maxValue: Ext.Date.format(new Date(), 'Y/m'),
                                         labelWidth: 65,
                                         labelAlign: 'right',
                                         width: 150,
                                         listeners: {
                                         specialkey: 'onSearchkey'
                                         }
                                         },*/
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-Currency',
                                            fieldLabel: 'Currency',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
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
                                        // style: 'margin-left:1px'
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtUser',
                                            fieldLabel: 'Auditor',
                                            queryMode: 'local',
                                            displayField: 'A3389REGAS',
                                            valueField: 'A3389REGAS',
                                            width: 200,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            }
                                        },
                                        {
                                            width: 15, border: false
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
                            id: prototype.id + '-gridReport',
                            columnLines: true,
                            autoScroll: true,
                            width: 1200,
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
                                        text: 'Application </br>date',
                                        dataIndex: 'A3389FAPPI',
                                        width: 80,
                                        renderer: 'OnColumnApplicationRenderer'
                                    },
                                    {text: 'RFND Qty',
                                        columns: [
                                            {
                                                text: 'Authorise',
                                                dataIndex: 'A3389APROVQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnAuthoriseRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'A3389APROVPJE',
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnColumnPorRenderer'
                                            },
                                            {
                                                text: 'Reject',
                                                dataIndex: 'A3389RCHAQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnRejectRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'A3389RCHAPJE',
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnColumnPorRenderer'
                                            },
                                            {
                                                text: 'Pending',
                                                dataIndex: 'A3389PENQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: 'OnColumnPendingRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'A3389PENPJE',
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnColumnPorRenderer'
                                            },
                                            {
                                                text: 'Total',
                                                dataIndex: 'A3389TOTALQTY',
                                                flex: 1,
                                                align: 'right',
                                                summaryType: 'sum',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000,00');
                                                }
                                            }
                                        ]


                                    },
                                    {
                                        text: 'Cur.', dataIndex: 'A3389MDA', width: 40, sortable: false
                                    },
                                    {text: 'RFND amount',
                                        columns: [
                                            {
                                                text: 'Authorise',
                                                dataIndex: 'A3389APROVSUM',
                                                width: 110,
                                                align: 'right',
                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'A3389APROVPJESUM',
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnColumnPorRenderer'
                                            },
                                            {
                                                text: 'Reject',
                                                dataIndex: 'A3389RCHASUM',
                                                width: 110,
                                                align: 'right',
                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'A3389RCHAPJESUM',
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnColumnPorRenderer'
                                            },
                                            {
                                                text: 'Pending',
                                                dataIndex: 'A3389PENSUM',
                                                width: 110,
                                                align: 'right',
                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                            },
                                            {
                                                text: '%',
                                                dataIndex: 'A3389PENPJESUM',
                                                flex: 1,
                                                align: 'right',
                                                renderer: 'OnColumnPorRenderer'
                                            },
                                            {
                                                text: 'Total',
                                                dataIndex: 'A3389TOTALSUM',
                                                width: 110,
                                                align: 'right',
                                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'
                                            }
                                        ]


                                    },
                                    {
                                        text: 'Country', //hidden: true,
                                        dataIndex: 'A3389PAIS',
                                        width: 60
                                    },
                                    {
                                        text: 'Auditor',
                                        dataIndex: 'A3389REGAS',
                                        width: 100,
                                        align: 'left'
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A3389IATA', width: 70, sortable: false
                                    },
                                    {
                                        text: 'Agency', dataIndex: 'A3389AGENT', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.AGENCY + '"';
                                            return value;
                                        }
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
                            },
                            listeners: {
                                afterrender: 'OnLoadDataPendienteAfterrender'
                            }
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
                            xtype: 'panel', title: 'General',
                            id: prototype.id + '-graficos',
                            layout: {
                                type: 'hbox'
                            },
                            border: true, width: 1200, autoScroll: true, height: 400,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [{
                                    xtype: 'panel',
                                    id: prototype.id + '-chart',
                                    height: 400,
                                    width: 500
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-chart2',
                                    height: 400,
                                    width: 400
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-chart3',
                                    height: 400,
                                    width: 500
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Auditor',
                            id: prototype.id + '-graficosUser',
                            layout: {
                                type: 'hbox'
                            },
                            border: true, width: 1200, autoScroll: true, height: 400,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [{
                                    xtype: 'panel',
                                    id: prototype.id + '-chart4',
                                    height: 500,
                                    width: 1000
                                }

                            ]
                        },
                        {
                            xtype: 'panel', title: 'Top Countries',
                            id: prototype.id + '-graficostrend',
                            layout: {
                                //type: 'vbox'
                                type: 'vbox',
                            },
                            border: true, width: 1200, autoScroll: true, height: 400,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [{
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    id: prototype.id + '-chart5',
                                    height: 370,
                                    width: 1000
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid', pack: 'center',
                                            id: prototype.id + '-grid-detail',
                                            style: 'margin-top: 10px;',
                                            width: 700,
                                            height: 150,
                                            features: [
                                                {
                                                    dock: 'bottom',
                                                    ftype: 'summary'
                                                }
                                            ],
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['A3389PAIS', 'A3389REGAS', 'A3389TOTAL', 'A3389PARCIAL', 'A3389SINFO','A3389TOTALRFND']
                                            }),
                                            columns: {
                                                defaults: {
                                                    sortable: false,
                                                    menuDisabled: true
                                                },
                                                items: [
                                                    {text: 'Country', dataIndex: 'A3389PAIS', flex: 1},
                                                    {text: 'Username', dataIndex: 'A3389REGAS', flex: 1},
                                                    {text: 'Total', dataIndex: 'A3389TOTAL', flex: 1, align: 'right', summaryType: 'sum'},//, renderer: 'OnColumnAuthoriseRenderer'
                                                    {text: 'Parcial', dataIndex: 'A3389PARCIAL', flex: 1, align: 'right', summaryType: 'sum'},//, renderer: 'OnColumnAuthoriseRenderer'
                                                    {text: 'Sininfo', dataIndex: 'A3389SINFO', flex: 1, align: 'right', summaryType: 'sum'},//, renderer: 'OnColumnAuthoriseRenderer'
                                                    {text: 'Total Request', dataIndex: 'A3389TOTALRFND', flex: 1, align: 'right', summaryType: 'sum'}//, renderer: 'OnColumnAuthoriseRenderer'
                                                ]
                                            }
                                        }
                                    ],
                                }

                            ], listeners: {show: 'onclickshowtrend'}
                        }

                    ]

                }

            ]
        }

    ]
});

