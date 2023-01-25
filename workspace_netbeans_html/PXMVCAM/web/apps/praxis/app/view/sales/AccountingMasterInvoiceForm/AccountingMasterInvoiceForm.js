
prototype.id = 'AccountingMasterInvoiceForm';
prototype.id2 = 'dataEntry';
prototype.url = CONTEXTPATH + '/AccountingMasterInvoiceForm';
prototype.widthContenedor = 1200;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.sales.AccountingMasterInvoiceForm.AccountingMasterInvoiceForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AccountingMasterInvoiceForm',
    requires: [
        'Ext.Praxis.controller.sales.AccountingMasterInvoiceForm.AccountingMasterInvoiceFormController',
        'Ext.Praxis.view.sales.AccountingMasterInvoiceForm.DataEntry'
    ],
    controller: 'AccountingMasterInvoiceFormController',
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
            width: prototype.widthContenedor,
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
                                    id: prototype.id + '-btnAdd',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'New',
                                    listeners: {
                                        click: 'onAddClick'
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCuent',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            fieldLabel: 'CUENT',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            width: 150,
                                            maxLength: 4,
                                            enforceMaxLength: 4,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSubCuent',
                                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/,
                                            fieldLabel: 'SUBCU',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            width: 150,
                                            maxLength: 5,
                                            enforceMaxLength: 5,
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
                            id: prototype.id + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            width: '100%',
                            height: 535,
                            columns: {
                                items: [
                                    {
                                        text: 'ACCOUNT',
                                        dataIndex: 'CUENTA',
                                        width: 80
                                    },
                                    {
                                        text: 'CUENT',
                                        dataIndex: 'CUENT',
                                        width: 80
                                    },
                                    {
                                        text: 'SUBCU',
                                        dataIndex: 'SUBCU',
                                        width: 65
                                    },
                                    {
                                        text: 'DESC. ACCOUNT',
                                        dataIndex: 'DESCU',
                                        flex: 1,
                                        align: 'left',
                                        renderer: 'onRendererColumn'
                                    },
                                    {
                                        text: 'RECORD',
                                        dataIndex: 'RECORD',
                                        width: 80
                                    },
                                    {
                                        text: 'IVA',
                                        dataIndex: 'IVA',
                                        width: 75
                                    },
                                    {
                                        text: 'T.ACCOUNT',
                                        dataIndex: 'TCTA',
                                        width: 80
                                    },
                                    {
                                        text: 'OAL',
                                        dataIndex: 'OAL',
                                        width: 60
                                    },
                                    {
                                        text: 'FACTURABLE',
                                        dataIndex: 'FACT',
                                        width: 90
                                    },
                                    {
                                        text: 'NO SALE',
                                        dataIndex: 'NVTA',
                                        width: 75,
                                        align: 'center'
                                    },
                                    {
                                        text: 'IND. AGRUP.',
                                        dataIndex: 'INDAGRUP',
                                        width: 80,
                                        align: 'left'
                                    },
                                    {
                                        text: 'AGRUP FG',
                                        dataIndex: 'DESCAGRUP',
                                        width: 80,
                                        align: 'left',
                                        flex: 1,
                                        renderer: 'onRendererColumn'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onUpdateClick'
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
                                // trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',                    
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    //height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '3px 1px 1px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            //height: 25,
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


