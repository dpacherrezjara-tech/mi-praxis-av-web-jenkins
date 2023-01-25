
prototype.id = 'IatasBSPForm';
prototype.url = CONTEXTPATH + '/IatasBSPForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.IatasBSPForm.IatasBSPForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.IatasBSPForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.IatasBSPForm.IatasBSPFormController',
    ],

    controller: 'IatasBSPFormController',

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
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: prototype.widthWindow,
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
                            xtype: 'panel',
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
                                    disabled: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
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
                                    id: prototype.id + '-btn-excel2', hidden: true,
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'searchform_detalle_excel'
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
                                }, {
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
                                                afterrender: 'onCmbAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            labelWidth: 40,
                                            value: new Date(),
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelAlign: 'right',
                                            width: 135,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIATA',
                                            width: 100,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: 8,
                                            hideLabel: true,
                                            enableKeyEvents: true,
                                            hidden: true,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtcountry',
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
                                            xtype: 'combo',
                                            id: prototype.id + '-CmbStatus',
                                            fieldLabel: 'Status',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'code',
                                            width: 250,
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
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: 920,
                            height: 600,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System <br> date', dataIndex: 'A2844FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'User <br> upload', dataIndex: 'A2844REGIS', width: 100, sortable: true, align: 'center'},
                                    {text: 'IATA', dataIndex: 'A2844AGENT', width: 80, align: 'center', renderer: 'onRendererColumnOn'},
                                    {text: 'Agency', dataIndex: 'A2844NAME', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'State/ <br> Country', dataIndex: 'A2844PAIS', width: 100, sortable: true, align: 'center'},
                                    {text: 'Area', dataIndex: 'A2844AREA', width: 80, align: 'center'},
                                    {text: 'Status', dataIndex: 'A2844DESTA', width: 200, sortable: false, align: 'right'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime'}

                                ]
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetalle',
                            width: prototype.widthWindow,
                            hidden: true,
                            height: prototype.heightWindow,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'System <br> date', dataIndex: 'A2844FREGI', width: 100, sortable: true, align: 'center'},
                                    {text: 'User <br> upload', dataIndex: 'A2844REGIS', width: 100, sortable: true, align: 'center'},
                                    {text: 'IATA', dataIndex: 'A2844AGENT', width: 80, align: 'center'},
                                    {text: 'Agency', dataIndex: 'A2844NAME', width: 150, renderer: 'onRendererColumnAttr'},
                                    {text: 'Location/<br>Type', dataIndex: 'A2844LOCAT', width: 100, sortable: true, align: 'center'},
                                    {text: 'City', dataIndex: 'A2844CITY', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'State/<br>Country', dataIndex: 'A2844PAIS', width: 80, align: 'center'},
                                    {text: 'Change <br> Code', dataIndex: 'A2844DCHG', width: 80, align: 'center'},
                                    {text: 'Efective <br> date', dataIndex: 'A2844FREGI', width: 100, sortable: true, align: 'center'},
                                    //{text: 'Area', dataIndex: 'A2844AREA', width: 80, align: 'center'},
                                    //{text: 'File Name', dataIndex: 'A2844NAME', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'REASON', dataIndex: 'A2844REASO', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'REMARKS', dataIndex: 'A2844REMAR', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'Status', dataIndex: 'A2844DESTA', width: 200, sortable: false, align: 'right'},
                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime'}



                                ]
                            }, viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pagginator-legend',
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
        }

    ]
});


