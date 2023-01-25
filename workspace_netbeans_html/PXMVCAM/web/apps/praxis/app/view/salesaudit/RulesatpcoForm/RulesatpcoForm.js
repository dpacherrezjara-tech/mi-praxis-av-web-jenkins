
prototype.idrulesatp = 'RulesatpcoForm';
prototype.idDataEntryRules = 'DataEntryRulesatpco';
prototype.url = CONTEXTPATH + '/RulesatpcoForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 800;

Ext.define('Ext.Praxis.view.salesaudit.RulesatpcoForm.RulesatpcoForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RulesatpcoForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RulesatpcoForm.RulesatpcoFormController',
        'Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco'
    ],

    controller: 'RulesatpcoFormController',

    id: prototype.idrulesatp + '-Contenedor',

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
            id: prototype.idrulesatp + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idrulesatp + '-contenedor-options',
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
                                    id: prototype.idrulesatp + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idrulesatp + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idrulesatp + '-lbl-currentPage',
                                        prototype.idrulesatp + '-lbl-pageCount',
                                        prototype.idrulesatp + '-lbl-total'
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
                                    id: prototype.idrulesatp + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idrulesatp + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idrulesatp + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idrulesatp + '-btn-clear',
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
                    id: prototype.idrulesatp + '-contenedor-filters',
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
                            id: prototype.idrulesatp + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idrulesatp + '-box-filter-01',
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
                                            id: prototype.idrulesatp + '-search-type',
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
                                            id: prototype.idrulesatp + '-txtFilterDateFrom',
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
                                            id: prototype.idrulesatp + '-txtFilterDateTo',
                                            hideLabel: true,
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idrulesatp + '-txtcarrier',
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
                            id: prototype.idrulesatp + '-gridData',
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
                                    {text: 'Carrier', dataIndex: 'A2393CXRCO', width: 56},
                                    {text: 'Tariff', dataIndex: 'A2393TARNO', width: 85},
                                    {text: 'Rule', dataIndex: 'A2393RULNO', width: 85},
                                    {text: 'Category', dataIndex: 'A2393CATNO', width: 85},
                                    {text: 'Location 1', dataIndex: 'A2393LOC1', width: 85},
                                    {text: 'Location 2', dataIndex: 'A2393LOC2', width: 85},
                                    {text: 'Fare Class/<br> Family', dataIndex: 'A2393FCLAS', width: 90, align: 'left'},
                                    {text: 'Fare<br> Type', dataIndex: 'A2393FTYPE', width: 85},
                                    {text: 'General<br> Rule', dataIndex: 'A2393GEAPP', width: 85},
                                    {text: 'EFF', dataIndex: 'A2393EFFE', width: 85},
                                    {text: 'DISC', dataIndex: 'A2393DISC', width: 85},
                                    {text: 'Season<br> Type', dataIndex: 'A2393STYPE', width: 85},
                                    {text: 'Day<br> Type', dataIndex: 'A2393DTYPE', width: 85},
                                    {text: 'OW/RT', dataIndex: 'A2393OWRT', width: 55},
                                    {text: 'Routing<br> Number', dataIndex: 'A2393RTGNO', width: 55},
                                    {text: 'Foot<br> Note', dataIndex: 'A2393FTNT', width: 55},
                                    {text: 'Data Table', dataIndex: 'A2393INTBLS', width: 80, align: 'center',
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
                    id: prototype.idrulesatp + '-pagginator-legend',
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
                                    id: prototype.idrulesatp + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idrulesatp + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idrulesatp + '-lbl-total',
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
                            id: prototype.idrulesatp + '-gridDetalle',
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
                                    {text: 'Relational<br> Indicator', dataIndex: 'A2393LOGIC', width: 70, sortable: false, renderer: 'onRendererColumnStatus'},
                                    {text: 'Table', dataIndex: 'A2393TABLE', align: 'center', width: 75},
                                    {text: 'Categoria', dataIndex: 'A2393CATNO', align: 'center', width: 85},
                                    {text: 'Information <br> about Table', dataIndex: 'A2393INFORMATION', align: 'center', width: 830, renderer: 'onRendererColumnAttr'},
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

