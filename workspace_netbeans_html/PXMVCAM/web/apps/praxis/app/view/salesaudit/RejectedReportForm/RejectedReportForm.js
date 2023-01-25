
prototype.idRejecte = 'RejectedReportForm';
prototype.url = CONTEXTPATH + '/RejectedReportForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.RejectedReportForm.RejectedReportForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RejectedReportForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.RejectedReportForm.RejectedReportFormController',
    ],

    controller: 'RejectedReportFormController',

    id: prototype.idRejecte + '-Contenedor',

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
            id: prototype.idRejecte + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idRejecte + '-contenedor-options',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '10px 5px 0px 5px',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 1000},
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.idRejecte + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'imgSearch_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRejecte + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRejecte + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'imgExcel_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRejecte + '-btn-File',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel', hidden: true,
                                    listeners: {
                                        click: 'onFileClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idRejecte + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                }, {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.idRejecte + '-btn-back',
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
                    id: prototype.idRejecte + '-contenedor-filters',
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
                            id: prototype.idRejecte + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idRejecte + '-box-filter-01',
                                    layout: 'hbox',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Search',
                                            id: prototype.idRejecte + '-search',
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
                                                change: 'onCmbSearchChange'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Type',
                                            id: prototype.idRejecte + '-type',
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
                                            id: prototype.idRejecte + '-cmbDateFromYear',
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
                                            id: prototype.idRejecte + '-cmbDateFromMonth',
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
                                            id: prototype.idRejecte + '-Per1',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 30,
                                            labelClsExtra: 'prx-label-search',
                                            width: 100,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbPeriAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'From month',
                                            id: prototype.idRejecte + '-cmbDateToYear',
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
                                            id: prototype.idRejecte + '-cmbDateToMonth',
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
                                            id: prototype.idRejecte + '-Per2',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: '[SELECTED]',
                                            labelWidth: 30,
                                            labelClsExtra: 'prx-label-search',
                                            width: 100,
                                            editable: false,
                                            listConfig: {
                                                minWidth: 150
                                            },
                                            listeners: {
                                                afterrender: 'onCmbPeriAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.idRejecte + '-txtFilterDateFrom',
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
                                            id: prototype.idRejecte + '-txtFilterDateTo',
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
                                            id: prototype.idRejecte + '-txtCountry',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            hidden: true,
                                            width: 110,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onchange'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.idRejecte + '-box-filter-02',
                                    layout: 'hbox',
                                    style: 'padding: 0px',
                                    border: true,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.idRejecte + '-CmbStatus',
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
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        }, {
                                            xtype: 'combo',
                                            id: prototype.idRejecte + '-CmbError',
                                            fieldLabel: 'Error',
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
                                                afterrender: 'onCmbSearchAfterRender'
                                            }
                                        }, {
                                            xtype: 'textfield',
                                            id: prototype.idRejecte + '-txtTiccket',
                                            fieldLabel: 'Ticket',
                                            width: 300,
                                            labelWidth: 70,
                                            labelAlign: 'right',
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
                                    id: prototype.idRejecte + '-gridData',
                                    columnLines: true,
                                    autoScroll: true,
                                    hidden: true,
                                    width: 800,
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
                                    selModel: {
                                        selType: 'checkboxmodel'
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'System </br>date', dataIndex: 'A3456FREGI', width: 75},
                                            {text: 'Period', dataIndex: 'A3456FDATE', width: 75},
                                            {text: 'Country', dataIndex: 'A3456PAIS', width: 80, align: 'center', renderer: 'onRendererColumnOnPais'},
                                            {text: 'Total', dataIndex: 'A3456TOTAL', width: 120, align: 'right',
                                                cls: 'column_header_double',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData, dataIndex) {
                                                    return 'Total ' + value;
                                                }, field: {
                                                    xtype: 'numberfield'
                                                }
                                            },
                                            {text: 'Processed', dataIndex: 'A3456COUNT', width: 100, align: 'right',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData, dataIndex) {
                                                    return 'Processed ' + value;
                                                }, field: {
                                                    xtype: 'numberfield'
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'A3456ESTAD', width: 200, sortable: false, align: 'right'},
                                            {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime'}

                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.idRejecte + '-gridDetalle',
                                    width: prototype.widthWindow,
                                    hidden: true,
                                    height: 600,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'System </br>date', dataIndex: 'A3456FREGI', width: 70},
                                            {text: 'Country', dataIndex: 'A3456PAIS', width: 30, align: 'center'},
                                            {text: 'Cia', dataIndex: 'A3456CIA', width: 40, align: 'center'},
                                            {text: 'Ticket', dataIndex: 'A3456TKT', width: 90, align: 'center'},
                                            {text: 'Trnc', dataIndex: 'A3456TRN', width: 60, align: 'center'},
                                            {text: 'Error', dataIndex: 'A3456FLAG', width: 50, renderer: 'onRendererColumnAttr'},
                                            {text: 'IATA', dataIndex: 'A3456IATA', width: 70, align: 'center'},
                                            {text: 'Agency', dataIndex: 'A3456DESIATA', width: 200, renderer: 'onRendererColumnAttr'},
                                            {text: 'Reason for rejection', dataIndex: 'A3456DESCR', width: 250, renderer: 'onRendererColumnAttr'},
                                            {text: 'Associated', dataIndex: 'A3456TKTAS', width: 90, align: 'center'},
                                            {text: 'GDS', dataIndex: 'A3456GDSNA', width: 50, align: 'center'},
                                            {text: 'Period', dataIndex: 'A3456PERIO', width: 60, align: 'center'},
                                            {text: 'Date', dataIndex: 'A3456DATE', width: 60, align: 'center'},
                                            {text: 'Billing', dataIndex: 'A3456FBILL', width: 60, align: 'center'},
                                            {text: 'Status', dataIndex: 'A3456ESTAD', width: 100, sortable: false, align: 'right'},
                                            {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnTime2'}

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
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
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
                                pack: 'left'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 350},
                                {
                                    text: 'Total Records found',
                                    width: 150
                                },
                                {
                                    id: prototype.idRejecte + '-lbl-total',
                                    text: '0',
                                    width: 50
                                },
                                {
                                    id: prototype.idRejecte + '-lbl-totalDeta',
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