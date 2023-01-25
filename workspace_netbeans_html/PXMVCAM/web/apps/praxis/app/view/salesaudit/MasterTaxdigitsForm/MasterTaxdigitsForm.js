
prototype.idMasterTax = 'MasterTaxdigitsForm';
prototype.idDataEntryMasterTax = 'DataEntryMasterTaxdigitsForm';
prototype.url = CONTEXTPATH + '/MasterTaxdigitsForm';
prototype.widthWindow = 700;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.MasterTaxdigitsForm.MasterTaxdigitsForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MasterTaxdigitsForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.MasterTaxdigitsForm.MasterTaxdigitsFormController',
        'Ext.Praxis.view.salesaudit.MasterTaxdigitsForm.DataEntryMasterTaxdigitsForm'
    ],

    controller: 'MasterTaxdigitsFormController',

    id: prototype.idMasterTax + '-Contenedor',

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
            id: prototype.idMasterTax + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idMasterTax + '-contenedor-options',
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
                                    id: prototype.idMasterTax + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idMasterTax + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idMasterTax + '-lbl-currentPage',
                                        prototype.idMasterTax + '-lbl-pageCount',
                                        prototype.idMasterTax + '-lbl-total'
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
                                    id: prototype.idMasterTax + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMasterTax + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMasterTax + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMasterTax + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Add record',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idMasterTax + '-btn-clear',
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
                    id: prototype.idMasterTax + '-contenedor-filters',
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
                            id: prototype.idMasterTax + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idMasterTax + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idMasterTax + '-txtCodTax',
                                            fieldLabel: 'Code Tax',
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 60,
                                            width: 200,
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
                            id: prototype.idMasterTax + '-gridDataAC',
                            columnLines: true,
                            autoScroll: true,
                            width: prototype.widthWindow,
                            height: 500,
                            columns: {
                                items: [
                                    {text: 'Customer', dataIndex: 'A2658CCUST', width: 80, align: 'center'},
                                    {text: 'Code Tax', dataIndex: 'A2658CODTX', width: 80, align: 'center'},
                                    {text: 'Cod.Tax <br>to Use', dataIndex: 'A2658CDTXU', width: 80, align: 'center'},
                                    {text: 'Description', dataIndex: 'A2658DESCP', width: 380, renderer: 'onRendererColumnAttr'},
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
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.idMasterTax + '-pagginator-legend',
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
                                    id: prototype.idMasterTax + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idMasterTax + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idMasterTax + '-lbl-total',
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


