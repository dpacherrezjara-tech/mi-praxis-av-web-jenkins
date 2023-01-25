
prototype.id = 'ControlBsplinkForm';
prototype.url = CONTEXTPATH + '/ControlBsplinkForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.ControlBsplinkForm.ControlBsplinkForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ControlBsplinkForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.ControlBsplinkForm.ControlBsplinkFormController',
        'Ext.Praxis.view.salesaudit.ControlBsplinkForm.DataEntryControlBsplinkForm'
    ],

    controller: 'ControlBsplinkFormController',

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
                                        click: 'onSearchClick'
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
                                    id: prototype.id + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
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
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search by',
                                            id: prototype.id + '-cbxFiltro',
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
                                                afterrender: 'onCmbSearchAfterRender',
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFilterDateFrom',
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
                                            id: prototype.id + '-txtFilterDateTo',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-country',
                                            fieldLabel: 'User',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 20,
                                            enforceMaxLength: 20,
                                            labelWidth: 30,
                                            hidden: true,
                                            width: 200,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                //change: 'onUpperValue'
                                            }
                                        },

                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Status',
                                            id: prototype.id + '-CmbStatus',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 75,
                                            width: 200,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 200
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
                            width: prototype.widthWindow,
                            height: 480,
                            columns: {
                                items: [
                                    {text: 'System<br>Date', dataIndex: 'A3093FREGI', width: 70, align: 'right', renderer: 'onRendererColumnOnPais'},
                                    //{text: 'Country', dataIndex: 'A3093PAIS', width: 70},
                                    {text: 'User', dataIndex: 'A3093USER', width: 180},
                                    {text: 'Password', dataIndex: 'A3093PASS', width: 100},
                                    //{text: 'Url', dataIndex: 'A3093URL', width: 90},
                                    {text: 'Date <br> efective', dataIndex: 'A3093EFECT', width: 70},
                                    {text: 'Date <br> discontinuity', dataIndex: 'A3093DESCO', width: 70},
                                    {text: 'Status', dataIndex: 'A3093FLAG', width: 70},
                                    {text: 'Control data', flex: 1,
                                        columns: [
                                            {text: 'User Created', dataIndex: 'A3093REGIS', flex: 1},
                                            {text: 'Date', dataIndex: 'A3093FREGI', flex: 1},
                                            {text: 'Time', dataIndex: 'A3093HREGI', flex: 1},
                                            {text: 'User Modified', dataIndex: 'A3093REVIS', flex: 1},
                                            {text: 'Date', dataIndex: 'A3093FREVI', flex: 1},
                                            {text: 'Time', dataIndex: 'A3093HREVI', flex: 1}
                                        ]
                                    },
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 30,
                                        renderer: 'OnColumnStatusRenderer'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Detail',
                                                handler: 'onEditActionColumnClick',
                                                isActionDisabled: 'OnEditActionDisabled'
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
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetalle',
                            columnLines: true,
                            autoScroll: true,
                            width: 1366,
                            height: 480,
                            columns: {
                                items: [
                                    {text: 'System<br>Date', dataIndex: 'A3093FREGI', width: 70},
                                    {text: 'Country', dataIndex: 'A3093PAIS', width: 70},
                                    {text: 'Date <br> efective', dataIndex: 'A3093EFECT', width: 70},
                                    {text: 'Date <br> discontinuity', dataIndex: 'A3093DESCO', width: 70},
                                    {text: 'Status', dataIndex: 'A3093FLAG', width: 70},
                                    {text: 'Control data', flex: 1,
                                        columns: [
                                            {text: 'User Created', dataIndex: 'A3093REGIS', flex: 1},
                                            {text: 'Date', dataIndex: 'A3093FREGI', flex: 1},
                                            {text: 'Time', dataIndex: 'A3093HREGI', flex: 1},
                                            {text: 'User Modified', dataIndex: 'A3093REVIS', flex: 1},
                                            {text: 'Date', dataIndex: 'A3093FREVI', flex: 1},
                                            {text: 'Time', dataIndex: 'A3093HREVI', flex: 1}
                                        ]
                                    },
                                    {
                                        text: '',
                                        dataIndex: '',
                                        width: 30,
                                        renderer: 'OnColumnStatusRenderer'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                tooltip: 'Deactivate',
                                                handler: 'onDeleteClick'
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
                    id: prototype.id + '-pagginator-legend',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    hidden: false,
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
                                },
                                {
                                    id: prototype.id + '-lbl-totalDeta',
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

