
prototype.idatpcoForm = 'FaresatpcoForm';
prototype.idDataEntryRulesFaresatpco = 'DataEntryRulesFaresatpco';
prototype.idDataEntryFootnoteFaresatpco = 'DataEntryFootnoteFaresatpco';
prototype.idDataEntryCategoryFaresatpco = 'DataEntryCategoryFaresatpco';
prototype.idDataEntryRules = 'DataEntryRulesatpco';
prototype.url = CONTEXTPATH + '/FaresatpcoForm';
prototype.widthWindow = 1366;
prototype.heightWindow = 768;

Ext.define('Ext.Praxis.view.salesaudit.FaresatpcoForm.FaresatpcoForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FaresatpcoForm',

    requires: [
        'Ext.Praxis.controller.salesaudit.FaresatpcoForm.FaresatpcoFormController',
        'Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryRulesFaresatpco',
        'Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryFootnoteFaresatpco',
        'Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryCategoryFaresatpco',
         'Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco'
    ],

    controller: 'FaresatpcoFormController',

    id: prototype.idatpcoForm + '-Contenedor',

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
            id: prototype.idatpcoForm + '-contenedor-form',
            width: prototype.widthWindow,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idatpcoForm + '-contenedor-options',
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
                                    id: prototype.idatpcoForm + '-pagination',
                                    boxLabel: 'Pagination?',
                                    checked: true,
                                    listeners: {
                                        change: 'onPaginationChkChange'
                                    }
                                },
                                {
                                    xtype: 'Paginator',
                                    id: prototype.idatpcoForm + '-pagginator-01',
                                    pagInfo: [
                                        prototype.idatpcoForm + '-lbl-currentPage',
                                        prototype.idatpcoForm + '-lbl-pageCount',
                                        prototype.idatpcoForm + '-lbl-total'
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
                                    id: prototype.idatpcoForm + '-btn-search',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search',
                                    listeners: {
                                        click: 'onSearchClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idatpcoForm + '-btn-filter',
                                    iconCls: 'prx-icon-filter',
                                    tooltip: 'Hidden/Show filter',
                                    listeners: {
                                        click: 'onFilterClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idatpcoForm + '-btn-excel',
                                    iconCls: 'prx-icon-excel',
                                    tooltip: 'Export to Excel',
                                    listeners: {
                                        click: 'onExcelClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.idatpcoForm + '-btn-clear',
                                    iconCls: 'prx-icon-clear',
                                    tooltip: 'Clear Options',
                                    listeners: {
                                        click: 'onClearClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-back',
                                    id: prototype.idatpcoForm + '-btn-back',
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
                    id: prototype.idatpcoForm + '-contenedor-filters',
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
                            id: prototype.idatpcoForm + '-contenedor-filters-form',
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.idatpcoForm + '-box-filter-01',
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
                                            text: 'Effective On',
                                            //  style: 'font-weight:bold;',
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
                                            id: prototype.idatpcoForm + '-txtFilterDateFrom',
                                            hideLabel: true,
                                            format: 'Y/m/d',
                                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                                            value: Ext.Date.format(new Date(), 'Y/m/d'),
                                            labelWidth: 40,
                                            labelAlign: 'right',
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Origin',
                                            //style: 'font-weight:bold;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idatpcoForm + '-txtOrigin',
                                            hideLabel: true,
                                            width: 80,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Destin',
                                            //style: 'font-weight:bold;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idatpcoForm + '-txtDestin',
                                            hideLabel: true,
                                            width: 80,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Carrier',
                                            //style: 'font-weight:bold;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            padding: '10 5 5 5'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idatpcoForm + '-txtcarrier',
                                            hideLabel: true,
                                            width: 80,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            listeners: {
                                                specialkey: 'onSearchkey',
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idatpcoForm + '-txtfareclass',
                                            fieldLabel: 'Fare Class',
                                            maxLength: 8,
                                            enforceMaxLength: 8,
                                            labelWidth: 70,
                                            width: 160
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
                            id: prototype.idatpcoForm + '-grid',
                            columnLines: true,
                            autoScroll: true,
                            width: 1200,
                            height: 500,
                            columns: {
                                items: [
                                    {text: 'Carrier', dataIndex: 'A2419CXRCD', width: 52, align: 'center'},
                                    {text: 'Fare Class', dataIndex: 'A2419FCLAS', width: 80},
                                    {text: 'Origin', dataIndex: 'A2419OCITY', width: 60, align: 'center'},
                                    {text: 'Destin', dataIndex: 'A2419DCITY', width: 60, align: 'center'},
                                    {text: 'Tariff', dataIndex: 'A2419TARNO', width: 70, align: 'center'},
                                    {text: 'Rule', dataIndex: 'A2419RULNO', width: 60, align: 'center'},
                                    {text: 'Footnote', dataIndex: 'A2419FTNT', width: 60, align: 'center'},
                                    {text: 'OW/RT', dataIndex: 'A2419OWRT', width: 60, align: 'center'},
                                    {text: 'Date<br> Effective', dataIndex: 'A2419TARDT', width: 85, align: 'center'},
                                    {text: 'Date<br> Discontinue', dataIndex: 'A2419DISC', width: 85, align: 'center'},
                                    {text: 'Fare <br>Amount', dataIndex: 'A2419FAREFINAL', width: 70, align: 'right', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Cur.', dataIndex: 'A2419MONEDA', width: 40},
                                    {text: 'RTG', dataIndex: 'A2419RTGNO', width: 60},
                                    {text: 'Global', dataIndex: 'A2419GLBL', width: 50},
                                    {text: 'Tariff', dataIndex: 'A2419TARNO1', width: 60, align: 'center'},
                                    {text: 'Date<br> Effective', dataIndex: 'A2419TARDT1', width: 85, align: 'center'},
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: 'Rule',
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit', //DataEntryRulesFaresatpco DataEntryFootnoteFaresatpco DataEntryCategoryFaresatpco
                                                tooltip: 'Rule',
                                                handler: 'onRuleDetailClick'
                                            }
                                        ]
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: 'Footnote',
                                        width: 70,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Footnote',
                                                handler: 'onFootnoteDetailClick'
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
                    id: prototype.idatpcoForm + '-pagginator-legend',
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
                                    id: prototype.idatpcoForm + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.idatpcoForm + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.idatpcoForm + '-lbl-total',
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

