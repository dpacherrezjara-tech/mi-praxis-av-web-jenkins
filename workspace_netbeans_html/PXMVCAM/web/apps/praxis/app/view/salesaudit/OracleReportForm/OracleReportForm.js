
prototype.idOracleForm = 'OracleReportForm';
prototype.idDataEntryNumberingOracle = 'DataEntryNumberingOracle';
prototype.idDataEntryPolizasOracle = 'DataEntryPolizasOracle';
prototype.idDataEntryPolizasOracleARC = 'DataEntryPolizasOracleARC';
prototype.idDataEntryPolizasOracleFRA = 'DataEntryPolizasOracleFRA';
prototype.url = CONTEXTPATH + '/OracleReportForm';
prototype.widthWindow = 500;
prototype.heightWindow = 768;
// DataEntryNumberingOracleController
Ext.define('Ext.Praxis.view.salesaudit.OracleReportForm.OracleReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.OracleReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.OracleReportForm.OracleReportFormController',
        'Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryNumberingOracle',
        'Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracle',
        'Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracleARC',
        'Ext.Praxis.view.salesaudit.OracleReportForm.DataEntryPolizasOracleFRA'
    ],

    controller: 'OracleReportFormController',

    id: prototype.idOracleForm + '-Contenedor',

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
            id: prototype.idOracleForm + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idOracleForm + '-contenedor-options',
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
                                    id: prototype.idOracleForm + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idOracleForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idOracleForm + '-lbl-currentPage',
                                        prototype.idOracleForm + '-lbl-pageCount',
                                        prototype.idOracleForm + '-lbl-total'
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
                                    id: prototype.idOracleForm + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel', hidden: true,
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-add',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'Numbering of debits and credits',
                                    listeners: {
                                        click: 'onAddClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-Poli',
                                    iconCls: 'prx-icon-polizas',
                                    tooltip: 'Process policies',
                                    listeners: {
                                        click: 'onpolizasClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-PoliARC',
                                    iconCls: 'prx-icon-panel',
                                    tooltip: 'Process policies ARC',
                                    listeners: {
                                        click: 'onpolizasArcClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-PoliFRA',
                                    iconCls: 'prx-icon-104-ticket',
                                    tooltip: 'Process policies FRA',
                                    listeners: {
                                        click: 'onpolizasFRAClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idOracleForm + '-btn-clear',
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
                    id: prototype.idOracleForm + '-contenedor-filters',
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
                            id: prototype.idOracleForm + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idOracleForm + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Processing Date',
                                            style: 'font-weight:bold;text-align:center;'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idOracleForm + '-txtFilterDateFrom',
                                            fieldLabel: 'From',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
                                            listeners: {
                                                specialkey: 'onSearchkey'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idOracleForm + '-txtFilterDateTo',
                                            fieldLabel: 'To',
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 130,
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
                            id: prototype.idOracleForm + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: prototype.widthWindow,
                            height: 480,
                            columns: {
                                items: [
                                    {text: 'Processing Date', dataIndex: 'A2680FPRO', width: 120},
                                    {text: 'Quantity ADMs', dataIndex: 'A2680QTYOR', width: 120},
                                    {text: 'Quantity Loaded', dataIndex: 'A2680QTYLO', width: 120},
                                    {text: 'Status', dataIndex: 'A2680FLAG', width: 100}
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
                    id: prototype.idOracleForm + '-pagginator-legend',
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
                                    id: prototype.idOracleForm + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idOracleForm + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idOracleForm + '-lbl-total',
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