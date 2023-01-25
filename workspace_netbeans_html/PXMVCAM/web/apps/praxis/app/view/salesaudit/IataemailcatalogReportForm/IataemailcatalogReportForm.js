
prototype.idIataemail = 'IataemailcatalogReportForm';
prototype.idEmailcatalog = 'IataemailcatalogReportForm';
prototype.url = CONTEXTPATH + '/IataemailcatalogReportForm';
prototype.url2 = CONTEXTPATH + '/ADMManualForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.IataemailcatalogReportForm.IataemailcatalogReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.IataemailcatalogReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.IataemailcatalogReportForm.IataemailcatalogReportFormController',
        'Ext.Praxis.view.salesaudit.IataemailcatalogReportForm.DataEntryIataemailcatalogReportForm'
    ],

    controller: 'IataemailcatalogReportFormController',

    id: prototype.idIataemail + '-Contenedor',

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
            id: prototype.idIataemail + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idIataemail + '-contenedor-options',
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
                                    id: prototype.idIataemail + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    disabled: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idIataemail + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idIataemail + '-lbl-currentPage',
                                        prototype.idIataemail + '-lbl-pageCount',
                                        prototype.idIataemail + '-lbl-total'
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
                                    id: prototype.idIataemail + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idIataemail + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idIataemail + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idIataemail + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idIataemail + '-btn-clear',
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
                    id: prototype.idIataemail + '-contenedor-filters',
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
                            id: prototype.idIataemail + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idIataemail + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        // style: 'margin-left:1px',
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idIataemail + '-txtCountry',
                                            fieldLabel: 'Country',
                                            queryMode: 'local',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            displayField: 'A051DESCR1',
                                            valueField: 'A051KEY2',
                                            width: 220,
                                            labelWidth: 50,
                                            labelAlign: 'right',
                                            emptyText: '',
                                            listConfig: {
                                                minWidth: 200
                                            },
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                afterrender: 'onCmbStatusAfterRender'

                                            }
                                        },
                                        /* {
                                         xtype: 'textfield',
                                         id: prototype.idIataemail + '-txtIATA',
                                         width: 150,
                                         labelWidth: 40,
                                         enableKeyEvents: true,
                                         maxLength: 8,
                                         enforceMaxLength: 8,
                                         fieldLabel: 'IATA',
                                         maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                         listeners: {
                                         specialkey: 'onSearchkey'
                                         }
                                         },*/
                                        {
                                            xtype: 'combo',
                                            id: prototype.idIataemail + '-CmbStatus',
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
                                                afterrender: 'onCmbStatusAfterRender'
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
                            id: prototype.idIataemail + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            width: 1400,
                            height: 520,
                            columns: {
                                items: [
                                    //{text: 'Zone', dataIndex: 'A3948ZONA', align: 'center', width: 75},
                                    {text: 'Country', dataIndex: 'A3948DESPAIS', width: 100},
                                    {text: 'GSA', dataIndex: 'A3948GSA', width: 100},
                                    {text: 'GSA Sale', dataIndex: 'A3948RESPO', width: 150},
                                    {text: 'Airline <br> Billing', dataIndex: 'A3948BILLI', width: 50, renderer: 'onRendererColumnhabiliBI'},
                                    {text: 'Airline <br> Daily', dataIndex: 'A3948DAILY', width: 50,renderer: 'onRendererColumnhabiliDAI'},
                                    {text: 'Ccsettle', dataIndex: 'A3948CSETT', width: 80,renderer: 'onRendererColumnhabiliCSE'},
                                    {text: 'Operational', dataIndex: 'A3948OPERA', width: 80,renderer: 'onRendererColumnhabiliOpe'},
                                    {text: 'Agencies', dataIndex: 'A3948AGENC', width: 70,renderer: 'onRendererColumnhabiliAge'},
                                    {text: 'COMPARATIVE', dataIndex: 'A3948COMPA', width: 95,renderer: 'onRendererColumnhabilicompa'},
                                    {text: 'NON <br> COMPARATIVE', dataIndex: 'A3948NCOMP', width: 95,renderer: 'onRendererColumnhabiliNocompa'},
                                    //{text: 'IATA', dataIndex: 'A3903AGETE', width: 65},
                                    //{text: 'Agency', dataIndex: 'A3903NOMAGENCY', width: 200, align: 'left', renderer: 'onRendererColumn'},
                                    // {text: 'Email<br> Airline', dataIndex: 'A3948CORER', width: 400, align: 'left', renderer: 'onRendererColumn'},
                                    {text: 'Email <br> Agency', dataIndex: 'A3948COREG', width: 300, align: 'left', renderer: 'onRendererColumn'},
                                    {text: 'Status', dataIndex: 'A3948FLAG', width: 120, renderer: 'onRendererColumnStatus'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detail',
                                                handler: 'onEditActionColumnClick'
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
                    id: prototype.idIataemail + '-pagginator-legend',
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
                                    id: prototype.idIataemail + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idIataemail + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idIataemail + '-lbl-total',
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


