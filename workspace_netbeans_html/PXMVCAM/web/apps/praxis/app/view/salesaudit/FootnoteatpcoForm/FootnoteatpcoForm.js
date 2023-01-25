
prototype.idFootnoteatpco = 'FootnoteatpcoForm';
prototype.idDataEntryRules = 'DataEntryRulesatpco';
prototype.url = CONTEXTPATH + '/FootnoteatpcoForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.FootnoteatpcoForm.FootnoteatpcoForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FootnoteatpcoForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.FootnoteatpcoForm.FootnoteatpcoFormController',
        'Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco'
    ],

    controller: 'FootnoteatpcoFormController',

    id: prototype.idFootnoteatpco + '-Contenedor',

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
            id: prototype.idFootnoteatpco + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idFootnoteatpco + '-contenedor-options',
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
                                    id: prototype.idFootnoteatpco + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idFootnoteatpco + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idFootnoteatpco + '-lbl-currentPage',
                                        prototype.idFootnoteatpco + '-lbl-pageCount',
                                        prototype.idFootnoteatpco + '-lbl-total'
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
                                    id: prototype.idFootnoteatpco + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idFootnoteatpco + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idFootnoteatpco + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idFootnoteatpco + '-btn-clear',
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
                    id: prototype.idFootnoteatpco + '-contenedor-filters',
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
                            id: prototype.idFootnoteatpco + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idFootnoteatpco + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Search By',
                                            style: 'font-weight:bold;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'combo',
                                            hideLabel: true,
                                            id: prototype.idFootnoteatpco + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Effective Date: From',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idFootnoteatpco + '-txtFilterDateFrom',
                                            hideLabel: true,
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'To',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idFootnoteatpco + '-txtFilterDateTo',
                                            hideLabel: true,
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idFootnoteatpco + '-txtcarrier',
                                            fieldLabel: 'Carrier',
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onUpperValue'
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
                            id: prototype.idFootnoteatpco + '-gridData',
                            width: 1390,
                            height: 480,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Carrier', dataIndex: 'A2468CXRCO', width: 56},
                                    {text: 'Tariff', dataIndex: 'A2468TARNO', width: 85},
                                    {text: 'Footnote', dataIndex: 'A2468FTNT', width: 85},
                                    {text: 'Category', dataIndex: 'A2468CATNO', width: 85},
                                    {text: 'Location 1', dataIndex: 'A2468LOC1', width: 85},
                                    {text: 'Location 2', dataIndex: 'A2468LOC2', width: 85},
                                    {text: 'Fare Class/<br> Family', dataIndex: 'A2468FCLAS', width: 90, align: 'left'},
                                    {text: 'EFF', dataIndex: 'A2468EFF', width: 90},
                                    {text: 'DISC', dataIndex: 'A2468DISC', width: 90},
                                    {text: 'OW/RT', dataIndex: 'A2468OWRT', width: 90},
                                    {text: 'Routing<br> Number', dataIndex: 'A2468RTGNO', width: 90},
                                    {text: 'Data Table', dataIndex: 'A2468INTBLS', width: 80, align: 'center',
                                        renderer: 'onRendererColumnOnPais'
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
                    id: prototype.idFootnoteatpco + '-pagginator-legend',
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
                                    id: prototype.idFootnoteatpco + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idFootnoteatpco + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idFootnoteatpco + '-lbl-total',
                                    text: '0',
                                    width: 50
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
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                        border: false,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idFootnoteatpco + '-gridDetalle',
                            width: 1200,
                            height: 150,
                            hidden: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Relational<br> Indicator', dataIndex: 'A2468LOGIC', width: 70, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'Table', dataIndex: 'A2468TABLE', align: 'center', width: 75},
                                    {text: 'Categoria', dataIndex: 'A2468CATNO', align: 'center', width: 85},
                                    {text: 'Information <br> about Table', dataIndex: 'A2468INFORMATION', align: 'center', width: 830, renderer: 'onRendererColumnAttr'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
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
                }
            ]
        }
    ]
});



