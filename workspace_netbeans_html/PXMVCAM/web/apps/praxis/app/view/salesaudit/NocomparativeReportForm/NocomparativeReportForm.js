
prototype.idnocompara = 'NocomparativeReportForm';
prototype.url = CONTEXTPATH + '/NocomparativeReportForm';
prototype.widthWindow = 1450;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.NocomparativeReportForm.NocomparativeReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NocomparativeReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.NocomparativeReportForm.NocomparativeReportFormController',
    ],

    controller: 'NocomparativeReportFormController',

    id: prototype.idnocompara + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },
    listeners: {
        beforeShow: 'OnBeforeShow'
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
            id: prototype.idnocompara + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idnocompara + '-contenedor-options',
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
                                    id: prototype.idnocompara + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idnocompara + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idnocompara + '-lbl-currentPage',
                                        prototype.idnocompara + '-lbl-pageCount',
                                        prototype.idnocompara + '-lbl-total'
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
                                    id: prototype.idnocompara + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idnocompara + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idnocompara + '-btn-excel',
                                    iconCls: 'prx-icon-excel', hidden: true,
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idnocompara + '-btn-excel2',
                                    iconCls: 'prx-icon-excel', hidden: true,
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idnocompara + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.idnocompara + '-btn-back',
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
                    id: prototype.idnocompara + '-contenedor-filters',
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
                            id: prototype.idnocompara + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idnocompara + '-box-filter-01',
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
                                            id: prototype.idnocompara + '-cmbSearch',
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
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbTypeChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'From month',
                                            id: prototype.idnocompara + '-cmbDateFromYear',
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
                                                afterrender: 'onCmbDateAfterRender',
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.idnocompara + '-cmbDateFromMonth',
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
                                            id: prototype.idnocompara + '-cmbDateToYear',
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
                                            id: prototype.idnocompara + '-cmbDateToMonth',
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
                                            xtype: 'datefield',
                                            id: prototype.idnocompara + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 135,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idnocompara + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            hidden: true,
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idnocompara + '-txtiata',
                                            maskRe: /[0-9]/,
                                            fieldLabel: 'IATA',
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idnocompara + '-txtcountry',
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
                                            xtype: 'fieldcontainer',
                                            defaultType: 'checkboxfield',
                                            items: [
                                                {
                                                    boxLabel: 'Detail',
                                                    name: 'Detail',
                                                    id: prototype.idnocompara + '-checkDetail',
                                                    listeners: {
                                                        change: 'onChkChangeDetail'
                                                    }
                                                }
                                            ]
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
                            id: prototype.idnocompara + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: 650,
                            height: 600,
                            features: [{
                                    //id: 'group',
                                    ftype: 'groupingsummary',
                                    groupHeaderTpl: '{name}',
                                    hideGroupedHeader: false,
                                    enableGroupingMenu: false
                                }, {
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System <br> date', dataIndex: 'A3951FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'Period', dataIndex: 'A3951PERIO', width: 75},
                                    {text: 'Country', dataIndex: 'A3951PAIS', width: 80, align: 'center', renderer: 'onRendererColumnOnPais'},
                                    {text: 'Total', dataIndex: 'A3951CANTI', width: 120, align: 'right',
                                        cls: 'column_header_double',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return 'Total ' + value;
                                        }, field: {
                                            xtype: 'numberfield'
                                        }
                                    },
                                    {text: 'Status', dataIndex: 'A3951FLAG', width: 200, sortable: false, align: 'right'},
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 60,
                                        renderer: 'onRendererColumnOnTime'
                                    }

                                ]
                            }
                        }, {
                            xtype: 'grid',
                            id: prototype.idnocompara + '-gridDetalle',
                             hidden: true,
                            width: prototype.widthWindow,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System </br>date', dataIndex: 'A3951FREGI', width: 75},
                                    {text: 'Period', dataIndex: 'A3951PER', width: 75},
                                    {text: 'Detail', dataIndex: 'A3951PERIO', width: 75},
                                    {text: 'Country', dataIndex: 'A3951PAIS', width: 80, align: 'center'},
                                    {text: 'Agent<br>Code', dataIndex: 'A3951IATA', width: 70, align: 'center'},
                                    {text: 'Agent Name', dataIndex: 'A3951IATANAME', width: 200, renderer: 'onRendererColumnAttr'},
                                    {text: 'Sales<br> Type', dataIndex: 'A3951TVTA', width: 80},
                                    {text: 'Cur.', dataIndex: 'A3951MDA', width: 40},
                                    {text: 'Cash', dataIndex: 'A3951CASH', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Credit <br> turned cash', dataIndex: 'A3951CTUC', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'MS Cash', dataIndex: 'A3951CAMS', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Payment <br>card', dataIndex: 'A3951CCAD', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'MS <br>Credit', dataIndex: 'A3951CCMS', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'EasyPay', dataIndex: 'A3951EPAY', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Total', dataIndex: 'A3951NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Estatus', dataIndex: 'A3951FLAG', width: 180}

                                ]
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.idnocompara + '-gridDetalle2',
                              hidden: true,
                            width: prototype.widthWindow,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System </br>date', dataIndex: 'A3951FREGI', width: 75},
                                    {text: 'Period', dataIndex: 'A3951PER', width: 75},
                                    {text: 'Detail', dataIndex: 'A3951PERIO', width: 75},
                                    {text: 'Country', dataIndex: 'A3951PAIS', width: 80, align: 'center'},
                                    {text: 'Agent<br>Code', dataIndex: 'A3951IATA', width: 70, align: 'center'},
                                    {text: 'Agent Name', dataIndex: 'A3951IATANAME', width: 200, renderer: 'onRendererColumnAttr'},
                                    {text: 'Sales<br> Type', dataIndex: 'A3951TVTA', width: 80},
                                    {text: 'Cur.', dataIndex: 'A3951MDA', width: 40},
                                    {text: 'Cash', dataIndex: 'A3951CASH', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Credit <br> turned cash', dataIndex: 'A3951CTUC', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'MS Cash', dataIndex: 'A3951CAMS', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Payment <br>card', dataIndex: 'A3951CCAD', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'MS <br>Credit', dataIndex: 'A3951CCMS', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'EasyPay', dataIndex: 'A3951EPAY', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Total', dataIndex: 'A3951NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                    {text: 'Estatus', dataIndex: 'A3951FLAG', width: 180}

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
                            width: prototype.widthWindow,
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
                                    id: prototype.idnocompara + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idnocompara + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idnocompara + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {
                                    id: prototype.idnocompara + '-lbl-totalDeta',
                                    text: '0',
                                    width: 50

                                },
                                {
                                    id: prototype.idnocompara + '-lbl-totalDeta2',
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




