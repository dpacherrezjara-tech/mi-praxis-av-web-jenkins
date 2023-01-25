
prototype.idFareclas = 'FareclassatpcoForm';
prototype.url = CONTEXTPATH + '/FareclassatpcoForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.FareclassatpcoForm.FareclassatpcoForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FareclassatpcoForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.FareclassatpcoForm.FareclassatpcoFormController',
    ],

    controller: 'FareclassatpcoFormController',

    id: prototype.idFareclas + '-Contenedor',

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
            id: prototype.idFareclas + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idFareclas + '-contenedor-options',
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
                                    id: prototype.idFareclas + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idFareclas + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idFareclas + '-lbl-currentPage',
                                        prototype.idFareclas + '-lbl-pageCount',
                                        prototype.idFareclas + '-lbl-total'
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
                                    id: prototype.idFareclas + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idFareclas + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idFareclas + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idFareclas + '-btn-clear',
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
                    id: prototype.idFareclas + '-contenedor-filters',
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
                            id: prototype.idFareclas + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idFareclas + '-box-filter-01',
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
                                            id: prototype.idFareclas + '-search-type',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            hideLabel: true,
                                            labelWidth: 75,
                                            labelClsExtra: 'prx-label-search',
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idFareclas + '-txtFilterDateFrom',
                                            hideLabel: true,
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idFareclas + '-txtcarrier',
                                            fieldLabel: 'Carrier',
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idFareclas + '-txtfareclass',
                                            fieldLabel: 'Fare Class',
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            labelWidth: 70,
                                            width: 160,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idFareclas + '-txtTarrif',
                                            fieldLabel: 'Tarrif',
                                            maxLength: 10,
                                            enforceMaxLength: 10,
                                            labelWidth: 70,
                                            width: 160
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idFareclas + '-txtRule',
                                            fieldLabel: 'Rule',
                                            maxLength: 4,
                                            enforceMaxLength: 4,
                                            labelWidth: 70,
                                            width: 160,
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
                            id: prototype.idFareclas + '-gridData',
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
                                    {text: 'Carrier', dataIndex: 'A2390CCOD', width: 52, align: 'center'},
                                    {text: 'Tariff', dataIndex: 'A2390TARNO', width: 70, align: 'center'},
                                    {text: 'Rule', dataIndex: 'A2390RULNO', width: 60, align: 'center'},
                                    {text: 'Fare Class', dataIndex: 'A2390FCLAS', width: 90, align: 'left'},
                                    {text: 'OW/RT', dataIndex: 'A2390OWRT', width: 60, align: 'center'},
                                    {text: 'Fare Type', dataIndex: 'A2390FARET', width: 80, align: 'center'},
                                    {text: 'Category<br> Type', dataIndex: 'A2390DICAT', width: 85},
                                    {text: 'Location 1', dataIndex: 'A2390LLOC1', width: 85},
                                    {text: 'Location 2', dataIndex: 'A2390LLOC2', width: 85},
                                    {text: 'Season<br> Type', dataIndex: 'A2390SEAS', width: 85},
                                    {text: 'Day<br> Type', dataIndex: 'A2390DOWT', width: 85},
                                    {text: 'Date<br> Effective', dataIndex: 'A2390DEFEC', width: 85, align: 'center'},
                                    {text: 'Date<br> Discontinue', dataIndex: 'A2390DDISC', width: 85, align: 'center'},
                                    {text: 'Normal/<br> Special', dataIndex: 'A2390PRCAT', width: 85, align: 'center'},
                                    {text: 'RTG', dataIndex: 'A2390RTGNO', width: 60},
                                    {text: 'FTNT', dataIndex: 'A2390FTNT', width: 60},
                                    {text: 'RBD', dataIndex: 'A2390RBD', width: 50},
                                    {text: 'Direction', dataIndex: 'A2390DI', width: 50},
                                    {text: 'Psgr. Type', dataIndex: 'A2390TYPE', width: 50},
                                    {text: 'Ticketing',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Code', dataIndex: 'A2390TKTCO', width: 80,align: 'right'},
                                            {text: 'Modifier', dataIndex: 'A2390TCM', width: 80,align: 'right'}
                                        ]
                                    },
                                    {text: 'Ticket',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Designator', dataIndex: 'A2390TKTDE', width: 80, align: 'right'},
                                            {text: 'Modifier', dataIndex: 'A2390TDM', width: 80, align: 'right'},
                                        ]
                                    },
                                    {text: 'Min. Age', dataIndex: 'A2390AMIN', width: 50},
                                    {text: 'Max. Age', dataIndex: 'A2390AMAX', width: 50}
                                            //{text: 'Amount', dataIndex: 'A2548NETO', width: 120, renderer: 'onColumnAmountRenderer'},
                                            //{text: 'Agency', dataIndex: 'AGENCY', width: 150, renderer: 'onRendererColumnAttr'},

                                            //

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
                    id: prototype.idFareclas + '-pagginator-legend',
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
                                    id: prototype.idFareclas + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idFareclas + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idFareclas + '-lbl-total',
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

